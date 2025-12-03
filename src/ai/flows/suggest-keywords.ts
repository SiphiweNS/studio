'use server';
/**
 * @fileOverview This file defines a Genkit flow for suggesting industry-specific keywords to enhance resume visibility in ATS.
 *
 * - suggestKeywords - A function that suggests keywords based on the provided job role and industry.
 * - SuggestKeywordsInput - The input type for the suggestKeywords function.
 * - SuggestKeywordsOutput - The output type for the suggestKeywords function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestKeywordsInputSchema = z.object({
  jobRole: z.string().describe('The job role for which keywords are being suggested.'),
  industry: z.string().describe('The industry related to the job role.'),
});
export type SuggestKeywordsInput = z.infer<typeof SuggestKeywordsInputSchema>;

const SuggestKeywordsOutputSchema = z.object({
  keywords: z
    .array(z.string())
    .describe('An array of industry-specific keywords relevant to the job role.'),
});
export type SuggestKeywordsOutput = z.infer<typeof SuggestKeywordsOutputSchema>;

export async function suggestKeywords(input: SuggestKeywordsInput): Promise<SuggestKeywordsOutput> {
  return suggestKeywordsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestKeywordsPrompt',
  input: {schema: SuggestKeywordsInputSchema},
  output: {schema: SuggestKeywordsOutputSchema},
  prompt: `You are an expert resume optimization consultant. Your task is to suggest industry-specific keywords for a given job role to improve its visibility and ranking in Applicant Tracking Systems (ATS).

  Job Role: {{{jobRole}}}
  Industry: {{{industry}}}

  Provide a list of keywords that are highly relevant and commonly used in the specified industry for the given job role. The keywords should be specific enough to target the role effectively and broad enough to cover the main responsibilities and qualifications associated with it. Return no more than 10 keywords.
  `,
});

const suggestKeywordsFlow = ai.defineFlow(
  {
    name: 'suggestKeywordsFlow',
    inputSchema: SuggestKeywordsInputSchema,
    outputSchema: SuggestKeywordsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
