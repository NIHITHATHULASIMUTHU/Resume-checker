// analyzer.js
// Resume analysis engine that matches skills, calculates gap scores, and generates resume suggestions and learning roadmaps.

const ResumeAnalyzer = {
  /**
   * Normalizes text by converting to lowercase, removing punctuation, and collapsing whitespace.
   */
  normalizeText(text) {
    if (!text) return "";
    return text
      .toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'’]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  },

  /**
   * Checks if a skill is present in the normalized resume text.
   * Uses both exact boundary matches and substring searches for synonyms.
   */
  checkSkillMatch(normalizedText, synonyms) {
    for (let synonym of synonyms) {
      const normalizedSynonym = synonym.toLowerCase().trim();
      
      // Escape regex special characters in synonym
      const escapedSynonym = normalizedSynonym.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      
      // Check if it's a stand-alone word/phrase in the text
      // Word boundaries on both sides
      const regexWordBoundary = new RegExp(`\\b${escapedSynonym}\\b`, 'i');
      if (regexWordBoundary.test(normalizedText)) {
        return true;
      }
      
      // Special case: C++ or C# or .NET might not behave well with standard \b
      if (normalizedSynonym.includes("+") || normalizedSynonym.includes("#") || normalizedSynonym.includes(".")) {
        if (normalizedText.includes(normalizedSynonym)) {
          return true;
        }
      }
    }
    return false;
  },

  /**
   * Performs the complete skill gap analysis.
   */
  analyze(resumeText, targetRoleId) {
    const db = window.SKILLS_DATABASE || (typeof require !== 'undefined' ? require('./skills-db.js').SKILLS_DATABASE : null);
    if (!db) {
      console.error("Skills Database not found!");
      return null;
    }

    const role = db.roles[targetRoleId];
    if (!role) {
      console.error(`Target role '${targetRoleId}' not found in database.`);
      return null;
    }

    const normalizedResume = this.normalizeText(resumeText);
    const matchedSkills = [];
    const missingSkills = [];
    
    let totalWeight = 0;
    let earnedWeight = 0;

    // Evaluate each skill in the role profile
    for (let skill of role.skills) {
      totalWeight += skill.weight;
      
      const isMatched = this.checkSkillMatch(normalizedResume, skill.synonyms);
      if (isMatched) {
        matchedSkills.push(skill);
        earnedWeight += skill.weight;
      } else {
        missingSkills.push(skill);
      }
    }

    // Calculate match percentage (handle division by zero)
    const matchPercentage = totalWeight > 0 ? Math.round((earnedWeight / totalWeight) * 100) : 0;

    // Generate Resume Optimization Suggestions
    const resumeSuggestions = this.generateSuggestions(resumeText, matchedSkills, missingSkills, targetRoleId);

    // Generate Learning Roadmap
    const learningRoadmap = this.generateRoadmap(missingSkills, db.learningResources);

    // Compute Resume Strength Score
    const resumeStrength = this.calculateResumeStrength(resumeText, matchedSkills.length);

    return {
      roleName: role.name,
      matchPercentage,
      resumeStrength,
      matchedSkills,
      missingSkills,
      suggestions: resumeSuggestions,
      roadmap: learningRoadmap
    };
  },

  /**
   * Evaluates resume content and provides concrete resume-writing advice.
   */
  generateSuggestions(rawText, matched, missing, roleId) {
    const suggestions = [];
    const normalized = this.normalizeText(rawText);

    // 1. Length/Detail Check
    const wordCount = rawText ? rawText.split(/\s+/).length : 0;
    if (wordCount < 100) {
      suggestions.push({
        type: "danger",
        title: "Resume content too short",
        message: "Your resume appears extremely brief. ATS (Applicant Tracking Systems) and recruiters prefer detailed resumes (typically 300-600 words) with structured sections for experience, projects, and education."
      });
    }

    // 2. Metrics / Quantifiable Achievements check
    const numberMatches = rawText.match(/\b\d+(?:%|\s*percent|\s*million|\s*k|\s*users|\s*hours|\s*dollars)?\b/g) || [];
    if (numberMatches.length < 3) {
      suggestions.push({
        type: "warning",
        title: "Incorporate quantifiable achievements",
        message: "Your resume lacks metrics. Try to quantify your impact (e.g., 'Improved database speed by 25%', 'Managed a dashboard used by 500+ active users', or 'Reduced page load times by 1.2s')."
      });
    }

    // 3. Missing High-Impact Skills Check
    const highImpactMissing = missing.filter(s => s.weight >= 4);
    if (highImpactMissing.length > 0) {
      const skillsListStr = highImpactMissing.slice(0, 3).map(s => `"${s.name}"`).join(", ");
      suggestions.push({
        type: "primary",
        title: "Missing critical keywords",
        message: `Your resume is missing essential keywords like ${skillsListStr}. These are core requirements for this role. Be sure to add projects or experience showcasing these skills to clear automated resume filters.`
      });
    }

    // 4. Formatting optimization: Action Verbs check
    const actionVerbs = ["build", "develop", "implement", "optimize", "design", "manage", "lead", "architect", "scale", "reduce", "increase", "analyze", "create", "drive", "deploy"];
    let actionVerbsUsed = 0;
    for (let verb of actionVerbs) {
      if (normalized.includes(verb)) actionVerbsUsed++;
    }
    if (actionVerbsUsed < 3) {
      suggestions.push({
        type: "warning",
        title: "Use stronger action verbs",
        message: "Begin your experience bullet points with strong action verbs (e.g. 'Architected microservices pipeline' instead of 'Was responsible for writing APIs')."
      });
    }

    // 5. Contact Info checks (simple heuristics)
    if (!normalized.includes("email") && !rawText.includes("@")) {
      suggestions.push({
        type: "danger",
        title: "Contact information missing",
        message: "Ensure your email address is clearly visible at the top of your resume so recruiters can easily contact you."
      });
    }

    if (!normalized.includes("github") && !normalized.includes("linkedin")) {
      suggestions.push({
        type: "primary",
        title: "Add professional links",
        message: "Consider adding links to your GitHub profile or LinkedIn page to showcase your portfolio, projects, and professional network."
      });
    }

    // Fallback if resume is perfect
    if (suggestions.length === 0) {
      suggestions.push({
        type: "success",
        title: "Outstanding Profile Match!",
        message: "Your resume aligns beautifully with the core standards. Focus on preparing for technical interviews and tailoring your cover letter."
      });
    }

    return suggestions;
  },

  /**
   * Generates step-by-step training curriculum based on missing skills.
   */
  generateRoadmap(missingSkills, resourcesDb) {
    if (missingSkills.length === 0) {
      return [];
    }

    // Sort missing skills by weight (highest priority first)
    const sortedMissing = [...missingSkills].sort((a, b) => b.weight - a.weight);
    const roadmapSteps = [];

    sortedMissing.forEach((skill, index) => {
      const skillResources = resourcesDb[skill.id] || {
        title: skill.name,
        resources: [
          { name: `Search guides for "${skill.name}" on freeCodeCamp`, type: "Search", url: `https://www.google.com/search?q=freecodecamp+${encodeURIComponent(skill.name)}`, duration: "Variable" },
          { name: `Official documentation of ${skill.name}`, type: "Docs", url: `https://www.google.com/search?q=official+documentation+${encodeURIComponent(skill.name)}`, duration: "Variable" }
        ],
        projects: [`Build a standalone portfolio utility incorporating ${skill.name}`]
      };

      // Categorize into learning phases based on index
      let phase = "Phase 1: Foundation (Core Gaps)";
      if (index >= 3 && index < 6) {
        phase = "Phase 2: Intermediate Expansion";
      } else if (index >= 6) {
        phase = "Phase 3: Advanced Specialization";
      }

      roadmapSteps.push({
        skillId: skill.id,
        skillName: skill.name,
        category: skill.category,
        weight: skill.weight,
        phase,
        title: skillResources.title,
        resources: skillResources.resources,
        projects: skillResources.projects
      });
    });

    return roadmapSteps;
  },

  /**
   * Generates a basic rating (out of 100) of the resume structure.
   */
  calculateResumeStrength(text, matchedCount) {
    if (!text) return 0;
    
    let score = 20; // baseline for submitting a document
    const words = text.split(/\s+/).length;
    
    // Word count scaling (max +30)
    if (words > 100 && words <= 250) score += 15;
    else if (words > 250 && words <= 600) score += 30;
    else if (words > 600) score += 20; // too long can be a small negative

    // Match counts (max +30)
    score += Math.min(matchedCount * 5, 30);

    // Structural elements (max +20)
    const normalized = text.toLowerCase();
    if (normalized.includes("experience") || normalized.includes("work")) score += 5;
    if (normalized.includes("education") || normalized.includes("university") || normalized.includes("college")) score += 5;
    if (normalized.includes("project") || normalized.includes("portfolio")) score += 5;
    if (normalized.includes("skill") || normalized.includes("technologies")) score += 5;

    return Math.min(score, 100);
  }
};

// Export analyzer for browser integration
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ResumeAnalyzer };
} else {
  window.ResumeAnalyzer = ResumeAnalyzer;
}
