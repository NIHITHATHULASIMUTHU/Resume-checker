// app.js
// Main controller managing application state, PDF parsing, terminal scanning animation, and UI rendering.

document.addEventListener("DOMContentLoaded", () => {
  // --- Check Dependencies ---
  const db = window.SKILLS_DATABASE;
  const analyzer = window.ResumeAnalyzer;
  
  if (!db || !analyzer) {
    console.error("Skill database or analyzer script not loaded properly.");
    return;
  }

  // Configure PDF.js Worker
  if (window.pdfjsLib) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
  }

  // --- App State ---
  let appState = {
    resumeText: "",
    selectedRoleId: "",
    analysisResults: null,
    completedRoadmapSkills: new Set(), // Tracked dynamically in current session
    chartInstance: null
  };

  // --- UI Elements Caching ---
  const DOM = {
    // Navigation
    themeToggleBtn: document.getElementById("theme-toggle"),
    iconMoon: document.querySelector(".icon-moon"),
    iconSun: document.querySelector(".icon-sun"),
    logoHome: document.getElementById("logo-home"),
    navBtnHome: document.getElementById("nav-btn-home"),
    navBtnAbout: document.getElementById("nav-btn-about"),

    // Screen containers
    inputScreen: document.getElementById("input-screen"),
    scanningScreen: document.getElementById("scanning-screen"),
    resultsScreen: document.getElementById("results-screen"),

    // Inputs
    targetRoleSelect: document.getElementById("target-role"),
    rolePreviewBox: document.getElementById("role-preview-box"),
    previewRoleName: document.getElementById("preview-role-name"),
    previewRoleDesc: document.getElementById("preview-role-desc"),
    
    tabBtnFile: document.getElementById("tab-btn-file"),
    tabBtnText: document.getElementById("tab-btn-text"),
    filePanel: document.getElementById("resume-file-panel"),
    textPanel: document.getElementById("resume-text-panel"),
    
    dropzone: document.getElementById("dropzone"),
    fileInput: document.getElementById("file-input"),
    selectedFileBox: document.getElementById("selected-file-box"),
    selectedFileName: document.getElementById("selected-file-name"),
    selectedFileSize: document.getElementById("selected-file-size"),
    removeFileAction: document.getElementById("remove-file-action"),
    
    textInput: document.getElementById("text-input"),
    analyzeSubmitBtn: document.getElementById("analyze-submit-btn"),

    // Scanner
    progressBarFill: document.getElementById("scanning-progress-bar"),
    progressText: document.getElementById("scanning-progress-text"),
    consoleLines: document.getElementById("terminal-console-lines"),

    // Dashboard Header
    dashRoleBadge: document.getElementById("dash-role-badge"),
    dashRoleTitle: document.getElementById("dash-role-title"),
    restartAnalysisBtn: document.getElementById("restart-analysis-btn"),
    downloadReportBtn: document.getElementById("download-report-btn"),

    // Score metrics
    dashMatchPercent: document.getElementById("dash-match-percent"),
    dashRadialFill: document.getElementById("dash-radial-fill"),
    dashMatchedCount: document.getElementById("dash-matched-count"),
    dashMissingCount: document.getElementById("dash-missing-count"),
    dashStrengthScore: document.getElementById("dash-strength-score"),

    // Tabs & Panels
    tabBreakdown: document.getElementById("tab-breakdown"),
    tabRoadmap: document.getElementById("tab-roadmap"),
    tabSuggestions: document.getElementById("tab-suggestions"),
    roadmapGapBadge: document.getElementById("roadmap-gap-badge"),
    suggestionsCountBadge: document.getElementById("suggestions-count-badge"),
    
    panelBreakdown: document.getElementById("panel-breakdown"),
    panelRoadmap: document.getElementById("panel-roadmap"),
    panelSuggestions: document.getElementById("panel-suggestions"),

    // Breakdown Panel lists
    matchedSkillsList: document.getElementById("matched-skills-list-container"),
    missingSkillsList: document.getElementById("missing-skills-list-container"),
    countMatchedSkillsBadge: document.getElementById("count-matched-skills-badge"),
    countMissingSkillsBadge: document.getElementById("count-missing-skills-badge"),

    // Roadmap Panel lists
    roadmapCompletionFraction: document.getElementById("roadmap-completion-fraction"),
    roadmapTimeline: document.getElementById("roadmap-timeline-container"),

    // Suggestions Panel list
    suggestionsCards: document.getElementById("suggestions-cards-container")
  };

  // --- Initialize App ---
  function init() {
    populateRolesDropdown();
    setupEventListeners();
    initTheme();
  }

  // --- Theme Controller ---
  function initTheme() {
    const savedTheme = localStorage.getItem("skillgap_theme") || "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);
    updateThemeIcons(savedTheme);
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("skillgap_theme", newTheme);
    updateThemeIcons(newTheme);
    
    // Redraw chart if visible to match light/dark styling
    if (appState.analysisResults && appState.chartInstance) {
      renderChart(appState.analysisResults);
    }
  }

  function updateThemeIcons(theme) {
    if (theme === "dark") {
      DOM.iconMoon.style.display = "block";
      DOM.iconSun.style.display = "none";
    } else {
      DOM.iconMoon.style.display = "none";
      DOM.iconSun.style.display = "block";
    }
  }

  // --- Populate Roles ---
  function populateRolesDropdown() {
    Object.keys(db.roles).forEach(roleKey => {
      const option = document.createElement("option");
      option.value = roleKey;
      option.textContent = db.roles[roleKey].name;
      DOM.targetRoleSelect.appendChild(option);
    });
  }

  // --- Event Listeners Setup ---
  function setupEventListeners() {
    // Theme Switcher
    DOM.themeToggleBtn.addEventListener("click", toggleTheme);

    // Nav actions / Home restart
    DOM.logoHome.addEventListener("click", (e) => { e.preventDefault(); resetToInputScreen(); });
    DOM.navBtnHome.addEventListener("click", (e) => { e.preventDefault(); resetToInputScreen(); });
    DOM.restartAnalysisBtn.addEventListener("click", resetToInputScreen);

    // Target role select preview trigger
    DOM.targetRoleSelect.addEventListener("change", handleRoleChange);

    // Tab Switches: Upload File vs Paste Text
    DOM.tabBtnFile.addEventListener("click", () => switchInputTab("file"));
    DOM.tabBtnText.addEventListener("click", () => switchInputTab("text"));

    // File drag and drop bindings
    DOM.dropzone.addEventListener("dragover", handleDragOver);
    DOM.dropzone.addEventListener("dragleave", handleDragLeave);
    DOM.dropzone.addEventListener("drop", handleDrop);
    DOM.fileInput.addEventListener("change", handleFileSelect);
    DOM.removeFileAction.addEventListener("click", clearSelectedFile);

    // Text area input checker
    DOM.textInput.addEventListener("input", checkInputsValidity);

    // Submit Action
    DOM.analyzeSubmitBtn.addEventListener("click", runAnalysisWorkflow);

    // Dashboard Tabs Switching (Breakdown, Roadmap, Suggestions)
    const tabs = [DOM.tabBreakdown, DOM.tabRoadmap, DOM.tabSuggestions];
    tabs.forEach(tab => {
      tab.addEventListener("click", () => switchDashboardTab(tab));
    });

    // Download PDF Action
    DOM.downloadReportBtn.addEventListener("click", () => {
      window.print();
    });
  }

  // --- Input Panel Handlers ---
  function handleRoleChange() {
    const roleId = DOM.targetRoleSelect.value;
    appState.selectedRoleId = roleId;
    
    if (roleId && db.roles[roleId]) {
      const role = db.roles[roleId];
      DOM.previewRoleName.textContent = role.name;
      DOM.previewRoleDesc.textContent = role.description;
      DOM.rolePreviewBox.style.display = "block";
    } else {
      DOM.rolePreviewBox.style.display = "none";
    }
    checkInputsValidity();
  }

  function switchInputTab(mode) {
    if (mode === "file") {
      DOM.tabBtnFile.classList.add("active");
      DOM.tabBtnText.classList.remove("active");
      DOM.filePanel.classList.add("active");
      DOM.textPanel.classList.remove("active");
    } else {
      DOM.tabBtnFile.classList.remove("active");
      DOM.tabBtnText.classList.add("active");
      DOM.filePanel.classList.remove("active");
      DOM.textPanel.classList.add("active");
    }
    checkInputsValidity();
  }

  function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    DOM.dropzone.classList.add("dragover");
  }

  function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    DOM.dropzone.classList.remove("dragover");
  }

  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    DOM.dropzone.classList.remove("dragover");
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processPDFFile(files[0]);
    }
  }

  function handleFileSelect(e) {
    const files = e.target.files;
    if (files.length > 0) {
      processPDFFile(files[0]);
    }
  }

  function processPDFFile(file) {
    if (file.type !== "application/pdf") {
      alert("Invalid file format. Please upload a PDF file.");
      return;
    }
    
    // Show selected file metadata
    DOM.selectedFileName.textContent = file.name;
    DOM.selectedFileSize.textContent = formatBytes(file.size);
    
    // Hide drag zone contents and show file display block
    DOM.dropzone.querySelector(".dropzone-content").style.display = "none";
    DOM.selectedFileBox.style.display = "flex";

    // Extract PDF text content asynchronously
    const reader = new FileReader();
    reader.onload = function() {
      const typedarray = new Uint8Array(this.result);
      
      pdfjsLib.getDocument(typedarray).promise.then(pdf => {
        let maxPages = pdf.numPages;
        let countPromises = [];
        
        for (let i = 1; i <= maxPages; i++) {
          countPromises.push(
            pdf.getPage(i).then(page => {
              return page.getTextContent().then(textContent => {
                return textContent.items.map(item => item.str).join(" ");
              });
            })
          );
        }
        
        Promise.all(countPromises).then(pageTexts => {
          appState.resumeText = pageTexts.join("\n");
          checkInputsValidity();
        }).catch(err => {
          console.error("PDF Parsing page contents failed:", err);
          alert("Could not extract text from PDF pages. The file might be scanned images only.");
          clearSelectedFile();
        });
      }).catch(err => {
        console.error("PDF Loading document failed:", err);
        alert("Error loading PDF. The file might be corrupted.");
        clearSelectedFile();
      });
    };
    reader.readAsArrayBuffer(file);
  }

  function clearSelectedFile(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    DOM.fileInput.value = "";
    appState.resumeText = "";
    
    DOM.dropzone.querySelector(".dropzone-content").style.display = "block";
    DOM.selectedFileBox.style.display = "none";
    checkInputsValidity();
  }

  function checkInputsValidity() {
    let isRoleValid = !!appState.selectedRoleId;
    let isResumeValid = false;

    // Check active tab
    const isFileMode = DOM.tabBtnFile.classList.contains("active");
    if (isFileMode) {
      isResumeValid = appState.resumeText.trim().length > 10;
    } else {
      const pasted = DOM.textInput.value.trim();
      isResumeValid = pasted.length > 10;
      if (isResumeValid) {
        appState.resumeText = pasted;
      }
    }

    if (isRoleValid && isResumeValid) {
      DOM.analyzeSubmitBtn.classList.remove("disabled");
      DOM.analyzeSubmitBtn.removeAttribute("disabled");
    } else {
      DOM.analyzeSubmitBtn.classList.add("disabled");
      DOM.analyzeSubmitBtn.setAttribute("disabled", "true");
    }
  }

  // --- Loading Terminal & Animation Workflow ---
  function runAnalysisWorkflow() {
    // Hide input and show scanning screen
    DOM.inputScreen.style.display = "none";
    DOM.scanningScreen.style.display = "block";
    
    // Clear previous console lines
    DOM.consoleLines.innerHTML = "";

    const consoleLogs = [
      { text: "[INFO] Initializing Skill Gap Finder AI v1.2.0...", delay: 200, progress: 10, type: "info" },
      { text: "[PARSE] Reading document structures and typography layers...", delay: 600, progress: 25, type: "info" },
      { text: `[PARSE] Raw file character length parsed: ${appState.resumeText.length} bytes`, delay: 1000, progress: 40, type: "success" },
      { text: `[EXTRACT] Benchmarking resume words against role directory: ${db.roles[appState.selectedRoleId].name}...`, delay: 1500, progress: 55, type: "info" },
      { text: "[MATCH] Mapping technical synonyms and framework relations...", delay: 2000, progress: 70, type: "info" },
      { text: "[COMPUTE] Calculating skill gap weighting indexes...", delay: 2500, progress: 85, type: "info" },
      { text: "[PLAN] Constructing learning modules & sourcing recommended projects...", delay: 3000, progress: 95, type: "info" },
      { text: "[SUCCESS] Full gap analysis generated. Redirecting to dashboard...", delay: 3400, progress: 100, type: "success" }
    ];

    consoleLogs.forEach(log => {
      setTimeout(() => {
        // Output line to terminal
        const line = document.createElement("div");
        line.className = `terminal-line ${log.type}`;
        line.textContent = log.text;
        DOM.consoleLines.appendChild(line);
        DOM.consoleLines.scrollTop = DOM.consoleLines.scrollHeight;

        // Update progress bar
        DOM.progressBarFill.style.width = `${log.progress}%`;
        DOM.progressText.textContent = `${log.progress}%`;

        // Switch screen at 100%
        if (log.progress === 100) {
          setTimeout(() => {
            appState.analysisResults = analyzer.analyze(appState.resumeText, appState.selectedRoleId);
            
            // Load previously saved learning progress for this role
            const savedProgress = localStorage.getItem(`skillgap_progress_${appState.selectedRoleId}`);
            appState.completedRoadmapSkills = savedProgress ? new Set(JSON.parse(savedProgress)) : new Set();

            renderDashboard(appState.analysisResults);
            
            DOM.scanningScreen.style.display = "none";
            DOM.resultsScreen.style.display = "block";
          }, 350);
        }
      }, log.delay);
    });
  }

  // --- Render Dashboard Views ---
  function renderDashboard(results) {
    if (!results) return;

    // Header updates
    DOM.dashRoleTitle.textContent = `${results.roleName} Analysis`;
    DOM.dashRoleBadge.textContent = results.roleName;

    // Compute updated scores based on interactive roadmap checklist progress
    updateDashboardScores(results);

    // Render Skill Breakdown columns
    renderSkillBreakdownLists(results);

    // Render Chart.js
    renderChart(results);

    // Render learning roadmap steps
    renderTimelineRoadmap(results);

    // Render resume rewrite tips
    renderSuggestions(results);

    // Initial Dashboard Tab select
    switchDashboardTab(DOM.tabBreakdown);
  }

  function updateDashboardScores(results) {
    const totalSkills = results.matchedSkills.length + results.missingSkills.length;
    
    // Baseline weights
    const totalWeight = results.matchedSkills.reduce((sum, s) => sum + s.weight, 0) + 
                        results.missingSkills.reduce((sum, s) => sum + s.weight, 0);

    let earnedWeight = results.matchedSkills.reduce((sum, s) => sum + s.weight, 0);
    let completedInRoadmapCount = 0;

    // Add weights of checked missing skills
    results.missingSkills.forEach(skill => {
      if (appState.completedRoadmapSkills.has(skill.id)) {
        earnedWeight += skill.weight;
        completedInRoadmapCount++;
      }
    });

    const activeMatchPercentage = totalWeight > 0 ? Math.round((earnedWeight / totalWeight) * 100) : 0;
    
    // UI Scores
    DOM.dashMatchPercent.textContent = `${activeMatchPercentage}%`;
    
    // Circular SVG Progress animate
    const strokeDashOffsetVal = 314 - (314 * activeMatchPercentage) / 100;
    DOM.dashRadialFill.style.strokeDashoffset = strokeDashOffsetVal;

    // Stats Bar counts
    const activeMatchedCount = results.matchedSkills.length + completedInRoadmapCount;
    const activeMissingCount = results.missingSkills.length - completedInRoadmapCount;
    DOM.dashMatchedCount.textContent = activeMatchedCount;
    DOM.dashMissingCount.textContent = activeMissingCount;
    DOM.dashStrengthScore.textContent = `${results.resumeStrength}/100`;

    // Timeline badge counter
    DOM.roadmapGapBadge.textContent = activeMissingCount;
    DOM.roadmapGapBadge.style.display = activeMissingCount > 0 ? "inline-flex" : "none";
    
    // Tab text fractions
    DOM.roadmapCompletionFraction.textContent = `${completedInRoadmapCount} of ${results.missingSkills.length} Skills Completed`;
  }

  function renderSkillBreakdownLists(results) {
    // Clear lists
    DOM.matchedSkillsList.innerHTML = "";
    DOM.missingSkillsList.innerHTML = "";

    // Matched skills builder
    results.matchedSkills.forEach(skill => {
      const card = document.createElement("div");
      card.className = "skill-badge-card matched";
      card.innerHTML = `
        <span>${skill.name}</span>
        <span class="skill-badge-cat">${skill.category}</span>
      `;
      DOM.matchedSkillsList.appendChild(card);
    });

    // Missing skills builder
    results.missingSkills.forEach(skill => {
      // Check if it's currently marked as completed on roadmap
      const isRoadmapCompleted = appState.completedRoadmapSkills.has(skill.id);
      
      const card = document.createElement("div");
      card.className = `skill-badge-card missing ${isRoadmapCompleted ? 'completed-strike' : ''}`;
      card.innerHTML = `
        <span>${skill.name}</span>
        <span class="skill-badge-cat">${skill.category}</span>
      `;
      DOM.missingSkillsList.appendChild(card);
    });

    DOM.countMatchedSkillsBadge.textContent = results.matchedSkills.length;
    DOM.countMissingSkillsBadge.textContent = results.missingSkills.length;
  }

  function renderChart(results) {
    if (appState.chartInstance) {
      appState.chartInstance.destroy();
    }

    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    const gridColor = isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)";
    const textColor = isDark ? "#94A3B8" : "#64748B";

    const allSkills = [...results.matchedSkills, ...results.missingSkills];
    // Sort skills by weight
    allSkills.sort((a, b) => b.weight - a.weight);

    const labels = allSkills.map(s => s.name);
    
    // Target Weight Dataset
    const targetWeightsData = allSkills.map(s => s.weight);
    
    // User Level Dataset
    const userMatchData = allSkills.map(s => {
      const isMatched = results.matchedSkills.some(ms => ms.id === s.id);
      const isRoadmapCompleted = appState.completedRoadmapSkills.has(s.id);
      return (isMatched || isRoadmapCompleted) ? s.weight : 0;
    });

    const ctx = document.getElementById("skillMatchChart").getContext("2d");
    
    appState.chartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Your Skill Level",
            data: userMatchData,
            backgroundColor: "#06B6D4",
            hoverBackgroundColor: "#22D3EE",
            borderRadius: 4,
            barThickness: 10
          },
          {
            label: "Required Importance",
            data: targetWeightsData,
            backgroundColor: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.04)",
            borderColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.08)",
            borderWidth: 1,
            borderRadius: 4,
            barThickness: 10
          }
        ]
      },
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false // Handled in HTML
          },
          tooltip: {
            backgroundColor: isDark ? "#1E1B4B" : "#FFFFFF",
            titleColor: isDark ? "#F8FAFC" : "#0F172A",
            bodyColor: isDark ? "#94A3B8" : "#475569",
            borderColor: "rgba(139, 92, 246, 0.2)",
            borderWidth: 1
          }
        },
        scales: {
          x: {
            grid: {
              color: gridColor
            },
            ticks: {
              color: textColor,
              stepSize: 1,
              max: 5
            },
            max: 5
          },
          y: {
            grid: {
              display: false
            },
            ticks: {
              color: textColor,
              font: {
                family: "'Outfit', sans-serif",
                size: 11
              }
            }
          }
        }
      }
    });
  }

  function renderTimelineRoadmap(results) {
    DOM.roadmapTimeline.innerHTML = "";

    if (results.roadmap.length === 0) {
      DOM.roadmapTimeline.innerHTML = `
        <div class="card" style="text-align: center; padding: 3rem 1rem;">
          <svg viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2" style="width: 48px; height: 48px; margin-bottom: 1rem;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          <h3>No Skill Gaps Detected!</h3>
          <p>Your resume matches all core skills listed for this target role perfectly.</p>
        </div>
      `;
      return;
    }

    results.roadmap.forEach((step, index) => {
      const isCompleted = appState.completedRoadmapSkills.has(step.skillId);
      
      const stepDiv = document.createElement("div");
      stepDiv.className = `timeline-step ${isCompleted ? 'completed' : ''}`;
      stepDiv.id = `step-node-${step.skillId}`;

      // Build resources markup
      let resourcesMarkup = "";
      step.resources.forEach(res => {
        resourcesMarkup += `
          <a href="${res.url}" target="_blank" rel="noopener noreferrer" class="resource-link-card">
            <div class="resource-name-box">
              <span class="res-name">
                ${res.name}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
              </span>
              <span class="res-type">${res.type}</span>
            </div>
            <span class="res-duration">${res.duration}</span>
          </a>
        `;
      });

      // Build projects markup
      let projectsMarkup = "";
      step.projects.forEach(proj => {
        projectsMarkup += `
          <div class="project-guidelines-box">
            <span class="project-badge-tag">Hands-on Task</span>
            <p>${proj}</p>
          </div>
        `;
      });

      stepDiv.innerHTML = `
        <!-- Left dot on timeline -->
        <div class="step-node">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>

        <!-- Header -->
        <div class="step-header">
          <div class="step-meta-left">
            <div class="step-checkbox" data-id="${step.skillId}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <div class="step-title-area">
              <span class="step-phase-badge">${step.phase}</span>
              <span class="step-title-text">${step.title}</span>
            </div>
          </div>
          <div class="step-header-actions">
            <span class="step-importance-pill">Priority Weight: ${step.weight}/5</span>
            <svg class="step-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
        </div>

        <!-- Collapsible Body -->
        <div class="step-body">
          <div class="step-body-content">
            <div class="resources-block">
              <h5>Recommended Resources</h5>
              <div class="resource-links-list">
                ${resourcesMarkup}
              </div>
            </div>
            <div class="projects-block">
              <h5>Practical Project Blueprint</h5>
              ${projectsMarkup}
            </div>
          </div>
        </div>
      `;

      // Collapsible functionality
      const header = stepDiv.querySelector(".step-header");
      header.addEventListener("click", (e) => {
        // Stop click propagating if clicking checkbox
        if (e.target.closest(".step-checkbox")) return;
        
        const isExpanded = stepDiv.classList.contains("expanded");
        // Collapse all others
        DOM.roadmapTimeline.querySelectorAll(".timeline-step").forEach(child => {
          child.classList.remove("expanded");
          child.querySelector(".step-body").style.maxHeight = null;
        });

        if (!isExpanded) {
          stepDiv.classList.add("expanded");
          const body = stepDiv.querySelector(".step-body");
          body.style.maxHeight = body.scrollHeight + "px";
        }
      });

      // Checkbox functionality
      const checkbox = stepDiv.querySelector(".step-checkbox");
      checkbox.addEventListener("click", () => {
        const skillId = checkbox.getAttribute("data-id");
        toggleRoadmapSkillCompletion(skillId);
      });

      DOM.roadmapTimeline.appendChild(stepDiv);
    });
  }

  function toggleRoadmapSkillCompletion(skillId) {
    if (appState.completedRoadmapSkills.has(skillId)) {
      appState.completedRoadmapSkills.delete(skillId);
      document.getElementById(`step-node-${skillId}`).classList.remove("completed");
    } else {
      appState.completedRoadmapSkills.add(skillId);
      document.getElementById(`step-node-${skillId}`).classList.add("completed");
    }

    // Save progress to local storage
    localStorage.setItem(
      `skillgap_progress_${appState.selectedRoleId}`,
      JSON.stringify([...appState.completedRoadmapSkills])
    );

    // Live update scores, chart and details list
    updateDashboardScores(appState.analysisResults);
    renderSkillBreakdownLists(appState.analysisResults);
    renderChart(appState.analysisResults);
  }

  function renderSuggestions(results) {
    DOM.suggestionsCards.innerHTML = "";
    
    DOM.suggestionsCountBadge.textContent = results.suggestions.length;
    DOM.suggestionsCountBadge.style.display = results.suggestions.length > 0 ? "inline-flex" : "none";

    results.suggestions.forEach(sugg => {
      const card = document.createElement("div");
      card.className = `suggestion-alert-card ${sugg.type}`;

      // Pick SVG Icon based on alert type
      let iconMarkup = "";
      if (sugg.type === "danger") {
        iconMarkup = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
      } else if (sugg.type === "warning") {
        iconMarkup = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`;
      } else if (sugg.type === "primary") {
        iconMarkup = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
      } else {
        iconMarkup = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
      }

      card.innerHTML = `
        <div class="sugg-icon-box">
          ${iconMarkup}
        </div>
        <div class="sugg-details">
          <h4>${sugg.title}</h4>
          <p>${sugg.message}</p>
        </div>
      `;
      DOM.suggestionsCards.appendChild(card);
    });
  }

  // --- Dashboard Tab switching ---
  function switchDashboardTab(selectedTab) {
    const tabs = [DOM.tabBreakdown, DOM.tabRoadmap, DOM.tabSuggestions];
    const panels = [DOM.panelBreakdown, DOM.panelRoadmap, DOM.panelSuggestions];
    
    const targetId = selectedTab.getAttribute("data-target");

    tabs.forEach(tab => tab.classList.remove("active"));
    panels.forEach(panel => panel.classList.remove("active"));

    selectedTab.classList.add("active");
    document.getElementById(targetId).classList.add("active");

    // Force recalculating body dimensions for transitions in timeline-step if roadmap is opened
    if (targetId === "panel-roadmap") {
      DOM.roadmapTimeline.querySelectorAll(".timeline-step.expanded").forEach(step => {
        const body = step.querySelector(".step-body");
        body.style.maxHeight = body.scrollHeight + "px";
      });
    }
  }

  // --- Helper Functions ---
  function resetToInputScreen() {
    // Destroy chart
    if (appState.chartInstance) {
      appState.chartInstance.destroy();
      appState.chartInstance = null;
    }
    
    // Clear state
    appState.analysisResults = null;
    appState.completedRoadmapSkills = new Set();
    
    // Clear files/inputs
    clearSelectedFile();
    DOM.textInput.value = "";
    DOM.targetRoleSelect.value = "";
    DOM.rolePreviewBox.style.display = "none";
    
    DOM.analyzeSubmitBtn.classList.add("disabled");
    DOM.analyzeSubmitBtn.setAttribute("disabled", "true");

    DOM.resultsScreen.style.display = "none";
    DOM.scanningScreen.style.display = "none";
    DOM.inputScreen.style.display = "block";
  }

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  // --- Start Up App ---
  init();
});
