
"use client";
import type { ResumeData } from '@/lib/types';
import { Mail, Phone, Linkedin, Globe, MapPin, Briefcase, GraduationCap, Wrench, User } from 'lucide-react';

interface TemplateProps {
  resumeData: ResumeData;
}

export default function TemplateCreative({ resumeData }: TemplateProps) {
  const { personalInfo, experience, education, skills, customization } = resumeData;
  const accentColor = '#9B59B6'; // Violet accent from proposal

  const nameStyle = {
    fontFamily: customization.nameFontFamily,
    fontSize: customization.nameFontSize,
    lineHeight: 1.2,
  };


  return (
    <div className="text-gray-800 bg-white font-sans flex min-h-full">
      {/* Sidebar */}
      <div className="w-1/3 p-6 text-white" style={{ backgroundColor: accentColor }}>
        <h1 className="font-bold font-headline mb-2" style={nameStyle}>{personalInfo.name || "Your Name"}</h1>
        <div className="space-y-4 mt-8">
            <div>
                <h2 className="text-lg font-semibold uppercase tracking-wider mb-2 flex items-center gap-2"><User size={18}/> Contact</h2>
                <div className="space-y-1 text-sm">
                    {personalInfo.email && <p className="flex items-center gap-2"><Mail size={14}/> {personalInfo.email}</p>}
                    {personalInfo.phone && <p className="flex items-center gap-2"><Phone size={14}/> {personalInfo.phone}</p>}
                    {personalInfo.linkedin && <p className="flex items-center gap-2"><Linkedin size={14}/> {personalInfo.linkedin}</p>}
                    {personalInfo.website && <p className="flex items-center gap-2"><Globe size={14}/> {personalInfo.website}</p>}
                </div>
            </div>

            {skills && skills.length > 0 && <div>
                <h2 className="text-lg font-semibold uppercase tracking-wider mb-2 flex items-center gap-2"><Wrench size={18}/> Skills</h2>
                <ul className="list-inside list-disc text-sm space-y-1">
                    {skills.map(skill => <li key={skill}>{skill}</li>)}
                </ul>
            </div>}
            
            {education && education.length > 0 && education[0]?.degree && (
              <div>
                  <h2 className="text-lg font-semibold uppercase tracking-wider mb-2 flex items-center gap-2"><GraduationCap size={18}/> Education</h2>
                  <div className="space-y-3">
                      {education.map(edu => (
                          <div key={edu.id}>
                              <h3 className="font-bold text-sm">{edu.degree}</h3>
                              <p className="text-xs opacity-90">{edu.institution}</p>
                              <p className="text-xs opacity-90">{edu.graduationDate}</p>
                          </div>
                      ))}
                  </div>
              </div>
            )}
        </div>
      </div>

      {/* Main Content */}
      <div className="w-2/3 p-8">
        {/* Summary */}
        {personalInfo.summary && <div className="mb-8">
          <h2 className="text-2xl font-bold font-headline mb-2" style={{color: accentColor}}>Professional Summary</h2>
          <p className="text-sm">{personalInfo.summary}</p>
        </div>}

        {/* Experience */}
        {experience && experience.length > 0 && experience[0]?.jobTitle && (
          <div>
            <h2 className="text-2xl font-bold font-headline mb-4" style={{color: accentColor}}>Work Experience</h2>
            <div className="space-y-6">
              {experience.map(exp => (
                <div key={exp.id} className="relative pl-6">
                  <div className="absolute left-0 top-1 h-full border-l-2 border-gray-300"></div>
                  <div className="absolute left-[-6px] top-1 w-3 h-3 rounded-full" style={{backgroundColor: accentColor}}></div>
                  <div className="flex justify-between items-center">
                      <h3 className="text-lg font-bold">{exp.jobTitle}</h3>
                      <p className="text-sm font-medium">{exp.startDate} - {exp.endDate}</p>
                  </div>
                  <p className="text-md font-semibold italic">{exp.company} | {exp.location}</p>
                  <ul className="list-disc list-outside pl-5 mt-2 space-y-1">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i} className="text-sm">{resp}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
