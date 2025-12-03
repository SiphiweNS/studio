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
          <div className="lg:col-span-12 xl:col-span-4">
            <ResumeEditor resumeData={resumeData} setResumeData={setResumeData} />
          </div>
          <div className="lg:col-span-7 xl:col-span-5">
            <ResumePreviewPanel resumeData={resumeData} />
          </div>
          <div className="lg:col-span-5 xl:col-span-3">
            <AIToolsPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
