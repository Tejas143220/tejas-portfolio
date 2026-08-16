export const personalData = {
  name: "Tejas Thakare",
  shortName: "Tejas",
  brandLogo: "TT",
  title: "Python & Full Stack Developer | Computer Science Postgraduate",
  subtitle: "Postgraduate student skilled in FastAPI, React.js, Next.js, PostgreSQL, Python, and ERP systems.",
  email: "tthakare67@gmail.com",
  phone: "+91 7058638277",
  location: "Nashik, Maharashtra, India",
  github: "https://github.com/Tejas143220",
  linkedin: "https://www.linkedin.com/in/tejas-thakare-440799251/",
  twitter: "https://twitter.com/tejashakare",
  resumeUrl: "/TEJAS_THAKARE_R.pdf",
  
  aboutNarrative: [
    "I am a motivated Computer Science postgraduate with hands-on experience in Python development, ERP systems, full-stack web development, and database management.",
    "Skilled in FastAPI, React.js, Next.js, PostgreSQL, and Odoo ERP. Passionate about building scalable applications, solving real-world problems, and continuously learning modern technologies.",
    "During my internships at Application Square Infotech and Nutshell InfoSoft, I engineered industrial ERP solutions for inventory tracking, built high-speed RESTful APIs with FastAPI, and customized healthcare management workflows in Odoo."
  ],

  certifications: [
    {
      id: "ds-python",
      title: "Data Science with Python",
      issuer: "Udemy Professional Course",
      date: "2024",
      description: "Mastered data analysis, NumPy, Pandas, Data Visualization (Matplotlib/Seaborn), and foundational Machine Learning algorithms in Python.",
      skills: ["Python", "Data Science", "Pandas", "NumPy", "Data Analytics"]
    },
    {
      id: "py-cert",
      title: "Python Programming Certification",
      issuer: "Professional Certification",
      date: "2023",
      description: "Advanced Object-Oriented Programming, file handling, backend microservices design, and clean architecture practices in Python.",
      skills: ["Python", "OOP", "Data Structures", "API Integration"]
    },
    {
      id: "c-fund",
      title: "C Programming Fundamentals",
      issuer: "Technical Certification",
      date: "2022",
      description: "Memory management, pointers, dynamic memory allocation, and algorithmic problem-solving foundations.",
      skills: ["C Language", "Memory Management", "Algorithms", "Pointers"]
    }
  ],

  spokenLanguages: [
    { language: "Marathi", proficiency: "Native" },
    { language: "Hindi", proficiency: "Fluent" },
    { language: "English", proficiency: "Intermediate" }
  ],

  softSkills: [
    { title: "ERP & Workflow Architecture", desc: "Designing inventory, supplier & patient management systems" },
    { title: "Full-Stack API Design", desc: "Building REST APIs with FastAPI, Node, and SQL databases" },
    { title: "Problem Solving", desc: "Algorithmic thinking & efficient database query optimization" },
    { title: "Continuous Learning", desc: "Rapidly mastering emerging web frameworks & tools" }
  ]
};

export const statsData = [
  { label: "M.Sc. Academic SGPA", value: 8.0, suffix: " / 10", decimals: 1 },
  { label: "Enterprise Projects", value: 4, suffix: "+ Systems", decimals: 0 },
  { label: "Backend REST APIs", value: 25, suffix: "+ Endpoints", decimals: 0 },
  { label: "ERP Workflow Automation", value: 100, suffix: "% Efficient", decimals: 0 }
];

