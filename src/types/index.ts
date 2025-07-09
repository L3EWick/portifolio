export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  role: string;
  image: string;
  link?: string;
}

export interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'mobile' | 'database' | 'cloud' | 'tools';
  icon: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  company: string;
  description: string;
}