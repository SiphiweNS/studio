
"use client";
import type { ResumeData } from '@/lib/types';
import { Separator } from '@/components/ui/separator';
import { Mail, Phone, Linkedin, Globe, MapPin } from 'lucide-react';

interface TemplateProps {
  resumeData: ResumeData;
}

const ContactInfo = ({ personalInfo }: { personalInfo: ResumeData['personalInfo'] }) => (
    <div className="flex justify-center items-center gap-x-4 gap-y-1 text-xs mt-3 flex-wrap">
        {personalInfo.email && <span className="flex items-center gap-1">{personalInfo.email}</span>}
        {personalInfo.phone && <span className="flex items-center gap-1">| {personalInfo.phone}</span>}
        {personalInfo.linkedin && <span className="flex items-center gap-1">| {personalInfo.linkedin}</span>}
        {personalInfo.website && <span className="flex items-center gap-1">| {personalInfo.website}</span>}
    </div>
);

const SidebarContactInfo = ({ personalInfo }: { personalInfo: ResumeData['personalInfo'] }) => (
    <div className="space-y-2 text-sm">
        {personalInfo.email && <p className="flex items-center gap-2"><Mail size={14}/> {personalInfo.email}</p>}
        {personalInfo.phone && <p className="flex items-center gap-2"><Phone size={14}/> {personalInfo.phone}</p>}
        {personalInfo.linkedin && <p className="flex items-center gap-2"><Linkedin size={14}/> {personalInfo.linkedin}</p>}
        {personalInfo.website && <p className="flex items-center gap-2"><Globe size={14}/> {personalInfo.website}</p>}
    </div>
);


const MainContent = ({ experience, education }: { experience: ResumeData['experience'], education: ResumeData['education'] }) => (
    <>
        {/* Experience */}
        {experience && experience.length > 0 && experience[0]?.jobTitle && (
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
        )}
         {/* Education */}
        {education && education.length > 0 && education[0]?.degree && (
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
        )}
    </>
)

export default function TemplateClassic({ resumeData }: TemplateProps) {
  const { personalInfo, experience, education, skills, customization } = resumeData;

  const nameStyle = {
    fontFamily: customization.nameFontFamily,
    fontSize: customization.nameFontSize,
    lineHeight: 1.2,
  };

  const useSidebar = customization.layout.sidebar;
  const useTwoColumn = customization.layout.twoColumn;

  const renderSkills = () => (
     skills && skills.length > 0 && <div className="mb-6">
        <h2 className="text-sm font-bold uppercase tracking-wider mb-2 border-b border-gray-300 pb-1">Skills</h2>
        <div className="flex flex-wrap gap-2">
            {skills.map(skill => (
                <span key={skill} className="text-xs bg-gray-200 text-gray-800 px-2 py-1 rounded">{skill}</span>
            ))}
        </div>
    </div>
  )

  const renderEducation = () => (
      education && education.length > 0 && education[0]?.degree && (
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
    )
  );

  if (useSidebar) {
      return (
        <div className="text-black bg-white font-serif p-8 flex gap-8">
            <div className="w-1/3 border-r pr-8">
                <h1 className="font-bold tracking-widest uppercase mb-6" style={nameStyle}>{personalInfo.name || "Your Name"}</h1>
                <div className="space-y-6">
                    <div>
                        <h2 className="text-sm font-bold uppercase tracking-wider mb-2 border-b border-gray-300 pb-1">Contact</h2>
                        <SidebarContactInfo personalInfo={personalInfo}/>
                    </div>
                    {renderSkills()}
                    {renderEducation()}
                </div>
            </div>
            <div className="w-2/3">
                 {personalInfo.summary && <div className="mb-6">
                    <h2 className="text-sm font-bold uppercase tracking-wider mb-2 border-b border-gray-300 pb-1">Summary</h2>
                    <p className="text-sm text-gray-700">{personalInfo.summary}</p>
                </div>}
                <MainContent experience={experience} education={[]} />
            </div>
        </div>
      )
  }


  return (
    <div className="text-black bg-white font-serif p-8">
      {/* Header */}
      <div className="text-center border-b-2 border-gray-400 pb-4 mb-6">
        <h1 className="font-bold tracking-widest uppercase" style={nameStyle}>{personalInfo.name || "Your Name"}</h1>
        <ContactInfo personalInfo={personalInfo} />
      </div>

      {/* Summary */}
      {personalInfo.summary && <div className="mb-6">
        <h2 className="text-sm font-bold uppercase tracking-wider mb-2 border-b border-gray-300 pb-1">Summary</h2>
        <p className="text-sm text-gray-700">{personalInfo.summary}</p>
      </div>}

      <div className={useTwoColumn ? "grid grid-cols-3 gap-8" : ""}>
        <div className={useTwoColumn ? "col-span-2" : ""}>
            <MainContent experience={experience} education={useTwoColumn ? [] : education} />
        </div>
        <div className={useTwoColumn ? "col-span-1" : ""}>
            {renderSkills()}
            {useTwoColumn && renderEducation()}
        </div>
      </div>
    </div>
  );
}