export const terminalCommands = {
  help: `Available Shell Commands:
  whoami      - Developer profile & role
  api         - Launch Interactive FastAPI REST API Studio
  skills      - Technical skills breakdown
  projects    - List active projects
  open <#|id> - Open project or link (e.g. "open 1", "open github")
  ls          - List virtual workspace files
  cat <file>  - Read virtual file (e.g. "cat about.txt", "cat skills.json")
  sysinfo     - View system architecture
  ping <host> - Ping external server with latency metrics
  matrix      - Trigger digital rain animation
  quote       - Display programming wisdom
  date        - Current timestamp
  contact     - Contact information
  resume      - Launch CV Viewer
  clear       - Clear terminal screen`,
  api: "Opening Interactive FastAPI REST API Studio Workbench...",
  whoami: "Tejas Thakare | M.Sc. Computer Science Postgraduate\nRole: Python & Full Stack Developer\nFocus: FastAPI, React.js, Next.js, PostgreSQL, Odoo 16 ERP\nStatus: 🟢 Open to Python & Web Developer roles",
  skills: `Core Languages : Python, JavaScript, SQL, C, PHP
Backend & APIs : FastAPI, Node.js, RESTful Microservices
Frontend UI    : React.js, Next.js, Tailwind CSS, Framer Motion
Database & ERP : PostgreSQL, MySQL, Odoo 16 ERP, Git & GitHub`,
  projects: `1. Discover Nashik Tourism Guide [Live: https://nashik-tourism-eta.vercel.app/] -> Run "open 1"
2. Nashik's Best Misal Portal     [Live: https://nashik-top-misal.vercel.app]    -> Run "open 2"
3. Fly Ash Bricks ERP System     [FastAPI + Next.js + PostgreSQL]               -> Run "open 3"
4. E-Learning Platform           [PHP + MySQL Full Stack]                      -> Run "open 4"`,
  contact: "Email: tthakare67@gmail.com\nPhone: +91 7058638277\nLocation: Nashik, Maharashtra, India\nGitHub: github.com/Tejas143220\nLinkedIn: linkedin.com/in/tejas-thakare-440799251/",
  resume: "Opening PDF Resume Viewer... (Downloaded: TEJAS_THAKARE_R.pdf)"
};


export const skillsCategories = [
  {
    category: "Languages & Core",
    id: "languages",
    iconName: "FaCode",
    description: "Core programming languages for backend logic, web interfaces, and data handling.",
    skills: [
      { name: "Python", level: "Advanced", icon: "FaPython" },
      { name: "JavaScript", level: "Advanced", icon: "FaJs" },
      { name: "PHP", level: "Intermediate", icon: "FaPhp" },
      { name: "SQL", level: "Advanced", icon: "FaDatabase" },
      { name: "C", level: "Intermediate", icon: "FaCode" },
      { name: "HTML5", level: "Advanced", icon: "FaHtml5" },
      { name: "CSS3", level: "Advanced", icon: "FaCss3Alt" }
    ]
  },
  {
    category: "Frontend Development",
    id: "frontend",
    iconName: "FaReact",
    description: "Creating responsive, modern, and accessible client-side web applications.",
    skills: [
      { name: "React.js", level: "Advanced", icon: "FaReact" },
      { name: "Next.js", level: "Intermediate", icon: "SiNextdotjs" },
      { name: "Tailwind CSS", level: "Advanced", icon: "SiTailwindcss" },
      { name: "Bootstrap", level: "Advanced", icon: "SiBootstrap" },
      { name: "Framer Motion", level: "Intermediate", icon: "SiFramer" }
    ]
  },
  {
    category: "Backend & Frameworks",
    id: "backend",
    iconName: "FaServer",
    description: "Building fast microservices, REST APIs, and server application workflows.",
    skills: [
      { name: "FastAPI", level: "Advanced", icon: "SiFastapi" },
      { name: "Python (AI/ML)", level: "Intermediate", icon: "FaPython" },
      { name: "PHP", level: "Intermediate", icon: "FaPhp" },
      { name: "Node.js", level: "Intermediate", icon: "FaNodeJs" },
      { name: "RESTful APIs", level: "Advanced", icon: "FaNetworkWired" }
    ]
  },
  {
    category: "Databases & ERP Tools",
    id: "databases",
    iconName: "FaDatabase",
    description: "Relational database systems, ERP platforms, and developer environment.",
    skills: [
      { name: "PostgreSQL", level: "Advanced", icon: "SiPostgresql" },
      { name: "MySQL", level: "Advanced", icon: "SiMysql" },
      { name: "Odoo 16 ERP", level: "Intermediate", icon: "FaCogs" },
      { name: "Git & GitHub", level: "Advanced", icon: "FaGithub" },
      { name: "GitLab", level: "Intermediate", icon: "FaGitlab" },
      { name: "VS Code", level: "Advanced", icon: "VscCode" }
    ]
  }
];

export const experienceData = [
  {
    role: "Python Development (AI, ML) Intern",
    company: "Application Square Infotech Pvt. Ltd.",
    location: "Nashik, Maharashtra",
    duration: "Jan 2026 – June 2026",
    type: "Internship",
    description: [
      "Developed an ERP-based Inventory Management System tailored for the Fly Ash Bricks industry.",
      "Designed and implemented core business modules: Product, Customer, Supplier, Category, and Inventory.",
      "Built high-performance RESTful APIs using FastAPI and integrated PostgreSQL relational databases.",
      "Collaborated closely with frontend engineers using React.js and Next.js for seamless data synchronization."
    ],
    techStack: ["Python", "FastAPI", "PostgreSQL", "React.js", "Next.js", "ERP Architecture"]
  },
  {
    role: "Web Development Intern",
    company: "Nutshell InfoSoft Pvt. Ltd.",
    location: "Nashik, Maharashtra",
    duration: "1 Month",
    type: "Internship",
    description: [
      "Developed Hospital Management modules using Odoo 16 ERP platform.",
      "Implemented workflows for Doctor management, Patient records, and Appointment scheduling.",
      "Customized administrative dashboards, data entry forms, and business logic processes."
    ],
    techStack: ["Odoo 16 ERP", "Python", "PostgreSQL", "XML", "JavaScript"]
  }
];

