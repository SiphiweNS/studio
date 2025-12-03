"use server";

import {
  generateResumeContent,
  type GenerateResumeContentInput,
  type GenerateResumeContentOutput,
} from '@/ai/flows/generate-resume-content';
import {
  suggestKeywords,
  type SuggestKeywordsInput,
  type SuggestKeywordsOutput,
} from '@/ai/flows/suggest-keywords';
import {
  matchJobDescription,
  type MatchJobDescriptionInput,
  type MatchJobDescriptionOutput,
} from '@/ai/flows/match-job-description';
import {
  learnFromUserEdits,
  type LearnFromUserEditsInput,
  type LearnFromUserEditsOutput,
} from '@/ai/flows/learn-from-user-edits';
import {
  parseResumePdf,
  type ParseResumePdfInput,
  type ParseResumePdfOutput,
} from '@/ai/flows/parse-resume-pdf';


export async function generateResumeContentAction(
  input: GenerateResumeContentInput
): Promise<GenerateResumeContentOutput> {
  return await generateResumeContent(input);
}

export async function suggestKeywordsAction(
  input: SuggestKeywordsInput
): Promise<SuggestKeywordsOutput> {
  return await suggestKeywords(input);
}

export async function matchJobDescriptionAction(
  input: MatchJobDescriptionInput
): Promise<MatchJobDescriptionOutput> {
  return await matchJobDescription(input);
}

export async function learnFromUserEditsAction(
  input: LearnFromUserEditsInput
): Promise<LearnFromUserEditsOutput> {
  return await learnFromUserEdits(input);
}

export async function parseResumePdfAction(
  input: ParseResumePdfInput
): Promise<ParseResumePdfOutput> {
    return await parseResumePdf(input);
}
