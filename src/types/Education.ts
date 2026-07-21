export interface Education {
  id: string | number;
  school: string;
  major: string;
  degree: string;
  startYear: number;
  endYear: number;
  gpa?: string | number | null;
  logo?: string;
  location?: string;
  address?: string;
}
