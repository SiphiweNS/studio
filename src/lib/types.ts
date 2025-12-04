
export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  website: string;
  summary: string;
}

export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  graduationDate: string;
}

export interface Customization {
  nameFontFamily: string;
  nameFontSize: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: string[];
  customization: Customization;
}

export const initialResumeData: ResumeData = {
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    website: '',
    summary: '',
  },
  experience: [
    {
      id: 'exp1',
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      responsibilities: [],
    },
  ],
  education: [
    {
      id: 'edu1',
      degree: '',
      institution: '',
      location: '',
      graduationDate: '',
    },
  ],
  skills: [],
  customization: {
    nameFontFamily: "'Space Grotesk', sans-serif",
    nameFontSize: "3rem", // 48px
  }
};
