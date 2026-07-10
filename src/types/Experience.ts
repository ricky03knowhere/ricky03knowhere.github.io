export interface Experience {
  id: string;
  company: string;
  logo: string;
  position: string;
  employmentType: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string | string[];
  stack: string[];
}
