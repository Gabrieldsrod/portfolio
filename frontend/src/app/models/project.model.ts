export interface ProjectTitle {
  pt: string;
  en: string;
}

export interface ProjectDescription {
  pt: string;
  en: string;
}

export interface Project {
  id: number;
  title: ProjectTitle;
  description: ProjectDescription;
  technologies: string[];
  imageUrl: string;
  githubUrl?: string;
  deployUrl?: string;
  featured: boolean;
}
