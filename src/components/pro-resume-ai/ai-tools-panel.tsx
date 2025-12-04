"use client";

import { useState, useTransition } from 'react';
import { Lightbulb, Target, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { suggestKeywordsAction, matchJobDescriptionAction } from '@/lib/actions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type ResumeData } from '@/lib/types';

interface AIToolsPanelProps {
  resumeData: ResumeData;
}


type KeywordsOutput = { keywords: string[] };
type MatchOutput = { similarityScore: number; suggestions: string };

export default function AIToolsPanel({ resumeData }: AIToolsPanelProps) {
  const [isKeywordsPending, startKeywordsTransition] = useTransition();
  const [isMatchPending, startMatchTransition] = useTransition();
  const { toast } = useToast();

  const [keywordsResult, setKeywordsResult] = useState<KeywordsOutput | null>(null);
  const [matchResult, setMatchResult] = useState<MatchOutput | null>(null);
  const [jobDescriptionForMatch, setJobDescriptionForMatch] = useState('');


  const handleSuggestKeywords = (formData: FormData) => {
    const jobRole = formData.get('jobRole') as string;
    const industry = formData.get('industry') as string;

    if (!jobRole || !industry) {
      toast({
        variant: 'destructive',
        title: 'Missing Fields',
        description: 'Please provide both job role and industry.',
      });
      return;
    }

    startKeywordsTransition(async () => {
      const result = await suggestKeywordsAction({ jobRole, industry });
      if (result && result.keywords) {
        setKeywordsResult(result);
        toast({
          title: 'Keywords Generated',
          description: 'AI has suggested relevant keywords.',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to generate keywords.',
        });
      }
    });
  };
  
  const getResumeText = () => {
    const { personalInfo, experience, education, skills } = resumeData;
    let text = `Summary: ${personalInfo.summary}\n\n`;
    text += `Experience:\n${experience.map(e => `${e.jobTitle} at ${e.company}\n${e.responsibilities.join('\n')}`).join('\n\n')}\n\n`;
    text += `Education:\n${education.map(e => `${e.degree} from ${e.institution}`).join('\n')}\n\n`;
    text += `Skills: ${skills.join(', ')}`;
    return text;
  };

  const handleMatchJobDescription = () => {
    if (!jobDescriptionForMatch) {
      toast({
        variant: 'destructive',
        title: 'Missing Job Description',
        description: 'Please paste the job description text.',
      });
      return;
    }

    startMatchTransition(async () => {
      const resumeText = getResumeText();
      const result = await matchJobDescriptionAction({ jobDescriptionText: jobDescriptionForMatch, resumeText });
       if (result && typeof result.similarityScore === 'number') {
        setMatchResult(result);
        toast({
          title: 'Analysis Complete',
          description: 'Resume has been compared to the job description.',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to analyze job description.',
        });
      }
    });
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="font-headline text-xl">AI Assistant</CardTitle>
        <CardDescription>Optimize your resume with powerful AI tools.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="keywords">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="keywords">
               Keyword Optimizer
            </TabsTrigger>
            <TabsTrigger value="matcher">
               Job Matcher
            </TabsTrigger>
          </TabsList>
          <TabsContent value="keywords" className="mt-4">
            <form action={handleSuggestKeywords} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="jobRole">Target Job Role</Label>
                <Input id="jobRole" name="jobRole" placeholder="e.g., Senior Product Manager" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Input id="industry" name="industry" placeholder="e.g., Tech, Finance" required />
              </div>
              <Button type="submit" disabled={isKeywordsPending} className="w-full">
                {isKeywordsPending ? <LoaderCircle className="animate-spin" /> : <><Lightbulb className="mr-2" /> Suggest Keywords</>}
              </Button>
            </form>
            {keywordsResult && (
              <div className="mt-6">
                <h4 className="font-semibold mb-2">Suggested Keywords:</h4>
                <div className="flex flex-wrap gap-2">
                  {keywordsResult.keywords.map((keyword) => (
                    <Badge key={keyword} variant="secondary">{keyword}</Badge>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
          <TabsContent value="matcher" className="mt-4">
             <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="jobDescription">Job Description</Label>
                <Textarea
                  id="jobDescription"
                  name="jobDescription"
                  placeholder="Paste the job description here..."
                  className="min-h-[150px]"
                  required
                  value={jobDescriptionForMatch}
                  onChange={(e) => setJobDescriptionForMatch(e.target.value)}
                />
              </div>
              <Button onClick={handleMatchJobDescription} disabled={isMatchPending} className="w-full">
                {isMatchPending ? <LoaderCircle className="animate-spin" /> : <><Target className="mr-2" /> Analyze Match</>}
              </Button>
            </div>
            {matchResult && (
              <div className="mt-6 space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-semibold">Similarity Score</h4>
                    <span className="text-primary font-bold">{Math.round(matchResult.similarityScore * 100)}%</span>
                  </div>
                  <Progress value={matchResult.similarityScore * 100} />
                </div>
                <div>
                  <h4 className="font-semibold">Suggestions for Improvement:</h4>
                  <p className="text-sm text-muted-foreground mt-1">{matchResult.suggestions}</p>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
