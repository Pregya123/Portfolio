
import { Project, Experience, Education, Certification, SkillGroup } from './types';

export const PERSONAL_INFO = {
  name: "Pregya Ganjoo",
  title: "Data Analyst | Business Intelligence Specialist",
  email: "ganjoo.pregya@gmail.com",
  phone: "+91 9906980654",
  linkedin: "linkedin.com/in/pregya-ganjoo-864ba22ab",
  github: "github.com/Pregya123",
  summary: "A meticulous Computer Engineering student specializing in Data Analytics and Business Intelligence. Experienced in Tableau dashboarding and Python-driven data exploration. I transform complex datasets into actionable narratives through SQL, Power BI, and advanced statistical modeling."
};

export const PROJECTS: Project[] = [
  {
    title: "Mental Health Sentiment Study",
    tags: ["Python", "EDA", "Seaborn"],
    description: [
      "Analyzed psychological health patterns in the technology sector using complex multivariate EDA.",
      "Engineered automated cleaning pipelines for inconsistent survey data entries.",
      "Synthesized visual reports to identify critical workplace attitude shifts regarding mental health."
    ]
  },
  {
    title: "AI-Driven IoT Honeypot",
    tags: ["Machine Learning", "Cybersecurity", "Python"],
    description: [
      "Engineered a simulation environment to capture and classify IoT-specific attack vectors.",
      "Utilized Isolation Forest algorithms for high-precision anomaly detection.",
      "Mapped real-time telemetry to the MITRE ATT&CK framework for threat intelligence."
    ]
  },
  {
    title: "Secure Access Logic System",
    tags: ["Logic Systems", "Python", "Authentication"],
    description: [
      "Designed a robust multi-factor simulation for secure physical entry points.",
      "Implemented advanced input validation and error handling logic for credential verification.",
      "Developed a clean, CLI-based administrative interface for access management."
    ]
  }
];

export const EXPERIENCES: Experience[] = [
  {
    role: "Data Analyst Intern",
    company: "CSRBOX (IBM SkillsBuild)",
    period: "July 2025 – August 2025",
    location: "Remote",
    details: [
      "Orchestrated interactive Tableau dashboards for social impact assessment, reaching cross-functional stakeholders.",
      "Refined large-scale datasets using Microsoft Excel and Power Query for high-fidelity reporting.",
      "Applied statistical Python libraries to optimize data preprocessing workflows for project deliverables.",
      "Collaborated on end-to-end BI lifecycles, from stakeholder requirements to final insights."
    ]
  }
];

export const EDUCATIONS: Education[] = [
  {
    institution: "Vishwakarma Government Engineering College",
    location: "Ahmedabad, Gujarat",
    degree: "B.E. in Computer Engineering",
    period: "2022 – 2026",
    grade: "6.89 CGPA (Current)"
  },
  {
    institution: "Govt. Model Higher Secondary School",
    location: "Nagrota, Jammu (J&K)",
    degree: "Higher Secondary Education (12th Grade)",
    period: "2021 – 2022",
    grade: "91.2%"
  },
  {
    institution: "Govt. Model Higher Secondary School",
    location: "Nagrota, Jammu (J&K)",
    degree: "Secondary Education (10th Grade)",
    period: "2019 – 2020",
    grade: "87.6%"
  }
];

export const CERTIFICATIONS: Certification[] = [
  { name: "Generative AI Fundamentals", issuer: "Databricks" },
  { name: "Young Professional Career Edge", issuer: "TCS iON" },
  { name: "Introduction to Cybersecurity", issuer: "Cisco" },
  { name: "RDS for MySQL Troubleshooting", issuer: "Amazon AWS" },
  { name: "Mastering Power BI", issuer: "Mind Luster" },
  { name: "SQL Basic Proficiency", issuer: "HackerRank" }
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Languages & Core",
    items: ["Python", "SQL", "HTML5", "C++"]
  },
  {
    category: "Analytics & BI",
    items: ["Power BI", "Tableau", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Excel (VBA/Macros)"]
  },
  {
    category: "Systems & DevOps",
    items: ["Git/GitHub", "MySQL", "VS Code", "Windows/Linux Administration"]
  },
  {
    category: "CS Fundamentals",
    items: ["Data Structures", "DBMS", "OS Architecture", "Computer Networks", "SDLC"]
  }
];
