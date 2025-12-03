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

export interface ResumeData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: string[];
}

export const initialResumeData: ResumeData = {
  personalInfo: {
    name: 'Your Name',
    email: 'your.email@example.com',
    phone: '(123) 456-7890',
    linkedin: 'linkedin.com/in/yourprofile',
    website: 'yourportfolio.com',
    summary: 'A brief professional summary about yourself. Click "Generate with AI" to create one.',
  },
  experience: [
    {
      id: 'exp1',
      jobTitle: 'Software Engineer',
      company: 'Tech Corp',
      location: 'San Francisco, CA',
      startDate: 'Jan 2020',
      endDate: 'Present',
      responsibilities: [
        'Developed and maintained web applications using React and Node.js.',
        'Collaborated with cross-functional teams to define, design, and ship new features.',
        'Improved application performance by 20% through code optimization and refactoring.',
      ],
    },
  ],
  education: [
    {
      id: 'edu1',
      degree: 'B.S. in Computer Science',
      institution: 'University of Technology',
      location: 'Techville, USA',
      graduationDate: 'May 2019',
    },
  ],
  skills: ['JavaScript', 'React', 'Node.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Project Management'],
};
