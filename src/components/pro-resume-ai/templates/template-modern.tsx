"use client";
import type { ResumeData } from '@/lib/types';
import { Separator } from '@/components/ui/separator';
import { Mail, Phone, Linkedin, Globe, MapPin, Briefcase, GraduationCap, Wrench } from 'lucide-react';

interface TemplateProps {
  resumeData: ResumeData;
}

export default function TemplateModern({ resumeData }: TemplateProps) {
  const { personalInfo, experience, education, skills } = resumeData;

  return (
    <div className="text-black bg-white font-sans p-8">
      {/* Header */}
      <div className="flex flex-col items-center mb-6">
        <h1 className="text-5xl font-extrabold font-headline tracking-tight text-gray-800">{personalInfo.name}</h1>
        <div className="flex justify-center items-center gap-x-4 gap-y-1 text-sm text-gray-500 mt-3 flex-wrap">
          {personalInfo.email && <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1.5 hover:text-primary"><Mail size={14}/> {personalInfo.email}</a>}
          {personalInfo.phone && <span className="flex items-center gap-1.5"><Phone size={14}/> {personalInfo.phone}</span>}
          {personalInfo.linkedin && <a href={`https://${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-primary"><Linkedin size={14}/> {personalInfo.linkedin}</a>}
          {personalInfo.website && <a href={`https://${personalInfo.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-primary"><Globe size={14}/> {personalInfo.website}</a>}
        </div>
      </div>
      
      {/* Summary */}
      <div className="mb-8">
        <p className="text-center text-gray-600">{personalInfo.summary}</p>
      </div>

      <Separator className="my-8" />
      
      {/* Main Content */}
      <div className="space-y-10">
        {/* Experience */}
        <div>
          <h2 className="text-2xl font-bold font-headline mb-4 flex items-center gap-2"><Briefcase size={22} className="text-primary"/> Experience</h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-xl font-semibold text-gray-800">{exp.jobTitle}</h3>
                  <p className="text-sm font-medium text-gray-500">{exp.startDate} - {exp.endDate}</p>
                </div>
                <div className="flex justify-between items-baseline mb-2">
                    <p className="text-md text-primary font-semibold">{exp.company}</p>
                    <p className="text-sm text-gray-500 flex items-center gap-1"><MapPin size={14}/>{exp.location}</p>
                </div>
                <ul className="list-disc list-outside pl-5 space-y-1">
                  {exp.responsibilities.map((resp, i) => (
                    <li key={i} className="text-gray-600">{resp}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        {/* Education */}
        <div>
          <h2 className="text-2xl font-bold font-headline mb-4 flex items-center gap-2"><GraduationCap size={22} className="text-primary"/> Education</h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{edu.degree}</h3>
                    <p className="text-md text-gray-600">{edu.institution}</p>
                  </div>
                  <div className="text-right">
                      <p className="text-sm font-medium text-gray-500">{edu.graduationDate}</p>
                      <p className="text-sm text-gray-500 flex items-center justify-end gap-1"><MapPin size={14}/>{edu.location}</p>
                  </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Skills */}
        <div>
          <h2 className="text-2xl font-bold font-headline mb-4 flex items-center gap-2"><Wrench size={20} className="text-primary"/> Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map(skill => (
                <span key={skill} className="bg-secondary text-secondary-foreground font-medium px-3 py-1 rounded-full text-sm">{skill}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
