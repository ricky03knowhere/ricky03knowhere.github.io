export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  gallery: string[];
  demoUrl: string;
  githubUrl: string;
  year: number;
  status: string;
  category: string;
  stack: string[];
  featured: boolean;
  client?: string;
  duration?: string;
  role?: string;
}
