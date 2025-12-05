
"use client";

import React from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Download, FileCheck2, LayoutTemplate, FileType, FileText, Settings } from 'lucide-react';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { ResumeData } from '@/lib/types';
import TemplateModern from './templates/template-modern';
import TemplateClassic from './templates/template-classic';
import TemplateCreative from './templates/template-creative';
import { Switch } from '@/components/ui/switch';

interface ResumePreviewPanelProps {
  resumeData: ResumeData;
  setResumeData: Dispatch<SetStateAction<ResumeData>>;
}

export default function ResumePreviewPanel({ resumeData, setResumeData }: ResumePreviewPanelProps) {
    const handleExport = (format: 'PDF' | 'DOCX' | 'HTML') => {
        alert(`Exporting as ${format}... (This is a placeholder action)`);
        if (format === 'PDF') {
            const preview = document.getElementById('resume-preview-content');
            if(preview) {
                window.print();
            }
        }
    };
    
    const handleCustomizationChange = (field: string, value: any) => {
        setResumeData(prev => ({
            ...prev,
            customization: {
                ...prev.customization,
                [field]: value,
            }
        }));
    };
    
    const handleLayoutChange = (field: 'sidebar' | 'twoColumn', value: boolean) => {
        setResumeData(prev => ({
            ...prev,
            customization: {
                ...prev.customization,
                layout: {
                    ...prev.customization.layout,
                    [field]: value,
                }
            }
        }));
    }

  return (
    <Card className="h-full">
      <CardHeader className="flex-row items-start justify-between">
        <div>
          <CardTitle className="font-headline text-xl">Preview & Export</CardTitle>
          <CardDescription>Visualize your resume and export it.</CardDescription>
        </div>
        <div className="flex gap-2 hide-on-print">
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" size="icon"><Settings/></Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <h4 className="font-medium leading-none">Customization</h4>
                            <p className="text-sm text-muted-foreground">
                                Adjust the look and feel of your resume.
                            </p>
                        </div>
                        <div className="grid gap-4">
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label htmlFor="nameFontFamily">Name Font</Label>
                                <Select
                                    value={resumeData.customization.nameFontFamily}
                                    onValueChange={(value) => handleCustomizationChange('nameFontFamily', value)}
                                >
                                    <SelectTrigger className="col-span-2 h-8">
                                        <SelectValue placeholder="Select font" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="'Space Grotesk', sans-serif">Space Grotesk</SelectItem>
                                        <SelectItem value="'Inter', sans-serif">Inter</SelectItem>
                                        <SelectItem value="'serif'">Serif</SelectItem>
                                        <SelectItem value="'monospace'">Monospace</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                             <div className="grid grid-cols-3 items-center gap-4">
                                <Label htmlFor="nameFontSize">Name Size</Label>
                                <Select
                                    value={resumeData.customization.nameFontSize}
                                    onValueChange={(value) => handleCustomizationChange('nameFontSize', value)}
                                >
                                    <SelectTrigger className="col-span-2 h-8">
                                        <SelectValue placeholder="Select size" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="2.25rem">Large</SelectItem>
                                        <SelectItem value="3rem">X-Large</SelectItem>
                                        <SelectItem value="3.75rem">XX-Large</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                             <div className="flex items-center justify-between">
                                <Label htmlFor="two-column-layout">Two-Column Layout</Label>
                                <Switch
                                    id="two-column-layout"
                                    checked={resumeData.customization.layout.twoColumn}
                                    onCheckedChange={(checked) => handleLayoutChange('twoColumn', checked)}
                                />
                             </div>
                             <div className="flex items-center justify-between">
                                <Label htmlFor="sidebar-layout">Sidebar Contact Info</Label>
                                <Switch
                                    id="sidebar-layout"
                                    checked={resumeData.customization.layout.sidebar}
                                    onCheckedChange={(checked) => handleLayoutChange('sidebar', checked)}
                                />
                             </div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="highlight-sections">Highlight Sections</Label>
                                <Switch
                                    id="highlight-sections"
                                    checked={resumeData.customization.highlightSections}
                                    onCheckedChange={(checked) => handleCustomizationChange('highlightSections', checked)}
                                />
                            </div>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>

            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="outline"><FileCheck2 className="mr-2"/> ATS Check</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>ATS Compatibility Check</AlertDialogTitle>
                    <AlertDialogDescription asChild>
                      <div>
                        This simulated check ensures your resume is parser-friendly.
                        <ul className="list-disc pl-5 mt-4 space-y-2 text-sm">
                            <li className="text-green-500">Standard font detected. Good!</li>
                            <li className="text-green-500">Clear section headings (Experience, Education, Skills). Excellent!</li>
                            <li className="text-yellow-500">Warning: Avoid using complex tables or columns in the final document for maximum compatibility.</li>
                            <li>Your resume has a high probability of being parsed correctly by modern ATS.</li>
                        </ul>
                      </div>
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogAction>Got it!</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="default"><Download className="mr-2"/> Export</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleExport('PDF')}>
                  <FileType className="mr-2" /> PDF
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport('DOCX')}>
                  <FileText className="mr-2" /> DOCX
                </DropdownMenuItem>
                 <DropdownMenuItem onClick={() => handleExport('HTML')}>
                  <FileText className="mr-2" /> HTML
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="modern">
          <TabsList className="mb-4 hide-on-print">
            <TabsTrigger value="modern"><LayoutTemplate className="mr-2"/> Modern</TabsTrigger>
            <TabsTrigger value="classic"><LayoutTemplate className="mr-2"/> Classic</TabsTrigger>
            <TabsTrigger value="creative"><LayoutTemplate className="mr-2"/> Creative</TabsTrigger>
          </TabsList>
          
          <div id="resume-preview-content" className="bg-white rounded-lg shadow-lg p-2 sm:p-4 lg:p-8 h-[700px] overflow-auto">
             <style type="text/css" media="print">
              {`
                @page { size: auto; margin: 0mm; }
                body { background-color: #fff; margin: 0; }
                #resume-preview-content {
                  margin: 0;
                  padding: 20px;
                  box-shadow: none;
                  border-radius: 0;
                  height: auto;
                  overflow: visible;
                }
                .hide-on-print { display: none !important; }
              `}
            </style>
            <TabsContent value="modern" className="mt-0">
              <TemplateModern resumeData={resumeData} />
            </TabsContent>
            <TabsContent value="classic" className="mt-0">
              <TemplateClassic resumeData={resumeData} />
            </TabsContent>
            <TabsContent value="creative" className="mt-0">
              <TemplateCreative resumeData={resumeData} />
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
