/* 
   PORTFOLIO DATA — Edit this file to update your website.
   All sections are driven by this file. No need to touch
   HTML or other JS files for content changes.
   */

const PORTFOLIO_DATA = {

  /* ─── PERSONAL INFO ───────────────────────────────────── */
  personal: {
    name:       "Jelilat Oluwatosin Abdullateef",
    nameShort:  "Jelilat",
    initials:   "JELILAT",
    tagline:    "Helping businesses make better decisions through data, improve products, and turn ideas into real business growth",
    email:      "jelilatoluwatosinabdullateef@gmail.com",
    phone:      "+234 905 273 9745",
    whatsapp:   "+234 907 586 0492",
    location:   "Nigeria",
    profilePhoto: "assets/images/profile.jpg",
    resumeUrl:    "assets/resume/Jelilat_Resume.pdf",
    scheduleUrl:  "https://cal.com/en/jelilatdatainsights",
    formspreeId:  "mojoeqrg",

    roles: [
      "Data Analyst",
      "Product Analyst",
      "Product Manager",
      "QA Tester",
      "Lead Generation Specialist",
      "Sales Professional",
      "Account Manager",
      "Business Problem Solver"
    ],

    social: {
      linkedin: "https://www.linkedin.com/in/jelilat/",
      github:   "https://github.com/Jelilat25",
      novypro:  "https://www.novypro.com/profile_projects/jelilatdatainsights",
      contra:   "https://contra.com/JelilatDataInsights",
      email:    "mailto:jelilatoluwatosinabdullateef@gmail.com",
      whatsapp: "https://wa.me/2349075860492"
    },

    /* ─── SOCIAL ICON SETTINGS ─────────────────────────────
       Edit each icon independently:
       url       → where clicking takes the user
       imgUrl    → logo image (use Simple Icons CDN or your own)
                   Format: https://cdn.simpleicons.org/{slug}/{hex}
       label     → accessible name (tooltip + screen reader)
       iconColor → tint applied to the icon in the dark circle
                   (use "white" for white logos, or a hex like "#0A66C2")
       showHover → true = subtle lift on hover, false = no hover at all
       visible   → set false to hide an icon without deleting it        */
    socialIcons: [
      {
        key:        "linkedin",
        url:        "https://www.linkedin.com/in/jelilat/",
        imgUrl:     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrF3zyv6McczN653khKPc5QfLUTBPKkVs46Bq8xjwV7OJa4BieTsS38yDs&s=10",
        label:      "LinkedIn",
        iconColor:  "white",
        showHover:  false,
        visible:    true
      },
      {
        key:        "github",
        url:        "https://github.com/Jelilat25",
        imgUrl:     "https://p7.hiclipart.com/preview/31/119/666/github-logo-repository-computer-icons-github.jpg",
        label:      "GitHub",
        iconColor:  "white",
        showHover:  false,
        visible:    true
      },
      {
        key:        "UpWork",
        url:        "https://www.upwork.com/freelancers/~0150108b364b40a38f",
        imgUrl:     "https://www.citypng.com/public/uploads/preview/upwork-round-black-logo-icon-735811696609922hnwnyggn9o.png",            /* ← add your own image URL here */
        label:      "UpWork",
        customText: "UP",         /* shown when imgUrl is empty */
        iconColor:  "white",
        showHover:  false,
        visible:    true
      },
      {
        key:        "contra",
        url:        "https://contra.com/JelilatDataInsights",
        imgUrl:     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3YlNgnSUF93eigQ9XknDkU0NOPOJAWTTBn29Lm_8sx2PpaiIU-wWnYTc&s=10",
        label:      "Contra",
        customText: "CO",
        iconColor:  "white",
        showHover:  false,
        visible:    true
      },
      {
        key:        "email",
        url:        "mailto:jelilatoluwatosinabdullateef@gmail.com",
        imgUrl:     "https://png.pngtree.com/element_our/png/20181213/inbox-vector-icon-png_267453.jpg",
        label:      "Email",
        /* inline SVG envelope — change to imgUrl if you prefer */
        svgPath:    "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z",
        iconColor:  "white",
        showHover:  false,
        visible:    true
      },
      {
        key:        "whatsapp",
        url:        "https://wa.me/2349075860492",
        imgUrl:     "https://img.icons8.com/p1em/1200/whatsapp.jpg",
        label:      "WhatsApp",
        iconColor:  "white",
        showHover:  false,
        visible:    true
      }
    ]
  },

  /* ─── ABOUT ─────────────────────────────────────────────── */
  about: {
    bio:  ` I'm a business and technology generalist who bridges the gap between data, products, and people. With over five years of experience across data analytics, product management, QA, sales, and lead generation, I don't just identify problems, I help solve them from start to finish.`,
    bio2: `I enjoy working across different areas of a business, from data and products to sales and client management. My goal is simple: help teams work more efficiently, make better decisions, and create meaningful results. I've worked with organizations across retail, real estate, architecture, technology, and talent markets`,

    stats: [
      { value: 5,  suffix: "+", label: "Years Experience"   },
      { value: 14, suffix: "+", label: "Projects Delivered" },
      { value: 9,  suffix: "+", label: "Roles Mastered"     },
      { value: 6,  suffix: "+", label: "Industries Served"  }
    ]
  },

  /* ─── PROJECTS ──────────────────────────────────────────── */
  projects: [
    {
      id:          1,
      title:       "Power BI Cash Management Dashboard",
      description: "Built an interactive Power BI dashboard for Kugler Services LLC to track financial operations, forecast cash balances, and monitor major cash inflows and outflows in real time.",
      image:       "assets/images/projects/cash-management.jpg",
      placeholder: "https://placehold.co/600x380/8B5CF6/FFFFFF?text=Cash+Management",
      tags:        ["Power BI", "DAX", "Financial Analytics"],
      category:    "data",
      impact:      "30% time savings · Errors reduced by 15%",
      links: {
        live: "https://app.powerbi.com/view?r=eyJrIjoiNGQxN2IyOTYtNmEwMi00MGZkLWE1MTUtNTQ2MWRlNWEzNmUxIiwidCI6ImRmODY3OWNkLWE4MGUtNDVkOC05OWFjLWM4M2VkN2ZmOTVhMCJ9",
        code: ""
      }
    },
     {
      id:          2,
      title:       "AI Customer Support & Loan Qualification System",
      description: "Designed and implemented an AI-powered customer support workflow for a commercial lending platform. Integrated CRM lead capture, AI knowledge retrieval, intelligent conversation flows, and automated customer routing to improve support efficiency and lead qualificatioon.",
      placeholder: "https://placehold.co/600x380/A78BFA/FFFFFF?text=SalesIQ",
      image:       "assets/images/projects/salesiq.jpg",
      tags:        ["Zoho SalesIQ", "Zoho CRM", "AI", "Knowledge Base"],
      category:    "Sales",
      impact:      "Improved customer self-service · Automated CRM lead capture · Integrated AI Knowledge Base",
      links: {
          live: "https://0d965a53-b68f-4d04-87d7-f1842e32c1c3.filesusr.com/RoadAccidentProject.pdf",
          code: ""
      }
    },
    {
      id:          3,
      title:       "Pizza Sales Report Dashboard",
      description: "Analyzed pizza company sales data to uncover trends, best-selling categories, revenue patterns, and profit margins. Built end-to-end with Excel, SQL, and Power BI.",
      image:       "assets/images/projects/pizza-sales.jpg",
      placeholder: "https://placehold.co/600x380/A78BFA/FFFFFF?text=Pizza+Sales",
      tags:        ["Power BI", "SQL", "Excel", "Business Intelligence"],
      category:    "data",
      impact:      "Identified top SKUs · Refined pricing strategy",
      links: {
        live: "https://app.powerbi.com/view?r=eyJrIjoiZDRjMDA0ZDAtMTIxZi00OTcyLWI2ZjAtNGM3YTk3ZjU2YzIwIiwidCI6ImRmODY3OWNkLWE4MGUtNDVkOC05OWFjLWM4M2VkN2ZmOTVhMCJ9",
        code: "https://github.com/Jelilat25/Pizza_Sales_Report"
      }
    },
    {
      id:          4,
      title:       "Employee Wellness & Retention Analysis",
      description: "Explored how wellness program usage relates to performance ratings and retention. Applied correlation analysis, regression, and survival analysis across 42 columns of HR data.",
      image:       "assets/images/projects/employee-wellness.jpg",
      placeholder: "https://placehold.co/600x380/7C3AED/FFFFFF?text=Employee+Wellness",
      tags:        ["Python", "Pandas", "Seaborn", "Statsmodels"],
      category:    "data",
      impact:      "Identified gender-specific gaps · Shaped HR retention strategy",
      links: {
        live: "",
        code: "https://github.com/Jelilat25/Employee-Wellness-Performance-and-Retention-Analysis"
      }
    },
    {
      id:          5,
      title:       "Global Terrorism Analysis (1979–2017)",
      description: "Cleaned, processed, and visualized global terrorism data spanning four decades. Built an interactive Power BI dashboard highlighting key patterns across regions and incident types.",
      image:       "assets/images/projects/terrorism.jpg",
      placeholder: "https://placehold.co/600x380/6D28D9/FFFFFF?text=Global+Terrorism",
      tags:        ["Power BI", "Data Cleaning", "Data Visualization"],
      category:    "data",
      impact:      "Comprehensive decade-spanning trend insights",
      links: {
        live: "https://app.powerbi.com/view?r=eyJrIjoiNGIzYmZlZmMtZmM5YS00ZDEwLWE0MjgtNjY1ZWZjYzgwODM4IiwidCI6ImRmODY3OWNkLWE4MGUtNDVkOC05OWFjLWM4M2VkN2ZmOTVhMCJ9",
        code: "https://github.com/Jelilat25/TASK-INTERN-CAREER"
      }
    },
    {
      id:          6,
      title:       "Online Retail Performance Dashboard",
      description: "Multi-year (2019–2023) KPI dashboard tracking sales, profit, customer satisfaction, and category performance. Enabled seasonality analysis and quick year-over-year comparison.",
      image:       "assets/images/projects/online-retail.jpg",
      placeholder: "https://placehold.co/600x380/8B5CF6/F5F5F5?text=Online+Retail",
      tags:        ["Power BI", "DAX", "Excel", "Business Intelligence"],
      category:    "business",
      impact:      "Optimized inventory planning · Revealed seasonal patterns",
      links: {
        live: "https://app.powerbi.com/view?r=eyJrIjoiYjQzZWQ4NzUtN2EzNC00ODJhLThhYzItNjAwNDRiNWFmMmE1IiwidCI6ImRmODY3OWNkLWE4MGUtNDVkOC05OWFjLWM4M2VkN2ZmOTVhMCJ9",
        code: ""
      }
    },
    {
      id:          7,
      title:       "HR Employee Attrition Dashboard",
      description: "Power BI dashboard surfacing workforce trends, attrition factors, business travel impact, performance ratings, and employee well-being indicators for HR teams.",
      image:       "assets/images/projects/hr-attrition.jpg",
      placeholder: "https://placehold.co/600x380/A78BFA/1A0A2E?text=HR+Attrition",
      tags:        ["Power BI", "SQL", "Excel", "HR Analytics"],
      category:    "data",
      impact:      "Enabled data-driven HR intervention strategies",
      links: {
        live: "https://app.powerbi.com/view?r=eyJrIjoiNjFiNjcxOWYtYzQxMi00YWJmLWE2Y2UtYWJhNDQyNDYyMGJhIiwidCI6ImRmODY3OWNkLWE4MGUtNDVkOC05OWFjLWM4M2VkN2ZmOTVhMCJ9",
        code: "https://github.com/Jelilat25/HR-EMPLOYEE-ATTRITION"
      }
    },
    {
      id:          8,
      title:       "Road Accident Analytics (2021–2022)",
      description: "Analyzed 417,883 road casualties to surface patterns in timing, road types, vehicle categories, and urban vs rural distribution. Findings inform road safety policy.",
      image:       "assets/images/projects/road-accidents.jpg",
      placeholder: "https://placehold.co/600x380/5B21B6/FFFFFF?text=Road+Accident",
      tags:        ["Power BI", "Data Analysis", "Public Safety"],
      category:    "data",
      impact:      "Uncovered peak risk hours · Road type vulnerability mapped",
      links: {
        live: "https://0d965a53-b68f-4d04-87d7-f1842e32c1c3.filesusr.com/RoadAccidentProject.pdf",
        code: ""
      }
    },
    {
      id:          9,
      title:       "Bike Sales Analysis",
      description: "Comprehensive study of bicycle sales trends, customer behavior, and regional preferences using Excel, SQL Server, and Power BI. Delivered detailed reports and interactive dashboards.",
      image:       "assets/images/projects/bike-sales.jpg",
      placeholder: "https://placehold.co/600x380/7C3AED/F0EAFF?text=Bike+Sales",
      tags:        ["Power BI", "SQL", "Excel", "Sales Analytics"],
      category:    "data",
      impact:      "Regional preference mapping · Inventory recommendations",
      links: {
        live: "https://app.powerbi.com/view?r=eyJrIjoiZDY3YWI0Y2ItZjBkZS00NGQ4LTg0M2MtMzE3OTI2MzY5N2I1IiwidCI6ImRmODY3OWNkLWE4MGUtNDVkOC05OWFjLWM4M2VkN2ZmOTVhMCJ9",
        code: "https://github.com/Jelilat25/Bike_Sales_Report_Analysis"
      }
    },
    {
      id:          10,
      title:       "Diabetes Prediction Analysis",
      description: "Analyzed National Institute of Diabetes medical data to predict diabetes in Pima Indian females. Applied classification models and predictive analytics using Python.",
      image:       "assets/images/projects/diabetes.jpg",
      placeholder: "https://placehold.co/600x380/8B5CF6/FFFFFF?text=Diabetes+Prediction",
      tags:        ["Python", "Machine Learning", "Healthcare Analytics"],
      category:    "data",
      impact:      "Pattern identification supporting early diabetes detection",
      links: {
        live: "",
        code: "https://github.com/Jelilat25/Diabetes-Prediction-Analysis.git"
      }
    },
    {
      id:          11,
      title:       "Sales Report Dashboard",
      description: "Power BI project delivering detailed analysis of sales metrics including product seating, quantities, revenue, product margins, total orders, and best sellers.",
      image:       "assets/images/projects/sales-report.jpg",
      placeholder: "https://placehold.co/600x380/A78BFA/1A0A2E?text=Sales+Report",
      tags:        ["Power BI", "DAX", "Sales Analytics"],
      category:    "Sales",
      impact:      "Clear visibility for stakeholder decision-making",
      links: {
        live: "https://app.powerbi.com/view?r=eyJrIjoiMWM3Y2UzZDktNTZiNC00N2I0LWE2ZWQtMzIwYjVmYjg3NzI1IiwidCI6ImRmODY3OWNkLWE4MGUtNDVkOC05OWFjLWM4M2VkN2ZmOTVhMCJ9",
        code: "https://github.com/Jelilat25/SALES-DATA-ANALYSIS"
      }
    },
    {
      id:          12,
      title:       "Tata Group Online Retail Analysis",
      description: "Forage job simulation for Tata Group: cleaned retail data, visualized revenue trends and customer demographics in Power BI, and delivered C-suite ready presentations.",
      image:       "assets/images/projects/tata-group.jpg",
      placeholder: "https://placehold.co/600x380/6D28D9/FFFFFF?text=Tata+Group",
      tags:        ["Power BI", "Business Analysis", "Data Storytelling"],
      category:    "business",
      impact:      "Executive-ready insights with strategic recommendations",
      links: {
        live: "https://app.powerbi.com/view?r=eyJrIjoiMWM3Y2UzZDktNTZiNC00N2I0LWE2ZWQtMzIwYjVmYjg3NzI1IiwidCI6ImRmODY3OWNkLWE4MGUtNDVkOC05OWFjLWM4M2VkN2ZmOTVhMCJ9",
        code: ""
      }
    },
    {
      id:          13,
      title:       "YouTube Streamers Analysis",
      description: "Analyzed the top 1,000 YouTube streamers to uncover audience trends, performance metrics, content categories, and brand collaboration patterns using Python.",
      image:       "assets/images/projects/youtube.jpg",
      placeholder: "https://placehold.co/600x380/7C3AED/FFFFFF?text=YouTube+Streamers",
      tags:        ["Python", "Pandas", "Seaborn", "Matplotlib"],
      category:    "data",
      impact:      "15% improvement in audience engagement recommendations",
      links: {
        live: "",
        code: "https://github.com/Jelilat25/TASK-INTERN-CAREER"
      }
    },
    {
      id:          14,
      title:       "This Portfolio Website",
      description: "A premium, fully animated personal portfolio built from scratch with pure HTML, CSS, and JavaScript. Features aurora canvas background, click orbs, voice bot, dark/light theme, and editable data files.",
      image:       "assets/images/projects/portfolio.jpg",
      placeholder: "https://placehold.co/600x380/8B5CF6/FFFFFF?text=Portfolio+Site",
      tags:        ["HTML", "CSS", "JavaScript", "GitHub Pages"],
      category:    "product",
      impact:      "Full professional portfolio · Live on GitHub Pages",
      links: {
        live: "https://jelilat25.github.io",
        code: "https://github.com/Jelilat25/jelilat25.github.io"
      }
    }
  ],

  /* ─── EXPERIENCE ────────────────────────────────────────── */
  experience: [
      {
      id:        1,
      company:   "UpWork",
      role:      "Freelance",
      duration:  "2024 – Present",
      type:      "Full-time",
      icon:      "🏢",
      highlights: [
        "Delivered data analytics and business intelligence solutions for clients across multiple industries.",
        "Built interactive dashboards and reports using Power BI, SQL, Excel, Python, and Tableau.",
        "Cleaned, analyzed, and visualized data to uncover actionable business insights.",
        "Collaborated directly with clients to deliver high-quality solutions within agreed timelines."
      ]
    },
    {
      id:        2,
      company:   "CR Equity AI",
      role:      "Product Analyst",
      duration:  "July 2025 – July 2026",
      type:      "Part-time",
      icon:      "🏢",
      highlights: [
        "Updated and organized Jira tickets, using structured documentation to keep product tasks clear and easy to follow.",
        "Tested platform features and reported issues, applying analytical skills to improve user experience.",
        "Trained new workers and platform users, using simple explanations to support smooth onboarding."
      ]
    },
    {
      id:        3,
      company:   "Perpetuum Designs",
      role:      "Account Manager",
      duration:  "June 2025 – Sep 2025",
      type:      "Part-time",
      icon:      "🏢",
      highlights: [
        "Engaged prospective clients through cold calling and personalized emails, booking discovery calls and driving new business.",
        "Managed client follow-ups and service updates using CRM tools, ensuring smooth project delivery and long-term satisfaction.",
        "Coordinated between sales, design, and execution teams to track project milestones and address client needs promptly.",
        "Monitored project feedback and client experience to improve service quality and strengthen client retention rates."
      ]
    },
    {
      id:        4,
      company:   "Venture for Africa",
      role:      "Business Analyst",
      duration:  "Feb 2025 – May 2025",
      type:      "Contract",
      icon:      "🌍",
      highlights: [
        "Researched and analyzed 150+ companies via LinkedIn, reports, and industry data — shortlisted 30 high-potential partners.",
        "Improved partnership targeting by 17% through structured research and data-backed recommendations.",
        "Developed a structured sponsorship tracker in Google Sheets, streamlining data collection and team-wide visibility.",
        "Presented research findings and sponsorship recommendations in structured reports and stakeholder meetings."
      ]
    },
    {
      id:        5,
      company:   "Excelerate",
      role:      "Data Visualization Analyst",
      duration:  "Dec 2025 - Apr 2025",
      type:      "Internship",
      icon:      "📈",
      highlights: [
        "Designed and delivered interactive data visualizations to help teams make faster, more informed decisions.",
        "Built dashboards and visual reports aligned with specific stakeholder objectives and KPIs.",
        "Translated complex datasets into clear, compelling visual narratives for business audiences."
      ]
    },
    {
      id:        6,
      company:   "Kugler Services LLC",
      role:      "Freelance Data Analyst",
      duration:  "Feb 2024 - Sep 2024",
      type:      "Freelance",
      icon:      "📈",
      highlights: [
        "Engineered a dynamic Power BI cash management dashboard, achieving 30% time savings in financial tracking.",
        "Automated cash forecasting processes, uncovering expenditure trends that enhanced budget allocation accuracy.",
        "Reduced financial tracking errors by 15% through automated dashboard refresh and rigorous data validation.",
        "Delivered actionable insights through deep analysis of expenditure trends and transaction data patterns."
      ]
    },
 {
      id:        7,
      company:   "MeriSKILL",
      role:      "Data Analyst Intern",
      duration:  "Jan 2024 – Aug 2024",
      type:      "Internship",
      icon:      "🎓",
      highlights: [
        "Predicted diabetes likelihood among Pima Indian females using Python predictive analytics and classification models.",
        "Conducted sales data analysis with Power BI and Excel — identified trends, improved forecasting, and generated insights.",
        "Explored employee turnover via the HR Attrition Project using SQL, Excel, and Power BI for retention analysis."
      ]
    },
    {
      id:        8,
      company:   "Intern Career",
      role:      "Data Analyst Intern",
      duration:  "Dec 2023 - Apr 2024",
      type:      "Internship",
      icon:      "🎓",
      highlights: [
        "Conducted global terrorism analysis (1979–2017) using Excel and Power BI, creating an interactive insight dashboard.",
        "Analyzed top 1,000 YouTube streamers using Python (Pandas, Seaborn, Matplotlib), optimizing engagement strategies by 15%.",
        "Delivered comprehensive reports on both projects, enhancing data interpretation and enabling strategic planning."
      ]
    },
    {
      id:        9,
      company:   "Crownford Model School",
      role:      "Mathematics Teacher",
      duration:  "Feb 2020 – Nov 2022",
      type:      "Full-time",
      icon:      "📚",
      highlights: [
        "Boosted student math proficiency by 20% through innovative teaching strategies and individualized lesson plans.",
        "Mentored students for national mathematics competitions, achieving outstanding performance results.",
        "Developed curriculum materials that improved classroom engagement and measurable academic outcomes."
      ]
    }
  ],

  /* ─── SKILLS ────────────────────────────────────────────── */
  skills: [
    {
      group: "Data & Analytics",
      icon:  "📊",
      color: "#8B5CF6",
      items: [
        { name: "Power BI",      level: 90 },
        { name: "Python",        level: 85 },
        { name: "SQL",           level: 88 },
        { name: "Excel",         level: 92 },
        { name: "Tableau",       level: 80 },
        { name: "Google Sheets", level: 88 }
      ]
    },
    {
      group: "Sales & CRM",
      icon:  "🎯",
      color: "#A78BFA",
      items: [
        { name: "Apollo.io",          level: 85 },
        { name: "HubSpot",            level: 80 },
        { name: "Lead Generation",    level: 88 },
        { name: "Cold Calling",       level: 85 },
        { name: "Account Management", level: 90 },
        { name: "Client Acquisition", level: 85 }
      ]
    },
    {
      group: "Product & QA",
      icon:  "🔬",
      color: "#7C3AED",
      items: [
        { name: "Product Management",   level: 78 },
        { name: "Product Analytics",    level: 82 },
        { name: "QA Testing",           level: 80 },
        { name: "User Research",         level: 75 },
        { name: "Requirements Analysis", level: 82 },
        { name: "Roadmap Planning",     level: 75 }
      ]
    },
    {
      group: "Business & Strategy",
      icon:  "💼",
      color: "#6D28D9",
      items: [
        { name: "Business Analysis",    level: 88 },
        { name: "Data Storytelling",    level: 90 },
        { name: "Stakeholder Mgmt",     level: 85 },
        { name: "Report Writing",       level: 88 },
        { name: "Project Coordination", level: 82 },
        { name: "Strategic Planning",   level: 78 }
      ]
    }
  ],

  /* ─── SERVICES ──────────────────────────────────────────── */
  services: [
    {
      title:       "Data Analytics & Dashboards",
      description: "Transform raw data into clear, interactive dashboards using Power BI, Tableau, and Excel. From financial tracking to sales performance — I build visuals that drive real decisions.",
      tags:        ["Power BI", "Tableau", "Excel", "SQL"],
      image:       "assets/images/services/pizza-sales.jpg",
      placeholder: "https://placehold.co/600x338/0F172A/6D28D9?text=Data+Analytics"
    },
    {
      title:       "Product Analytics",
      description: "Analyze user behavior, funnel drop-offs, and product KPIs to help teams build better products. I turn product data into prioritized, actionable next steps.",
      tags:        ["Funnel Analysis", "KPI Dashboards", "User Metrics"],
      image:       "assets/images/services/product-analytics.jpg",
      placeholder: "https://placehold.co/600x338/0F172A/6D28D9?text=Product+Analytics"
    },
    {
      title:       "Lead Generation & Outreach",
      description: "Build targeted prospect lists, write cold outreach sequences, and set up automated pipelines using Apollo and HubSpot. Fill your pipeline with quality, qualified leads.",
      tags:        ["Apollo.io", "HubSpot", "Email Sequences"],
      image:       "assets/images/services/lead-gen.jpg",
      placeholder: "https://placehold.co/600x338/0F172A/6D28D9?text=Lead+Generation"
    },
    {
      title:       "Sales & Account Management",
      description: "From first contact to long-term retention — I manage client relationships, handle cold calling, and coordinate between teams to deliver consistent, reliable results.",
      tags:        ["Cold Calling", "CRM Management", "Client Retention"],
      image:       "assets/images/services/sales.jpg",
      placeholder: "https://placehold.co/600x338/0F172A/6D28D9?text=Sales+%26+Account+Mgmt"
    },
    {
      title:       "QA Testing",
      description: "Manual QA with structured test cases, bug tracking, and usability review. I help ensure your product works exactly as intended before it reaches your users.",
      tags:        ["Test Cases", "Bug Tracking", "UAT"],
      image:       "assets/images/services/qa-testing.jpg",
      placeholder: "https://placehold.co/600x338/0F172A/6D28D9?text=QA+Testing"
    },
    {
      title:       "Business Analysis & Reporting",
      description: "Research, analyze, and present insights that help businesses make smarter decisions. From sponsorship trackers to C-suite reports — I translate complexity into clarity.",
      tags:        ["Research", "Stakeholder Reports", "Strategy"],
      image:       "assets/images/services/business-analysis.jpg",
      placeholder: "https://placehold.co/600x338/0F172A/6D28D9?text=Business+Analysis"
    }
  ],

  /* ─── TOOLS & TECHNOLOGIES ──────────────────────────────── */
  tools: [
    {
      name:   "Power BI",
      imgUrl: "https://toppng.com/uploads/preview/ower-icon-png-power-bi-logo-11563587695xbemzdsvxd.png",
      color:  "#F2C811"
    },
    {
      name:   "Python",
      imgUrl: "https://cdn.simpleicons.org/python/3776AB",
      color:  "#3776AB"
    },
    {
      name:   "SQL",
      imgUrl: "https://cdn.simpleicons.org/postgresql/4169E1",
      color:  "#4169E1"
    },
    {
      name:   "Excel",
      imgUrl: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/microsoft-excel-icon.png",
      color:  "#217346"
    },
    {
      name:   "Tableau",
      imgUrl: "https://banner2.cleanpng.com/20180629/ktb/aayqpeivj.webp",
      color:  "#E97627"
    },
    {
      name:   "Google Sheets",
      imgUrl: "https://cdn.simpleicons.org/googlesheets/34A853",
      color:  "#34A853"
    },
    {
      name:   "HubSpot",
      imgUrl: "https://cdn.simpleicons.org/hubspot/FF7A59",
      color:  "#FF7A59"
    },
    {
      name:       "Apollo.io",
      imgUrl:     "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/apollo-icon.png",
      color:      "#6D28D9"
    },
    {
      name:   "LinkedIn Sales",
      imgUrl: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/linkedin-app-icon.png",
      color:  "#0A66C2"
    },
    {
      name:   "Jira",
      imgUrl: "https://cdn.simpleicons.org/jira/0052CC",
      color:  "#0052CC"
    },
    {
      name:   "Jupyter",
      imgUrl: "https://cdn.simpleicons.org/jupyter/F37626",
      color:  "#F37626"
    },
    {
      name:   "GitHub",
      imgUrl: "https://cdn.simpleicons.org/github/181717",
      color:  "#181717"
    }
  ],

  /* ─── TESTIMONIALS ──────────────────────────────────────── */
  testimonials: [
    {
      id:          1,
      name:        "Tobi Lafinhan",                           // ← Replace
      role:        "Co-Founder, Venture for Africa",                     // ← Replace
      photo:       "assets/images/testimonials/t1.jpg",    // ← Replace with your screenshot
      placeholder: "https://placehold.co/520x320/1A0A2E/8B5CF6?text=Testimonial+Screenshot",
      rating:      5,
      viewLink:    "https://www.linkedin.com/in/jelilat/",   // ← Replace with real link or PDF URL
      type:        "link" // "link" or "pdf"
    },
    {
      id:          2,
      name:        "Joshua Kugler",
      role:        "CEO, Kugler Services LLC",
      photo:       "assets/images/testimonials/t2.jpg",
      placeholder: "https://placehold.co/520x320/1A0A2E/A78BFA?text=Testimonial+Screenshot",
      rating:      5,
      viewLink:    "https://www.upwork.com/ab/g/pub/wom/prx/eyJwZXJzb25VaWQiOiIxNzY3OTg5MzY5MjE2ODU2MDY0IiwiY29udHJhY3RSaWQiOiIzNjg4OTY4MCIsImJhbm5lclR5cGUiOiJjb250cmFjdCIsImJhbm5lclZhcmlhbnQiOiJkZWZhdWx0Iiwid29tIjoiZmx2MiIsInJlZGlyZWN0IjoiZmxfcHJvZmlsZV9wcm9tbyJ9",
      type:        "link"
    },
    {
      id:          3,
      name:        "Ameer Hamza",
      role:        "Virtual Assistant, Talenthunters",
      photo:       "assets/images/testimonials/t3.jpg",
      placeholder: "https://placehold.co/520x320/1A0A2E/7C3AED?text=Testimonial+Screenshot",
      rating:      5,
      viewLink:    "https://www.upwork.com/ab/g/pub/wom/prx/eyJwZXJzb25VaWQiOiIxNzY3OTg5MzY5MjE2ODU2MDY0IiwiY29udHJhY3RSaWQiOiIzOTg5MjY5MiIsImJhbm5lclR5cGUiOiJjb250cmFjdCIsImJhbm5lclZhcmlhbnQiOiJkZWZhdWx0Iiwid29tIjoiZmx2MiIsInJlZGlyZWN0IjoiZmxfcHJvZmlsZV9wcm9tbyJ9",
      type:        "link"
    },
    {
      id:          4,
      name:        "Excelerate Team",
      role:        "Excelerate",
      photo:       "assets/images/testimonials/t4.jpg",
      placeholder: "https://placehold.co/520x320/1A0A2E/6D28D9?text=Testimonial+Screenshot",
      rating:      5,
      viewLink:    "https://drive.google.com/file/d/1vyWiyoPIcnh2vBWhCk0odAD6GrKHz53m/view",
      type:        "pdf"
    }
  ],

  /* ─── VOICE BOT ─────────────────────────────────────────── */
  voicebot: {
    name:     "Tosin",
    greeting: "Hi there! I'm Tosin, Jelilat's AI assistant. Ask me about her skills, projects, or how to hire her!",
    responses: {
      skills:     "Jelilat is skilled in Power BI, Python, SQL, Excel, and Tableau for data — plus Apollo, HubSpot, and cold calling on the sales side. She also does QA testing and product analytics.",
      python:     "Yes! Jelilat uses Python for data analysis and machine learning. She's worked with Pandas, Seaborn, Matplotlib, SciPy, and statsmodels on real client projects.",
      powerbi:    "Power BI is one of Jelilat's strongest tools. She's built dashboards for financial tracking, HR analytics, sales reporting, and more — all interactive and auto-refreshing.",
      projects:   "Jelilat has delivered 14+ projects including cash management dashboards, HR analytics, road accident analysis, diabetes prediction, and YouTube streamers analysis.",
      experience: "Jelilat has five years of experience across data analytics, product management, QA testing, sales, and lead generation — spanning 9 roles across 5+ industries.",
      hire:       "You can hire Jelilat via the Contact form on this page, send an email to jelilatoluwatosinabdullateef@gmail.com, or schedule a 1-on-1 call at cal.com/en/jelilatdatainsights",
      contact:    "You can reach Jelilat by email at jelilatoluwatosinabdullateef@gmail.com, WhatsApp at +2349075860492, or LinkedIn at linkedin.com/in/jelilat/",
      services:   "Jelilat offers: Data Analytics & Dashboards, Product Analytics, Lead Generation, Sales & Account Management, QA Testing, and Business Analysis & Reporting.",
      location:   "Jelilat is based in Nigeria, and works with clients remotely from anywhere in the world.",
      resume:     "You can download Jelilat's resume using the Resume button in the navigation bar or the footer of this page.",
      default:    "I can answer questions about Jelilat's skills, projects, experience, services, or how to hire her. What would you like to know?"
    }
  },

  /* ─── SECTION COLORS ──────────────────────────────────────
     Control each section's heading, body text, background,
     accent/primary colour, and button colours independently.

     Leave any field as "" to inherit the global theme default.

     Fields per section:
       heading   → h1/h2/h3 colour          (e.g. "#FFFFFF")
       body      → paragraph / body text     (e.g. "#9CA3AF")
       bg        → section background        (e.g. "#0A0712")
       accent    → highlight / primary       (e.g. "#6D28D9")
       btnBg     → button background         (e.g. "#0F172A")
       btnText   → button text colour        (e.g. "#FFFFFF")
       border    → card / divider borders    (e.g. "#1F1A3A")

     DARK theme colours shown below as defaults.
     Edit freely — changes apply on next page load.            */
  sectionColors: {
    home: {
      heading: "",        /* "" = use global --heading variable */
      body:    "",
      bg:      "",        /* transparent — canvas shows through */
      accent:  "",
      btnBg:   "",
      btnText: "",
      border:  ""
    },
    about: {
      heading: "",
      body:    "",
      bg:      "",        /* set to e.g. "#0A0712" to override */
      accent:  "",
      btnBg:   "",
      btnText: "",
      border:  ""
    },
    projects: {
      heading: "",
      body:    "",
      bg:      "",
      accent:  "",
      btnBg:   "",
      btnText: "",
      border:  ""
    },
    experience: {
      heading: "",
      body:    "",
      bg:      "",
      accent:  "",
      btnBg:   "",
      btnText: "",
      border:  ""
    },
    skills: {
      heading: "",
      body:    "",
      bg:      "",
      accent:  "",
      btnBg:   "",
      btnText: "",
      border:  ""
    },
    services: {
      heading: "",
      body:    "",
      bg:      "",
      accent:  "",
      btnBg:   "",
      btnText: "",
      border:  ""
    },
    testimonials: {
      heading: "",
      body:    "",
      bg:      "",
      accent:  "",
      btnBg:   "",
      btnText: "",
      border:  ""
    },
    contact: {
      heading: "",
      body:    "",
      bg:      "",
      accent:  "",
      btnBg:   "",
      btnText: "",
      border:  ""
    }
  }
};