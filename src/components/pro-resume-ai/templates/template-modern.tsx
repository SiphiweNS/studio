
"use client";
import type { ResumeData } from '@/lib/types';
import { Separator } from '@/components/ui/separator';
import { Mail, Phone, Linkedin, Globe, MapPin, Briefcase, GraduationCap, Wrench } from 'lucide-react';

interface TemplateProps {
  resumeData: ResumeData;
}

const ContactInfo = ({ personalInfo }: { personalInfo: ResumeData['personalInfo'] }) => (
    <div className="flex justify-center items-center gap-x-4 gap-y-1 text-sm text-gray-500 mt-3 flex-wrap">
        {personalInfo.email && <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1.5 hover:text-primary"><Mail size={14}/> {personalInfo.email}</a>}
        {personalInfo.phone && <span className="flex items-center gap-1.5"><Phone size={14}/> {personalInfo.phone}</span>}
        {personalInfo.linkedin && <a href={`https://${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-primary"><Linkedin size={14}/> {personalInfo.linkedin}</a>}
        {personalInfo.website && <a href={`https://${personalInfo.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-primary"><Globe size={14}/> {personalInfo.website}</a>}
    </div>
);

const SidebarContactInfo = ({ personalInfo }: { personalInfo: ResumeData['personalInfo'] }) => (
    <div className="space-y-2 text-sm">
        {personalInfo.email && <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 hover:text-primary"><Mail size={14}/> {personalInfo.email}</a>}
        {personalInfo.phone && <p className="flex items-center gap-2"><Phone size={14}/> {personalInfo.phone}</p>}
        {personalInfo.linkedin && <a href={`https://${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary"><Linkedin size={14}/> {personalInfo.linkedin}</a>}
        {personalInfo.website && <a href={`https://${personalInfo.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary"><Globe size={14}/> {personalInfo.website}</a>}
    </div>
);

const ExperienceSection = ({ experience }: { experience: ResumeData['experience'] }) => (
    experience && experience.length > 0 && experience[0]?.jobTitle && (
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
        )
);

const EducationSection = ({ education }: { education: ResumeData['education'] }) => (
    education && education.length > 0 && education[0]?.degree && (
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
        )
);

const SkillsSection = ({ skills }: { skills: ResumeData['skills'] }) => (
    skills && skills.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold font-headline mb-4 flex items-center gap-2"><Wrench size={20} className="text-primary"/> Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map(skill => (
                  <span key={skill} className="bg-secondary text-secondary-foreground font-medium px-3 py-1 rounded-full text-sm">{skill}</span>
              ))}
            </div>
          </div>
        )
);

export default function TemplateModern({ resumeData }: TemplateProps) {
  const { personalInfo, experience, education, skills, customization } = resumeData;

  const nameStyle = {
    fontFamily: customization.nameFontFamily,
    fontSize: customization.nameFontSize,
    lineHeight: 1.1,
  };

  const useSidebar = customization.layout.sidebar;
  const useTwoColumn = customization.layout.twoColumn;

  const MainContent = () => (
    <>
      {personalInfo.summary && <div className="mb-8">
        <p className={useSidebar ? "text-gray-600" : "text-center text-gray-600"}>{personalInfo.summary}</p>
      </div>}
      {(experience && experience.length > 0 && experience[0]?.jobTitle) && <Separator className="my-8" />}
      <div className={useTwoColumn ? "grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10" : "space-y-10"}>
          <ExperienceSection experience={experience} />
          <div className="space-y-10">
            <EducationSection education={education} />
            <SkillsSection skills={skills} />
          </div>
      </div>
    </>
  );

  return (
    <div className="text-black bg-white font-sans p-8">
        { useSidebar ? (
            <div className="flex gap-8">
                <div className="w-1/3 border-r pr-8">
                     <h1 className="font-extrabold font-headline tracking-tight text-gray-800" style={nameStyle}>{personalInfo.name || "Your Name"}</h1>
                     <Separator className="my-6" />
                     <div className="space-y-6">
                        <div>
                            <h2 className="text-xl font-bold font-headline mb-3 text-primary">Contact</h2>
                            <SidebarContactInfo personalInfo={personalInfo} />
                        </div>
                         {skills && skills.length > 0 && (
                            <div>
                                <h2 className="text-xl font-bold font-headline mb-3 text-primary">Skills</h2>
                                <div className="flex flex-wrap gap-1">
                                    {skills.map(skill => (
                                        <span key={skill} className="bg-secondary text-secondary-foreground font-medium px-2 py-0.5 rounded-md text-xs">{skill}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                     </div>
                </div>
                <div className="w-2/3">
                    <MainContent />
                </div>
            </div>
        ) : (
            <>
                <div className="flex flex-col items-center mb-6">
                    <h1 className="font-extrabold font-headline tracking-tight text-gray-800" style={nameStyle}>{personalInfo.name || "Your Name"}</h1>
                    <ContactInfo personalInfo={personalInfo} />
                </div>
                <MainContent />
            </>
        )}
    </div>
  );
}
