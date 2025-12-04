
"use client";

import { useState } from 'react';
import Header from './header';
import ResumeEditor from './resume-editor';
import ResumePreviewPanel from './resume-preview-panel';
import AIToolsPanel from './ai-tools-panel';
import { type ResumeData, initialResumeData } from '@/lib/types';

export default function Dashboard() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 xl:col-span-5">
            <ResumeEditor resumeData={resumeData} setResumeData={setResumeData} />
          </div>
          <div className="lg:col-span-4 xl:col-span-7 grid grid-cols-1 gap-8 auto-rows-max">
            <div className="lg:col-span-1">
              <ResumePreviewPanel resumeData={resumeData} setResumeData={setResumeData} />
            </div>
            <div className="lg:col-span-1">
              <AIToolsPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
