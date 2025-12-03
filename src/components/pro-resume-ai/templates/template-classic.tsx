"use client";
import type { ResumeData } from '@/lib/types';
import { Separator } from '@/components/ui/separator';
import { Mail, Phone, Linkedin, Globe, MapPin } from 'lucide-react';

interface TemplateProps {
  resumeData: ResumeData;
}

export default function TemplateClassic({ resumeData }: TemplateProps) {
  const { personalInfo, experience, education, skills } = resumeData;

  return (
    <div className="text-black bg-white font-serif p-8">
      {/* Header */}
      <div className="text-center border-b-2 border-gray-400 pb-4 mb-6">
        <h1 className="text-4xl font-bold tracking-widest uppercase">{personalInfo.name}</h1>
        <div className="flex justify-center items-center gap-x-4 gap-y-1 text-xs mt-3 flex-wrap">
          {personalInfo.email && <span className="flex items-center gap-1">{personalInfo.email}</span>}
          {personalInfo.phone && <span className="flex items-center gap-1">| {personalInfo.phone}</span>}
          {personalInfo.linkedin && <span className="flex items-center gap-1">| {personalInfo.linkedin}</span>}
          {personalInfo.website && <span className="flex items-center gap-1">| {personalInfo.website}</span>}
        </div>
      </div>

      {/* Summary */}
      <div className="mb-6">
        <h2 className="text-sm font-bold uppercase tracking-wider mb-2 border-b border-gray-300 pb-1">Summary</h2>
        <p className="text-sm text-gray-700">{personalInfo.summary}</p>
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2">
            {/* Experience */}
            <div className="mb-6">
                <h2 className="text-sm font-bold uppercase tracking-wider mb-3 border-b border-gray-300 pb-1">Experience</h2>
                <div className="space-y-5">
                {experience.map((exp) => (
                    <div key={exp.id}>
                    <div className="flex justify-between items-baseline">
                        <h3 className="text-base font-bold">{exp.jobTitle}</h3>
                        <p className="text-xs font-medium text-gray-600">{exp.startDate} - {exp.endDate}</p>
                    </div>
                    <div className="flex justify-between items-baseline mb-2">
                        <p className="text-sm font-semibold text-gray-800">{exp.company}</p>
                        <p className="text-xs text-gray-600">{exp.location}</p>
                    </div>
                    <ul className="list-disc list-outside pl-5 space-y-1">
                        {exp.responsibilities.map((resp, i) => (
                        <li key={i} className="text-sm text-gray-700">{resp}</li>
                        ))}
                    </ul>
                    </div>
                ))}
                </div>
            </div>
        </div>
        <div className="col-span-1">
            {/* Skills */}
            <div className="mb-6">
                <h2 className="text-sm font-bold uppercase tracking-wider mb-2 border-b border-gray-300 pb-1">Skills</h2>
                <div className="flex flex-wrap gap-2">
                    {skills.map(skill => (
                        <span key={skill} className="text-xs bg-gray-200 text-gray-800 px-2 py-1 rounded">{skill}</span>
                    ))}
                </div>
            </div>

            {/* Education */}
            <div className="mb-6">
                <h2 className="text-sm font-bold uppercase tracking-wider mb-3 border-b border-gray-300 pb-1">Education</h2>
                <div className="space-y-4">
                {education.map((edu) => (
                    <div key={edu.id}>
                    <h3 className="text-base font-bold">{edu.degree}</h3>
                    <p className="text-sm text-gray-800">{edu.institution}</p>
                    <p className="text-xs text-gray-600">{edu.location}</p>
                    <p className="text-xs text-gray-600">{edu.graduationDate}</p>
                    </div>
                ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
