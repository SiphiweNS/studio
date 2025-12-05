
"use client";

import { useState, useEffect } from 'react';
import Header from './header';
import ResumeEditor from './resume-editor';
import ResumePreviewPanel from './resume-preview-panel';
import AIToolsPanel from './ai-tools-panel';
import ResumeAnalytics from './resume-analytics';
import { type ResumeData, initialResumeData } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { defaultsDeep } from 'lodash';

// A simple deep merge function
function mergeDefaults(target: any, source: any) {
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (source[key] instanceof Object && key in target && !(source[key] instanceof Array)) {
        target[key] = mergeDefaults(target[key] || {}, source[key]);
      } else {
        target[key] = target[key] ?? source[key];
      }
    }
  }
  return target;
}


export default function Dashboard() {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem('proResumeAIData');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        // Deep merge saved data with initial data to ensure all fields are present
        const mergedData = mergeDefaults(parsedData, initialResumeData);
        setResumeData(mergedData);
      } else {
        setResumeData(initialResumeData);
      }
    } catch (error) {
      console.error("Failed to parse resume data from localStorage", error);
      setResumeData(initialResumeData);
    }
  }, []);

  // Save data to localStorage on change
  useEffect(() => {
    if (resumeData) {
      try {
        localStorage.setItem('proResumeAIData', JSON.stringify(resumeData));
      } catch (error) {
        console.error("Failed to save resume data to localStorage", error);
      }
    }
  }, [resumeData]);

  const handleSetResumeData = (data: React.SetStateAction<ResumeData | null>) => {
    if (typeof data === 'function') {
      setResumeData(prev => {
        const newData = prev ? data(prev) : null;
        return newData;
      });
    } else {
      setResumeData(data);
    }
  };

  if (!resumeData) {
    return (
       <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 xl:col-span-5">
               <Skeleton className="h-[800px] w-full" />
            </div>
            <div className="lg:col-span-4 xl:col-span-7 grid grid-cols-1 gap-8 auto-rows-max">
              <div className="lg:col-span-1">
                <Skeleton className="h-[700px] w-full" />
              </div>
              <div className="lg:col-span-1">
                <Skeleton className="h-[400px] w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 xl:col-span-5">
            <ResumeEditor resumeData={resumeData} setResumeData={handleSetResumeData as React.Dispatch<React.SetStateAction<ResumeData>>} />
          </div>
          <div className="lg:col-span-4 xl:col-span-7 grid grid-cols-1 gap-8 auto-rows-max">
             <div className="lg:col-span-1">
              <ResumeAnalytics resumeData={resumeData} />
            </div>
            <div className="lg:col-span-1">
              <ResumePreviewPanel resumeData={resumeData} setResumeData={handleSetResumeData as React.Dispatch<React.SetStateAction<ResumeData>>} />
            </div>
            <div className="lg:col-span-1">
              <AIToolsPanel resumeData={resumeData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
