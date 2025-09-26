export interface PersonalInfo {
  fullName: string;
  title: string;
  profilePhoto: string;
  email: string;
  phone: string;
  location: string;
}

export interface AboutInfo {
  summary: string;
  skills: string[];
  languages: { name: string; level: number }[];
  workStyle: string;
  hobbies: string[];
  goals: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
  current: boolean;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  year: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  images: string[];
  techStack: string[];
  liveLink: string;
  githubLink: string;
  category: string;
}

export interface SocialLinks {
  linkedin: string;
  github: string;
  twitter: string;
  instagram: string;
  website: string;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  about: AboutInfo;
  experience: Experience[];
  education: Education[];
  projects: Project[];
  socialLinks: SocialLinks;
  resumeFile: string;
  selectedTheme: string;
}

export interface Theme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    card: string;
    text: string;
  };
  layout: 'modern' | 'classic' | 'minimal' | 'creative';
  preview: string;
}