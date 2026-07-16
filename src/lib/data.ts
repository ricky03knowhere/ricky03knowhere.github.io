import profileData from '../data/profile.json';
import socialsData from '../data/socials.json';
import projectsData from '../data/projects.json';
import techStackData from '../data/tech-stack.json';
import experienceData from '../data/experience.json';
import educationData from '../data/education.json';
import certificatesData from '../data/certificates.json';
import interestsData from '../data/interests.json';
import settingsData from '../data/settings.json';

import type { Profile } from '../types/Profile';
import type { Social } from '../types/Social';
import type { Project } from '../types/Project';
import type { TechStack } from '../types/TechStack';
import type { Experience } from '../types/Experience';
import type { Education } from '../types/Education';
import type { Certificate } from '../types/Certificate';
import type { Interest } from '../types/Interest';

export function getProfile(): Profile {
  return profileData as Profile;
}

export function getSocials(): Social {
  return socialsData as Social;
}

export function getProjects(): Project[] {
  return projectsData as Project[];
}

export function getTechStacks(): TechStack[] {
  return techStackData as TechStack[];
}

export function getExperience(): Experience[] {
  return experienceData as unknown as Experience[];
}

export function getEducation(): Education[] {
  return educationData as unknown as Education[];
}

export function getCertificates(): Certificate[] {
  return certificatesData as unknown as Certificate[];
}

export function getInterests(): Interest[] {
  return interestsData as unknown as Interest[];
}

export interface Settings {
  siteName: string;
  title: string;
  heroTyping: string[];
  projectPerPage: number;
  portfolioSortDefault: string;
  enableLoader: boolean;
  enableCursorGlow: boolean;
  enableParticles: boolean;
  enableAOS: boolean;
  enableGSAP: boolean;
  theme: {
    primary: string;
    secondary: string;
    cyan: string;
    purple: string;
  };
}

export function getSettings(): Settings {
  return settingsData as Settings;
}