export const educationData = [
  {
    degree: "M.Sc. Computer Science",
    institution: "K.K. Wagh Arts, Commerce, Science & Computer Science College, Nashik",
    university: "Savitribai Phule Pune University (SPPU)",
    duration: "2024 – 2026",
    grade: "SGPA: 8.00 / 10",
    details: "Postgraduate degree focusing on Advanced Computer Science, Python Backend Architecture, Web Frameworks, Database Optimization, and System Design."
  },
  {
    degree: "B.Sc. Computer Science",
    institution: "KVN Naik College, Nashik",
    university: "Savitribai Phule Pune University (SPPU)",
    duration: "2021 – 2024",
    grade: "CGPA: 7.27 / 10",
    details: "Bachelor's degree covering Data Structures, Web Development, Relational Databases (MySQL/PostgreSQL), C, and Object-Oriented Programming."
  }
];

export const projectsData = [
  {
    id: 1,
    title: "Discover Nashik - Official Travel & Tourism Guide",
    category: "Full Stack",
    shortDescription: "Interactive travel portal featuring 1, 2 & 3-day tour planners, Trimbakeshwar Jyotirlinga, Sula Vineyards, Sahyadri fort treks, and PWA offline guides.",
    detailedDescription: "Designed and engineered an interactive tourism portal for Nashik, Maharashtra. Features custom multi-day itinerary planners, Leaflet map location guides, Trimbakeshwar temple timings, vineyard wine tasting guides, Sahyadri fort trekking trails, and offline GeoJSON support deployed on Vercel.",
    image: "/project_tourism.jpg",
    tags: ["React.js", "Tailwind CSS", "JavaScript", "Leaflet Maps", "Vercel"],
    githubUrl: "https://github.com/Tejas143220",
    liveUrl: "https://nashik-tourism-eta.vercel.app/"
  },
  {
    id: 2,
    title: "Nashik's Best Misal - Discovery & Review Portal",
    category: "Full Stack",
    shortDescription: "Interactive web platform showcasing top-rated authentic Misal joints in Nashik with reviews, spice indicators, and live discovery.",
    detailedDescription: "Designed and developed a comprehensive food discovery web portal highlighting Nashik's iconic Misal spots (Chulhivarchi, Zanzanit, Special Rassa). Features authentic customer reviews, spice level metrics, search filtering, and live deployment on Vercel.",
    image: "/project_misal.jpg",
    tags: ["React.js", "Tailwind CSS", "JavaScript", "Vercel", "Web App"],
    githubUrl: "https://github.com/Tejas143220",
    liveUrl: "https://nashik-top-misal.vercel.app"
  },
  {
    id: 3,
    title: "Fly Ash Bricks ERP System",
    category: "ERP Systems",
    shortDescription: "Complete ERP inventory & business operations platform built with FastAPI, Next.js, and PostgreSQL.",
    detailedDescription: "Developed a comprehensive enterprise resource planning system for the Fly Ash Bricks manufacturing industry. Features include product cataloging, supplier management, automated inventory tracking, sales invoicing, reporting analytics, and role-based authentication.",
    image: "/project_cloud.jpg",
    tags: ["React.js", "Next.js", "FastAPI", "Python", "PostgreSQL"],
    githubUrl: "https://github.com/Tejas143220",
    liveUrl: "#"
  },
  {
    id: 4,
    title: "E-Learning Platform",
    category: "Full Stack",
    shortDescription: "Interactive online learning portal with student registration, course management, and enrollment dashboard.",
    detailedDescription: "Built a full-stack educational web application enabling student registration, secure login authentication, course management, active enrollment tracking, and user dashboards using PHP, MySQL, and responsive frontend UI.",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1000&q=80",
    tags: ["PHP", "MySQL", "HTML5", "CSS3", "JavaScript"],
    githubUrl: "https://github.com/Tejas143220",
    liveUrl: "#"
  }
];
