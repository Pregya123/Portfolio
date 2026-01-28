
export interface Project {
  title: string;
  tags: string[];
  description: string[];
  link?: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  location: string;
  details: string[];
}

export interface Education {
  institution: string;
  location: string;
  degree: string;
  period: string;
  grade: string;
}

export interface Certification {
  name: string;
  issuer: string;
  link?: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}
