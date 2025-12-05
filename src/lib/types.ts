
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
  layout: {
    sidebar: boolean;
    twoColumn: boolean;
  };
  highlightSections: boolean;
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
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '(123) 456-7890',
    linkedin: 'linkedin.com/in/janedoe',
    website: 'janedoe.dev',
    summary: 'Seasoned software engineer with over 8 years of experience in building and scaling web applications. Proficient in React, Node.js, and cloud-native technologies. Passionate about creating elegant and user-friendly solutions.',
  },
  experience: [
    {
      id: 'exp1',
      jobTitle: 'Senior Software Engineer',
      company: 'Tech Solutions Inc.',
      location: 'San Francisco, CA',
      startDate: 'Jan 2020',
      endDate: 'Present',
      responsibilities: [
        'Led the development of a new microservices-based architecture, improving system scalability by 50%.',
        'Mentored junior engineers, fostering a culture of growth and knowledge sharing.',
        'Collaborated with product managers to define and implement new features.',
      ],
    },
     {
      id: 'exp2',
      jobTitle: 'Software Engineer',
      company: 'Innovate LLC',
      location: 'Austin, TX',
      startDate: 'Jun 2017',
      endDate: 'Dec 2019',
      responsibilities: [
        'Developed and maintained the company\'s flagship React-based web application.',
        'Wrote unit and integration tests, increasing code coverage from 60% to 90%.',
        'Participated in agile ceremonies and contributed to sprint planning.',
      ],
    },
  ],
  education: [
    {
      id: 'edu1',
      degree: 'B.S. in Computer Science',
      institution: 'University of Technology',
      location: 'Techville, USA',
      graduationDate: 'May 2017',
    },
  ],
  skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker', 'Kubernetes', 'Project Management'],
  customization: {
    nameFontFamily: "'Space Grotesk', sans-serif",
    nameFontSize: "3rem", // 48px
    layout: {
        sidebar: false,
        twoColumn: false,
    },
    highlightSections: false,
  }
};
