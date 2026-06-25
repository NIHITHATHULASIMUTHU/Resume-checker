// skills-db.js
// A comprehensive repository of roles, skills, synonyms, and resources for the Skill Gap Finder analysis engine.

const SKILLS_DATABASE = {
  roles: {
    "frontend_developer": {
      name: "Frontend Developer",
      description: "Builds responsive, interactive web interfaces and optimizes frontend performance.",
      skills: [
        { id: "html", name: "HTML5", category: "Core", weight: 5, synonyms: ["html", "html5", "semantic html", "hypertext markup"] },
        { id: "css", name: "CSS3 / Sass", category: "Core", weight: 5, synonyms: ["css", "css3", "sass", "scss", "flexbox", "css grid"] },
        { id: "javascript", name: "JavaScript (ES6+)", category: "Core", weight: 5, synonyms: ["javascript", "js", "es6", "vanilla js", "typescript", "ts"] },
        { id: "react", name: "React.js", category: "Core", weight: 5, synonyms: ["react", "react.js", "reactjs", "next.js", "nextjs"] },
        { id: "git", name: "Git & GitHub", category: "Tool", weight: 4, synonyms: ["git", "github", "gitlab", "version control"] },
        { id: "tailwind", name: "Tailwind CSS", category: "Tool", weight: 3, synonyms: ["tailwind", "tailwindcss", "bootstrap", "material ui", "responsive design"] },
        { id: "web_perf", name: "Web Performance & SEO", category: "Advanced", weight: 3, synonyms: ["performance optimization", "seo", "lazy loading", "webpack", "vite"] },
        { id: "rest_api", name: "REST APIs & Fetch", category: "Core", weight: 4, synonyms: ["rest api", "restful", "api integration", "fetch", "axios", "graphql"] },
        { id: "testing", name: "Frontend Testing", category: "Advanced", weight: 3, synonyms: ["jest", "cypress", "testing library", "unit testing"] }
      ]
    },
    "backend_developer": {
      name: "Backend Developer",
      description: "Designs, builds, and maintains server-side logic, databases, and APIs.",
      skills: [
        { id: "nodejs", name: "Node.js & Express", category: "Core", weight: 5, synonyms: ["node", "nodejs", "node.js", "express", "expressjs", "nest.js", "nestjs"] },
        { id: "python_backend", name: "Python / Django / FastAPI", category: "Core", weight: 4, synonyms: ["python", "django", "fastapi", "flask"] },
        { id: "databases_sql", name: "SQL Databases", category: "Core", weight: 5, synonyms: ["sql", "postgresql", "mysql", "sqlite", "relational database"] },
        { id: "databases_nosql", name: "NoSQL Databases", category: "Core", weight: 4, synonyms: ["mongodb", "nosql", "redis", "firebase"] },
        { id: "rest_api", name: "RESTful API Design", category: "Core", weight: 5, synonyms: ["rest api", "restful", "graphql", "grpc", "endpoint design"] },
        { id: "docker", name: "Docker", category: "Tool", weight: 4, synonyms: ["docker", "containerization", "containers"] },
        { id: "git", name: "Git & Version Control", category: "Tool", weight: 4, synonyms: ["git", "github", "version control"] },
        { id: "auth", name: "Authentication & Security", category: "Core", weight: 4, synonyms: ["jwt", "oauth", "auth", "passport", "encryption", "https", "security"] },
        { id: "system_design", name: "System Design & Scaling", category: "Advanced", weight: 4, synonyms: ["system design", "microservices", "caching", "scalability", "load balancing"] }
      ]
    },
    "data_scientist": {
      name: "Data Scientist",
      description: "Analyzes complex datasets to extract insights, build predictive models, and guide decisions.",
      skills: [
        { id: "python", name: "Python Programming", category: "Core", weight: 5, synonyms: ["python", "py"] },
        { id: "sql", name: "SQL Data Extraction", category: "Core", weight: 5, synonyms: ["sql", "postgresql", "mysql", "queries"] },
        { id: "pandas_numpy", name: "Pandas & NumPy", category: "Core", weight: 5, synonyms: ["pandas", "numpy", "data manipulation", "data wrangling"] },
        { id: "machine_learning", name: "Machine Learning (Scikit-Learn)", category: "Core", weight: 5, synonyms: ["machine learning", "ml", "regression", "classification", "clustering", "scikit-learn", "sklearn"] },
        { id: "statistics", name: "Probability & Statistics", category: "Core", weight: 4, synonyms: ["statistics", "probability", "hypothesis testing", "ab testing", "a/b testing"] },
        { id: "data_viz", name: "Data Visualization", category: "Core", weight: 4, synonyms: ["matplotlib", "seaborn", "data visualization", "plotly", "ggplot"] },
        { id: "deep_learning", name: "Deep Learning Intro", category: "Advanced", weight: 3, synonyms: ["deep learning", "neural networks", "keras", "tensorflow", "pytorch"] },
        { id: "git", name: "Git / Version Control", category: "Tool", weight: 3, synonyms: ["git", "github"] }
      ]
    },
    "ai_engineer": {
      name: "AI / ML Engineer",
      description: "Develops, deploys, and optimizes large-scale machine learning and neural network models.",
      skills: [
        { id: "python", name: "Python Programming", category: "Core", weight: 5, synonyms: ["python", "py"] },
        { id: "pytorch", name: "PyTorch / TensorFlow", category: "Core", weight: 5, synonyms: ["pytorch", "torch", "tensorflow", "tf", "keras"] },
        { id: "deep_learning", name: "Deep Learning & Architecture", category: "Core", weight: 5, synonyms: ["deep learning", "neural networks", "cnn", "rnn", "transformers", "lstm"] },
        { id: "nlp", name: "Natural Language Processing (NLP)", category: "Advanced", weight: 4, synonyms: ["nlp", "natural language processing", "bert", "gpt", "spacy", "huggingface", "llm", "large language models"] },
        { id: "computer_vision", name: "Computer Vision (CV)", category: "Advanced", weight: 4, synonyms: ["computer vision", "opencv", "yolo", "image processing", "cnn"] },
        { id: "mlops", name: "MLOps & Model Deployment", category: "Core", weight: 4, synonyms: ["mlops", "model deployment", "docker", "kubernetes", "mlflow", "fastapi", "sagemaker"] },
        { id: "math_linalg", name: "Linear Algebra & Calculus", category: "Core", weight: 4, synonyms: ["linear algebra", "calculus", "optimization", "probability", "statistics"] },
        { id: "git", name: "Git & Collaboration", category: "Tool", weight: 3, synonyms: ["git", "github"] }
      ]
    },
    "data_analyst": {
      name: "Data Analyst",
      description: "Cleans, transforms, and visualizes data to help businesses make data-driven decisions.",
      skills: [
        { id: "sql", name: "Advanced SQL", category: "Core", weight: 5, synonyms: ["sql", "postgresql", "mysql", "joins", "subqueries", "window functions"] },
        { id: "excel", name: "Advanced Excel", category: "Core", weight: 4, synonyms: ["excel", "spreadsheets", "vlookup", "pivot tables", "vba"] },
        { id: "python_analysis", name: "Python (Pandas/NumPy)", category: "Core", weight: 4, synonyms: ["python", "pandas", "numpy", "jupyter notebook"] },
        { id: "tableau_powerbi", name: "Tableau or Power BI", category: "Tool", weight: 5, synonyms: ["tableau", "powerbi", "power bi", "dashboarding", "data visualization"] },
        { id: "statistics", name: "Basic Statistics", category: "Core", weight: 4, synonyms: ["statistics", "mean", "median", "correlation", "hypothesis test"] },
        { id: "communication", name: "Data Storytelling & Reporting", category: "Soft Skill", weight: 4, synonyms: ["communication", "storytelling", "reporting", "presentation", "stakeholder management"] },
        { id: "data_cleaning", name: "Data Cleaning / ETL", category: "Core", weight: 4, synonyms: ["data cleaning", "etl", "data preparation", "data preprocessing"] }
      ]
    },
    "devops_engineer": {
      name: "DevOps Engineer",
      description: "Bridges the gap between development and operations by automating deployment pipelines and infrastructure.",
      skills: [
        { id: "linux_bash", name: "Linux & Shell Scripting", category: "Core", weight: 5, synonyms: ["linux", "bash", "shell scripting", "unix", "scripting"] },
        { id: "docker", name: "Docker & Containerization", category: "Core", weight: 5, synonyms: ["docker", "containerization", "containers"] },
        { id: "kubernetes", name: "Kubernetes (K8s)", category: "Core", weight: 5, synonyms: ["kubernetes", "k8s", "helm"] },
        { id: "cicd", name: "CI / CD Pipelines", category: "Core", weight: 5, synonyms: ["ci/cd", "cicd", "jenkins", "github actions", "gitlab ci", "circleci", "pipelines"] },
        { id: "aws_cloud", name: "AWS or Azure Cloud Platform", category: "Core", weight: 4, synonyms: ["aws", "amazon web services", "azure", "gcp", "google cloud", "cloud computing"] },
        { id: "terraform", name: "Infrastructure as Code (IaC)", category: "Advanced", weight: 4, synonyms: ["terraform", "iac", "ansible", "cloudformation"] },
        { id: "monitoring", name: "Monitoring & Logging", category: "Tool", weight: 3, synonyms: ["prometheus", "grafana", "elk stack", "datadog", "monitoring", "logging"] },
        { id: "git", name: "Git Version Control", category: "Tool", weight: 4, synonyms: ["git", "github", "gitlab"] }
      ]
    },
    "cybersecurity_analyst": {
      name: "Cybersecurity Analyst",
      description: "Protects systems, networks, and programs from digital attacks and vulnerabilities.",
      skills: [
        { id: "networking", name: "Network Security", category: "Core", weight: 5, synonyms: ["networking", "network security", "tcp/ip", "dns", "subnets", "routing"] },
        { id: "linux", name: "Linux Administration", category: "Core", weight: 4, synonyms: ["linux", "bash", "command line", "ubuntu", "kali"] },
        { id: "firewalls", name: "Firewalls & VPNs", category: "Tool", weight: 4, synonyms: ["firewalls", "vpn", "ids", "ips", "network defense"] },
        { id: "penetration_testing", name: "Ethical Hacking / Pen Testing", category: "Advanced", weight: 4, synonyms: ["penetration testing", "pen testing", "ethical hacking", "metasploit", "nmap", "vulnerability scanning"] },
        { id: "cryptography", name: "Cryptography & PKI", category: "Core", weight: 3, synonyms: ["cryptography", "encryption", "ssl", "tls", "pki", "hashing"] },
        { id: "siem", name: "SIEM & Logging (Splunk)", category: "Tool", weight: 4, synonyms: ["siem", "splunk", "soc", "log analysis", "incident detection"] },
        { id: "python_sec", name: "Python for Security", category: "Tool", weight: 3, synonyms: ["python", "scripting", "automation"] },
        { id: "incident_response", name: "Incident Response", category: "Core", weight: 4, synonyms: ["incident response", "incident handling", "forensics", "malware analysis"] }
      ]
    },
    "product_manager": {
      name: "Product Manager",
      description: "Defines product strategy, leads cross-functional teams, and drives product delivery.",
      skills: [
        { id: "product_roadmap", name: "Product Roadmap & Strategy", category: "Core", weight: 5, synonyms: ["product roadmap", "roadmap", "product strategy", "vision"] },
        { id: "agile_scrum", name: "Agile & Scrum", category: "Core", weight: 5, synonyms: ["agile", "scrum", "kanban", "sprints", "jira", "confluence"] },
        { id: "wireframing", name: "UX Design & Wireframing", category: "Tool", weight: 3, synonyms: ["figma", "wireframing", "mockups", "ux", "user experience", "balsamiq"] },
        { id: "data_analytics", name: "Data Analytics & Metrics", category: "Core", weight: 4, synonyms: ["mixpanel", "amplitude", "google analytics", "data analytics", "kpi", "okr", "metrics"] },
        { id: "market_research", name: "Market & User Research", category: "Core", weight: 4, synonyms: ["market research", "user research", "interviews", "competitor analysis", "personas"] },
        { id: "communication", name: "Stakeholder Communication", category: "Soft Skill", weight: 5, synonyms: ["communication", "stakeholder management", "leadership", "collaboration", "cross-functional"] },
        { id: "product_reqs", name: "Writing PRDs / User Stories", category: "Core", weight: 5, synonyms: ["prd", "user stories", "requirements", "product requirements"] }
      ]
    }
  },

  learningResources: {
    "html": {
      title: "HTML5 & Semantic Markup",
      resources: [
        { name: "MDN HTML Basics", type: "Docs/Tutorial", url: "https://developer.mozilla.org/en-US/docs/Learn/HTML", duration: "6-8 hours" },
        { name: "freeCodeCamp Responsive Web Design", type: "Interactive Course", url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/", duration: "30 hours" }
      ],
      projects: ["Build a personal portfolio landing page with semantic structure", "Create an accessible forms/survey webpage"]
    },
    "css": {
      title: "CSS3 Foundations, Flexbox, & Grid",
      resources: [
        { name: "CSS-Tricks Flexbox / Grid Guides", type: "Reference", url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/", duration: "4 hours" },
        { name: "Kevin Powell CSS Channel", type: "Video Tutorial", url: "https://www.youtube.com/@KevinPowell", duration: "10 hours" }
      ],
      projects: ["Style a complex landing page without absolute positioning", "Create a responsive multi-column gallery dashboard layout"]
    },
    "javascript": {
      title: "JavaScript ES6+ and DOM Scripting",
      resources: [
        { name: "JavaScript.info", type: "Interactive Guide", url: "https://javascript.info/", duration: "40 hours" },
        { name: "freeCodeCamp JavaScript Algorithms", type: "Course", url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures-v8/", duration: "50 hours" }
      ],
      projects: ["Develop a dynamic todo list with local storage integration", "Create an interactive weather app calling a free REST API"]
    },
    "react": {
      title: "React.js Component Architecture",
      resources: [
        { name: "React Official Documentation (Beta Docs)", type: "Docs", url: "https://react.dev/learn", duration: "12 hours" },
        { name: "Scrimba Learn React", type: "Interactive Video", url: "https://scrimba.com/learn/learnreact", duration: "15 hours" }
      ],
      projects: ["Build a task dashboard with search, filtering, and status updates", "Create a multi-step checkout workflow with context state management"]
    },
    "git": {
      title: "Git & Version Control Workflows",
      resources: [
        { name: "Learn Git Branching", type: "Interactive Game", url: "https://learngitbranching.js.org/", duration: "3 hours" },
        { name: "GitHub Skills Tutorials", type: "Hands-on", url: "https://skills.github.com/", duration: "4 hours" }
      ],
      projects: ["Set up a GitHub repo, initialize branching workflows, and open a PR with merge conflict resolutions"]
    },
    "tailwind": {
      title: "Tailwind CSS Speed Styling",
      resources: [
        { name: "Tailwind CSS Official Docs", type: "Docs", url: "https://tailwindcss.com/docs", duration: "3 hours" },
        { name: "Tailwind Crash Course (Traversy Media)", type: "Video", url: "https://www.youtube.com/watch?v=dFgzHOX84xQ", duration: "2 hours" }
      ],
      projects: ["Convert a vanilla CSS page to Tailwind utility classes layout", "Design a glassmorphic sidebar login page component"]
    },
    "web_perf": {
      title: "Frontend Web Performance & SEO Optimization",
      resources: [
        { name: "web.dev Performance Guide", type: "Docs", url: "https://web.dev/learn-web-vitals/", duration: "8 hours" }
      ],
      projects: ["Optimize an image-heavy webpage to achieve 95+ Core Web Vitals on Lighthouse"]
    },
    "rest_api": {
      title: "REST APIs & Asynchronous Integration",
      resources: [
        { name: "FreeCodeCamp APIs and Microservices", type: "Course", url: "https://www.freecodecamp.org/learn/back-end-development-and-apis/", duration: "20 hours" }
      ],
      projects: ["Build a client dashboard consuming 3 separate third-party APIs (e.g. GitHub, Weather, Unsplash) concurrently"]
    },
    "testing": {
      title: "Frontend Testing (Jest & Cypress)",
      resources: [
        { name: "Testing JavaScript (Kent C. Dodds)", type: "Tutorial", url: "https://testingjavascript.com/", duration: "8 hours" }
      ],
      projects: ["Write unit tests for UI utility library and e2e integration tests for user login path"]
    },
    "nodejs": {
      title: "Node.js & Express Server Infrastructure",
      resources: [
        { name: "The Odin Project Node.js Path", type: "Interactive Tutorial", url: "https://www.theodinproject.com/paths/full-stack-javascript/courses/nodejs", duration: "40 hours" }
      ],
      projects: ["Build a REST API backend with full CRUD operations for an inventory tracking app"]
    },
    "python_backend": {
      title: "Python Web Frameworks (Django / FastAPI)",
      resources: [
        { name: "FastAPI Tutorial User Guide", type: "Docs", url: "https://fastapi.tiangolo.com/tutorial/", duration: "10 hours" }
      ],
      projects: ["Build a high-performance backend routing engine for a task dashboard using FastAPI and Pydantic validation"]
    },
    "databases_sql": {
      title: "SQL Databases and Schema Architecture",
      resources: [
        { name: "SQLBolt Interactive Lessons", type: "Interactive", url: "https://sqlbolt.com/", duration: "6 hours" }
      ],
      projects: ["Design a relational database schema for an e-commerce platform and optimize queries using indexing and JOINs"]
    },
    "databases_nosql": {
      title: "NoSQL Architectures (MongoDB)",
      resources: [
        { name: "MongoDB University Basics", type: "Course", url: "https://learn.mongodb.com/", duration: "10 hours" }
      ],
      projects: ["Build a user activity logs database supporting unstructured hierarchical metadata fields"]
    },
    "docker": {
      title: "Docker Containerization and Workspaces",
      resources: [
        { name: "Docker for Beginners (Docker Curriculum)", type: "Tutorial", url: "https://docker-curriculum.com/", duration: "5 hours" }
      ],
      projects: ["Containerize a multi-service web application (React frontend, Node API, Postgres Database) using Docker Compose"]
    },
    "auth": {
      title: "Web Security, JWT, and OAuth Protocols",
      resources: [
        { name: "SuperTokens Auth Guides", type: "Articles", url: "https://supertokens.com/blog", duration: "6 hours" }
      ],
      projects: ["Implement a custom JWT signup/login flow with refresh token rotation and hashed password storage"]
    },
    "system_design": {
      title: "System Design and High-Scale Architectures",
      resources: [
        { name: "ByteByteGo (Alex Xu) System Design", type: "Guides", url: "https://bytebytego.com/", duration: "30 hours" }
      ],
      projects: ["Draw an architectural blueprint diagram for a global chat app handling 100k active users (with Redis, WebSockets, Sharding)"]
    },
    "python": {
      title: "Python Data Science Foundations",
      resources: [
        { name: "Kaggle Learn Python", type: "Interactive", url: "https://www.kaggle.com/learn/python", duration: "5 hours" }
      ],
      projects: ["Build a modular command line script that processes CSV datasets and exports summaries"]
    },
    "sql": {
      title: "SQL Data Querying & Wrangling",
      resources: [
        { name: "Mode Analytics SQL Tutorial", type: "Tutorial", url: "https://mode.com/sql-tutorial/", duration: "12 hours" }
      ],
      projects: ["Write a complex window function query analyzing monthly user retention metrics"]
    },
    "pandas_numpy": {
      title: "Pandas & NumPy Data Wrangling",
      resources: [
        { name: "Kaggle Pandas Course", type: "Interactive", url: "https://www.kaggle.com/learn/pandas", duration: "4 hours" }
      ],
      projects: ["Wrangle, clean, and merge a chaotic dataset with missing data columns and format outliers"]
    },
    "machine_learning": {
      title: "Machine Learning (Scikit-Learn) Pipelines",
      resources: [
        { name: "Kaggle Intro to Machine Learning", type: "Interactive", url: "https://www.kaggle.com/learn/intro-to-machine-learning", duration: "6 hours" },
        { name: "Machine Learning Zoomcamp", type: "Hands-on Course", url: "https://github.com/alexeygrigorev/mlbookcamp-code/tree/master/course-zoomcamp", duration: "40 hours" }
      ],
      projects: ["Build a home price prediction model using feature encoding, scaling, and random forest regression"]
    },
    "statistics": {
      title: "Practical Statistics & A/B Testing",
      resources: [
        { name: "Khan Academy Statistics & Probability", type: "Lessons", url: "https://www.khanacademy.org/math/statistics-probability", duration: "25 hours" }
      ],
      projects: ["Design and evaluate the results of an A/B landing page click-rate test using p-values and confidence intervals"]
    },
    "data_viz": {
      title: "Data Visualization & Communication Library",
      resources: [
        { name: "Python Graph Gallery", type: "Examples", url: "https://python-graph-gallery.com/", duration: "4 hours" }
      ],
      projects: ["Generate a customized multi-panel visualization report detailing product sales trends using Seaborn"]
    },
    "deep_learning": {
      title: "Neural Networks & Deep Learning Intro",
      resources: [
        { name: "3Blue1Brown Neural Networks", type: "Videos", url: "https://www.3blue1brown.com/topics/neural-networks", duration: "3 hours" },
        { name: "Fast.ai Practical Deep Learning for Coders", type: "Course", url: "https://course.fast.ai/", duration: "40 hours" }
      ],
      projects: ["Train an image classification neural network to recognize digits with 98%+ validation accuracy"]
    },
    "pytorch": {
      title: "Deep Learning with PyTorch",
      resources: [
        { name: "PyTorch Official Tutorials", type: "Docs", url: "https://pytorch.org/tutorials/", duration: "15 hours" }
      ],
      projects: ["Build and train a custom Convolutional Neural Network (CNN) in PyTorch to classify objects"]
    },
    "nlp": {
      title: "Natural Language Processing & LLMs",
      resources: [
        { name: "Hugging Face NLP Course", type: "Interactive Docs", url: "https://huggingface.co/learn/nlp-course", duration: "20 hours" }
      ],
      projects: ["Fine-tune a BERT-based transformer model for customized sentiment analysis tasks"]
    },
    "computer_vision": {
      title: "Computer Vision & Image Engineering",
      resources: [
        { name: "OpenCV Basic Guides", type: "Docs", url: "https://docs.opencv.org/master/d9/df8/tutorial_root.html", duration: "10 hours" }
      ],
      projects: ["Build a real-time face tracking and cropping utility using OpenCV Haar cascades"]
    },
    "mlops": {
      title: "MLOps: Deploying and Monitoring Models",
      resources: [
        { name: "Made With ML MLOps Curriculum", type: "Comprehensive Course", url: "https://madewithml.com/", duration: "30 hours" }
      ],
      projects: ["Create a complete training, packaging, and API serving deployment for an ML model using Docker & FastAPI"]
    },
    "math_linalg": {
      title: "Math Foundations: Linear Algebra & Calculus",
      resources: [
        { name: "Imperial College Mathematics for Machine Learning", type: "Coursera", url: "https://www.coursera.org/specializations/mathematics-machine-learning", duration: "40 hours" }
      ],
      projects: ["Implement gradient descent optimization from scratch in pure Python using matrix math operations"]
    },
    "excel": {
      title: "Data Manipulation in Excel",
      resources: [
        { name: "Chandoo Excel Tutorials", type: "Articles", url: "https://chandoo.org/", duration: "8 hours" }
      ],
      projects: ["Build an interactive finance budget planning dashboard in Excel using lookup functions and pivot charts"]
    },
    "tableau_powerbi": {
      title: "Tableau & Power BI Dashboards",
      resources: [
        { name: "Tableau Public Training Videos", type: "Videos", url: "https://public.tableau.com/en-us/s/resources", duration: "10 hours" }
      ],
      projects: ["Develop a global operations business dashboard inside Tableau featuring map layouts and custom filters"]
    },
    "data_cleaning": {
      title: "Data Preparation & ETL Pipelines",
      resources: [
        { name: "Coursera Google Data Analytics (Data Cleaning Module)", type: "Course", url: "https://www.coursera.org/professional-certificates/google-data-analytics", duration: "15 hours" }
      ],
      projects: ["Clean a massive survey raw dataset resolving string capitalization errors, duplicate entries, and null values"]
    },
    "communication": {
      title: "Data Storytelling & Stakeholder Presentations",
      resources: [
        { name: "Storytelling with Data (Cole Knaflic)", type: "Lessons", url: "https://www.storytellingwithdata.com/", duration: "8 hours" }
      ],
      projects: ["Design a 5-slide business deck translating raw conversion data insights into key strategic opportunities"]
    },
    "linux_bash": {
      title: "Linux CLI & Bash Scripting",
      resources: [
        { name: "The Linux Command Line (Book)", type: "PDF Guide", url: "https://linuxcommand.org/", duration: "15 hours" }
      ],
      projects: ["Write a shell script that logs server memory, filters errors from syslogs, and sends email notifications"]
    },
    "kubernetes": {
      title: "Production Orchestration with Kubernetes",
      resources: [
        { name: "Kubernetes Up & Running (Book/Course)", type: "Course", url: "https://kubernetes.io/docs/tutorials/", duration: "25 hours" }
      ],
      projects: ["Set up a local multi-node cluster using Minikube and deploy a load-balanced microservices pipeline"]
    },
    "cicd": {
      title: "CI/CD Orchestration (GitHub Actions)",
      resources: [
        { name: "GitHub Actions Tutorial (freeCodeCamp)", type: "Video", url: "https://www.youtube.com/watch?v=R8_veQiYtGo", duration: "3 hours" }
      ],
      projects: ["Set up a CI pipeline running automated linting, tests, and auto-deploying onto Netlify/Vercel on push"]
    },
    "aws_cloud": {
      title: "Cloud Architecture Foundations (AWS)",
      resources: [
        { name: "AWS Cloud Practitioner (AWS Skill Builder)", type: "Course", url: "https://skillbuilder.aws/", duration: "20 hours" }
      ],
      projects: ["Deploy an auto-scaling group of EC2 instances behind an Application Load Balancer with secure VPC networking"]
    },
    "terraform": {
      title: "Infrastructure as Code with Terraform",
      resources: [
        { name: "HashiCorp Learn Terraform", type: "Interactive Tutorial", url: "https://developer.hashicorp.com/terraform/tutorials", duration: "10 hours" }
      ],
      projects: ["Provision a complete AWS cloud infrastructure (VPC, RDS, EC2, S3) using reusable modular Terraform files"]
    },
    "monitoring": {
      title: "Metrics Monitoring & Visualizations (Prometheus)",
      resources: [
        { name: "Prometheus Tutorial (Robust Perception)", type: "Guides", url: "https://www.robustperception.io/", duration: "8 hours" }
      ],
      projects: ["Instrument a Node.js API with custom Prometheus count metrics and plot real-time usage in Grafana"]
    },
    "networking": {
      title: "Computer Networking & Traffic Routing",
      resources: [
        { name: "CompTIA Network+ (Professor Messer)", type: "Videos", url: "https://www.professormesser.com/", duration: "30 hours" }
      ],
      projects: ["Analyze a packet capture file (PCAP) in Wireshark to locate DNS leak vulnerabilities and TCP handshakes"]
    },
    "firewalls": {
      title: "Firewalls, Intrusion Prevention & VPNs",
      resources: [
        { name: "pfSense Administration Guides", type: "Docs", url: "https://docs.netgate.com/pfsense/en/latest/", duration: "12 hours" }
      ],
      projects: ["Configure network subnets and stateful firewall rules to block unauthorized interface routing"]
    },
    "penetration_testing": {
      title: "Penetration Testing & Vulnerability Assessment",
      resources: [
        { name: "TryHackMe Pre-Security & Pen Testing Paths", type: "Interactive Lab", url: "https://tryhackme.com/", duration: "50 hours" }
      ],
      projects: ["Conduct a full vulnerability scan and gain shell access to an authorized sandbox machine using Metasploit"]
    },
    "cryptography": {
      title: "Cryptography Basics & TLS Implementations",
      resources: [
        { name: "Practical Cryptography for Developers (Book)", type: "Book", url: "https://cryptobook.nakov.com/", duration: "10 hours" }
      ],
      projects: ["Implement AES encryption and RSA key pairs to sign messages and encrypt local file payloads"]
    },
    "siem": {
      title: "Security Monitoring & SIEM Analytics",
      resources: [
        { name: "Splunk Fundamentals (Splunk Training)", type: "Course", url: "https://www.splunk.com/en_us/training.html", duration: "15 hours" }
      ],
      projects: ["Ingest firewall logs into Splunk, write queries to identify brute force patterns, and construct alerts"]
    },
    "incident_response": {
      title: "Incident Response and Forensics",
      resources: [
        { name: "SANS Security Resources", type: "Articles/Whitepapers", url: "https://www.sans.org/security-resources/", duration: "20 hours" }
      ],
      projects: ["Examine a simulated Windows workstation memory dump to identify active process malware payloads"]
    },
    "product_roadmap": {
      title: "Product Strategy, Vision & Roadmaps",
      resources: [
        { name: "Product Management Guides (Product Plan)", type: "Articles", url: "https://www.productplan.com/", duration: "10 hours" }
      ],
      projects: ["Draft a 12-month product vision, strategic goals, and release roadmaps for a new logistics mobile app"]
    },
    "agile_scrum": {
      title: "Agile Project Frameworks & Scrum",
      resources: [
        { name: "Scrum Alliance Training", type: "Guides", url: "https://www.scrumalliance.org/about-scrum", duration: "6 hours" }
      ],
      projects: ["Coordinate a 2-week sprint backlog session, defining user stories, task estimations, and sub-task boards"]
    },
    "wireframing": {
      title: "UX Design & Figma Wireframes",
      resources: [
        { name: "Figma Learn Tutorials", type: "Interactive Videos", url: "https://help.figma.com/hc/en-us/categories/360002051613-Learn-Figma", duration: "12 hours" }
      ],
      projects: ["Create interactive low-fidelity layouts and high-fidelity clickable UI prototypes for a web platform"]
    },
    "data_analytics": {
      title: "Product Metrics, KPI Tracking, & Mixpanel",
      resources: [
        { name: "Mixpanel Product Analytics Certification", type: "Course", url: "https://mixpanel.com/blog/mixpanel-certification-course/", duration: "8 hours" }
      ],
      projects: ["Set up funnel tracking and user retention charts comparing user registration onboarding dropoffs"]
    },
    "market_research": {
      title: "Competitor & User Research Methodologies",
      resources: [
        { name: "Interaction Design Foundation (User Research)", type: "Guides", url: "https://www.interaction-design.org/literature/topics/user-research", duration: "18 hours" }
      ],
      projects: ["Perform a SWOT competitor report and conduct 5 user interviews detailing workflow friction points"]
    },
    "product_reqs": {
      title: "Writing Clear Requirements & PRDs",
      resources: [
        { name: "Atlassian PRD Writing Guide", type: "Guides", url: "https://www.atlassian.com/agile/product-management/requirements", duration: "5 hours" }
      ],
      projects: ["Draft a complete 8-page Product Requirements Document (PRD) detailing user login authentication features"]
    }
  }
};

// Export database for browser integration
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SKILLS_DATABASE };
} else {
  window.SKILLS_DATABASE = SKILLS_DATABASE;
}
