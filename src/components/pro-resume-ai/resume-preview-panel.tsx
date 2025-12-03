"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Download, FileCheck2, LayoutTemplate } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import type { ResumeData } from '@/lib/types';
import TemplateModern from './templates/template-modern';
import TemplateClassic from './templates/template-classic';
import TemplateCreative from './templates/template-creative';

interface ResumePreviewPanelProps {
  resumeData: ResumeData;
}

export default function ResumePreviewPanel({ resumeData }: ResumePreviewPanelProps) {
    const handleExport = (format: 'PDF' | 'DOCX' | 'HTML') => {
        alert(`Exporting as ${format}... (This is a placeholder action)`);
        if (format === 'PDF') {
            const preview = document.getElementById('resume-preview-content');
            if(preview) {
                window.print();
            }
        }
    };

  return (
    <Card className="h-full">
      <CardHeader className="flex-row items-center justify-between">
        <div>
          <CardTitle className="font-headline text-xl">Preview & Export</CardTitle>
          <CardDescription>Visualize your resume and export it.</CardDescription>
        </div>
        <div className="flex gap-2">
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="outline"><FileCheck2 className="mr-2"/> ATS Check</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>ATS Compatibility Check</AlertDialogTitle>
                    <AlertDialogDescription>
                        This simulated check ensures your resume is parser-friendly.
                        <ul className="list-disc pl-5 mt-4 space-y-2 text-sm">
                            <li className="text-green-500">Standard font detected. Good!</li>
                            <li className="text-green-500">Clear section headings (Experience, Education, Skills). Excellent!</li>
                            <li className="text-yellow-500">Warning: Avoid using complex tables or columns in the final document for maximum compatibility.</li>
                            <li>Your resume has a high probability of being parsed correctly by modern ATS.</li>
                        </ul>
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogAction>Got it!</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <Button variant="default" onClick={() => handleExport('PDF')}><Download className="mr-2" /> Export</Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="modern">
          <TabsList className="mb-4">
            <TabsTrigger value="modern"><LayoutTemplate className="mr-2"/> Modern</TabsTrigger>
            <TabsTrigger value="classic"><LayoutTemplate className="mr-2"/> Classic</TabsTrigger>
            <TabsTrigger value="creative"><LayoutTemplate className="mr-2"/> Creative</TabsTrigger>
          </TabsList>
          
          <div id="resume-preview-content" className="bg-white rounded-lg shadow-lg p-2 sm:p-4 lg:p-8 h-[700px] overflow-auto">
             <style type="text/css" media="print">
              {`
                @page { size: auto; margin: 0mm; }
                body { background-color: #fff; }
                #resume-preview-content {
                  margin: 0;
                  padding: 20px;
                  box-shadow: none;
                  border-radius: 0;
                  height: auto;
                }
                .hide-on-print { display: none; }
              `}
            </style>
            <TabsContent value="modern">
              <TemplateModern resumeData={resumeData} />
            </TabsContent>
            <TabsContent value="classic">
              <TemplateClassic resumeData={resumeData} />
            </TabsContent>
            <TabsContent value="creative">
              <TemplateCreative resumeData={resumeData} />
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
