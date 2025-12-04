"use client";

import React, { useState, useTransition, ChangeEvent, useCallback } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { User, Briefcase, GraduationCap, Wrench, Sparkles, LoaderCircle, Trash2, PlusCircle, BrainCircuit, UploadCloud } from 'lucide-react';
import type { ResumeData, Experience, Education } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { generateResumeContentAction, learnFromUserEditsAction, parseResumePdfAction } from '@/lib/actions';
import { useDropzone } from 'react-dropzone';

interface ResumeEditorProps {
  resumeData: ResumeData;
  setResumeData: Dispatch<SetStateAction<ResumeData>>;
}

export default function ResumeEditor({ resumeData, setResumeData }: ResumeEditorProps) {
  const { toast } = useToast();
  const [isGenerating, startGenerationTransition] = useTransition();
  const [isLearning, startLearningTransition] = useTransition();
  const [isParsing, startParsingTransition] = useTransition();
  const [originalSummary, setOriginalSummary] = useState('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file && file.type === 'application/pdf') {
      handlePdfUpload(file);
    } else {
      toast({
        variant: 'destructive',
        title: 'Invalid File Type',
        description: 'Please upload a PDF file.',
      });
    }
  }, [setResumeData, toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false,
  });

  const handlePdfUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUri = reader.result as string;
      startParsingTransition(async () => {
        try {
          const result = await parseResumePdfAction({ pdfDataUri: dataUri });
          if (result) {
            setResumeData(prev => ({
              ...prev,
              personalInfo: result.personalInfo ?? prev.personalInfo,
              experience: result.experience ?? prev.experience,
              education: result.education ?? prev.education,
              skills: result.skills ?? prev.skills,
            }));
            toast({
              title: 'Resume Parsed!',
              description: 'Your information has been imported from the PDF.',
            });
          } else {
             toast({ variant: 'destructive', title: 'Parsing Failed', description: 'Could not extract information from the PDF.' });
          }
        } catch (error) {
           toast({ variant: 'destructive', title: 'Parsing Error', description: 'An unexpected error occurred.' });
        }
      });
    };
    reader.readAsDataURL(file);
  };

  const handlePersonalInfoChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setResumeData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [name]: value } }));
  };
  
  const handleSkillsChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setResumeData(prev => ({...prev, skills: e.target.value.split(',').map(s => s.trim())}));
  };

  const handleExperienceChange = (index: number, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const newExperience = [...resumeData.experience];
    if(name === 'responsibilities') {
        newExperience[index] = { ...newExperience[index], [name]: value.split('\n') };
    } else {
        newExperience[index] = { ...newExperience[index], [name]: value };
    }
    setResumeData(prev => ({ ...prev, experience: newExperience }));
  };

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, { id: `exp${Date.now()}`, jobTitle: '', company: '', location: '', startDate: '', endDate: '', responsibilities: [] }]
    }));
  };
  
  const removeExperience = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const handleEducationChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newEducation = [...resumeData.education];
    newEducation[index] = { ...newEducation[index], [name]: value };
    setResumeData(prev => ({ ...prev, education: newEducation }));
  };
  
  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, { id: `edu${Date.now()}`, degree: '', institution: '', location: '', graduationDate: '' }]
    }));
  };

  const removeEducation = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };
  
  const handleGenerate = () => {
    startGenerationTransition(async () => {
      const careerInformation = `Experience: ${resumeData.experience.map(e => `${e.jobTitle} at ${e.company}`).join(', ')}. Skills: ${resumeData.skills.join(', ')}.`;
      const jobRole = "Target Job Role"; // In a real app, get this from an input
      const result = await generateResumeContentAction({ careerInformation, jobRole });
      if (result && result.resumeContent) {
        setOriginalSummary(result.resumeContent);
        setResumeData(prev => ({
          ...prev,
          personalInfo: { ...prev.personalInfo, summary: result.resumeContent }
        }));
        toast({ title: 'Content Generated!', description: result.progress });
      } else {
        toast({ variant: 'destructive', title: 'Generation Failed' });
      }
    });
  };
  
  const handleLearn = () => {
    if (!originalSummary || originalSummary === resumeData.personalInfo.summary) {
        toast({ variant: 'default', title: 'No changes to learn from.', description: "Edit the AI-generated summary first." });
        return;
    }
    startLearningTransition(async () => {
        const result = await learnFromUserEditsAction({ originalContent: originalSummary, editedContent: resumeData.personalInfo.summary });
        if(result.success) {
            toast({ title: "Feedback Received!", description: "The AI will incorporate your style in future." });
        }
    });
  };


  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="font-headline text-xl">Resume Content</CardTitle>
        <CardDescription>Fill in your details below, or upload a PDF to get started.</CardDescription>
      </CardHeader>
      <CardContent>
         <div {...getRootProps()} className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer mb-6 transition-colors ${isDragActive ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'}`}>
          <input {...getInputProps()} />
          {isParsing ? (
             <div className="flex flex-col items-center gap-2">
                <LoaderCircle className="animate-spin text-primary" />
                <p className="text-muted-foreground">Parsing your resume...</p>
             </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <UploadCloud className="h-8 w-8" />
              {isDragActive ? (
                <p>Drop the PDF here ...</p>
              ) : (
                <p>Drag 'n' drop a PDF here, or click to select file</p>
              )}
            </div>
          )}
        </div>

        <Accordion type="multiple" defaultValue={['personal-info', 'experience']} className="w-full">
          {/* Personal Info */}
          <AccordionItem value="personal-info">
            <AccordionTrigger className="font-semibold"><User className="mr-2" /> Personal Information</AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2"><Label htmlFor="name">Full Name</Label><Input id="name" name="name" placeholder="e.g. Jane Doe" value={resumeData.personalInfo.name} onChange={handlePersonalInfoChange} /></div>
                <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" placeholder="e.g. jane.doe@email.com" value={resumeData.personalInfo.email} onChange={handlePersonalInfoChange} /></div>
                <div className="space-y-2"><Label htmlFor="phone">Phone</Label><Input id="phone" name="phone" placeholder="e.g. (123) 456-7890" value={resumeData.personalInfo.phone} onChange={handlePersonalInfoChange} /></div>
                <div className="space-y-2"><Label htmlFor="linkedin">LinkedIn</Label><Input id="linkedin" name="linkedin" placeholder="e.g. linkedin.com/in/janedoe" value={resumeData.personalInfo.linkedin} onChange={handlePersonalInfoChange} /></div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Portfolio/Website</Label><Input id="website" name="website" placeholder="e.g. github.com/janedoe" value={resumeData.personalInfo.website} onChange={handlePersonalInfoChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="summary">Professional Summary</Label>
                <Textarea id="summary" name="summary" className="min-h-[120px]" placeholder="A brief professional summary about yourself. You can also click 'Generate with AI' to create one." value={resumeData.personalInfo.summary} onChange={handlePersonalInfoChange} />
                <div className="flex gap-2 justify-end">
                    <Button variant="outline" size="sm" onClick={handleLearn} disabled={isLearning}>
                        {isLearning ? <LoaderCircle className="animate-spin mr-2" /> : <BrainCircuit className="mr-2"/>} Learn from Edits
                    </Button>
                    <Button variant="default" size="sm" onClick={handleGenerate} disabled={isGenerating}>
                        {isGenerating ? <LoaderCircle className="animate-spin mr-2" /> : <Sparkles className="mr-2"/>} Generate with AI
                    </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          {/* Experience */}
          <AccordionItem value="experience">
            <AccordionTrigger className="font-semibold"><Briefcase className="mr-2" /> Work Experience</AccordionTrigger>
            <AccordionContent className="space-y-6 pt-4">
              {resumeData.experience.map((exp, index) => (
                <div key={exp.id} className="space-y-4 p-4 border rounded-lg relative">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>Job Title</Label><Input name="jobTitle" placeholder="e.g. Software Engineer" value={exp.jobTitle} onChange={(e) => handleExperienceChange(index, e)} /></div>
                    <div className="space-y-2"><Label>Company</Label><Input name="company" placeholder="e.g. Tech Corp" value={exp.company} onChange={(e) => handleExperienceChange(index, e)} /></div>
                    <div className="space-y-2"><Label>Location</Label><Input name="location" placeholder="e.g. San Francisco, CA" value={exp.location} onChange={(e) => handleExperienceChange(index, e)} /></div>
                    <div className="space-y-2"><Label>Start Date</Label><Input name="startDate" placeholder="e.g. Jan 2020" value={exp.startDate} onChange={(e) => handleExperienceChange(index, e)} /></div>
                    <div className="space-y-2"><Label>End Date</Label><Input name="endDate" placeholder="e.g. Present" value={exp.endDate} onChange={(e) => handleExperienceChange(index, e)} /></div>
                  </div>
                  <div className="space-y-2"><Label>Responsibilities / Achievements</Label><Textarea name="responsibilities" className="min-h-[100px]" value={exp.responsibilities.join('\n')} onChange={(e) => handleExperienceChange(index, e)} placeholder="Enter one achievement per line"/></div>
                  <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive" onClick={() => removeExperience(index)}><Trash2 className="w-4 h-4" /></Button>
                </div>
              ))}
              <Button variant="outline" onClick={addExperience}><PlusCircle className="mr-2 w-4 h-4"/>Add Experience</Button>
            </AccordionContent>
          </AccordionItem>
          {/* Education */}
          <AccordionItem value="education">
            <AccordionTrigger className="font-semibold"><GraduationCap className="mr-2" /> Education</AccordionTrigger>
            <AccordionContent className="space-y-6 pt-4">
              {resumeData.education.map((edu, index) => (
                <div key={edu.id} className="space-y-4 p-4 border rounded-lg relative">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>Degree/Certificate</Label><Input name="degree" placeholder="e.g. B.S. in Computer Science" value={edu.degree} onChange={(e) => handleEducationChange(index, e)} /></div>
                    <div className="space-y-2"><Label>Institution</Label><Input name="institution" placeholder="e.g. University of Technology" value={edu.institution} onChange={(e) => handleEducationChange(index, e)} /></div>
                    <div className="space-y-2"><Label>Location</Label><Input name="location" placeholder="e.g. Techville, USA" value={edu.location} onChange={(e) => handleEducationChange(index, e)} /></div>
                    <div className="space-y-2"><Label>Graduation Date</Label><Input name="graduationDate" placeholder="e.g. May 2019" value={edu.graduationDate} onChange={(e) => handleEducationChange(index, e)} /></div>
                  </div>
                   <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive" onClick={() => removeEducation(index)}><Trash2 className="w-4 h-4" /></Button>
                </div>
              ))}
              <Button variant="outline" onClick={addEducation}><PlusCircle className="mr-2 w-4 h-4"/>Add Education</Button>
            </AccordionContent>
          </AccordionItem>
          {/* Skills */}
          <AccordionItem value="skills">
            <AccordionTrigger className="font-semibold"><Wrench className="mr-2" /> Skills</AccordionTrigger>
            <AccordionContent className="pt-4">
              <Label htmlFor="skills">Skills (comma-separated)</Label>
              <Textarea id="skills" value={resumeData.skills.join(', ')} onChange={handleSkillsChange} placeholder="e.g. React, Project Management, Figma"/>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
