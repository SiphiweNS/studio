'use server';

/**
 * @fileOverview Flow to analyze resume similarity against a job description and provide a similarity score and suggestions for improvement.
 *
 * - matchJobDescription - A function that handles the resume and job description matching process.
 * - MatchJobDescriptionInput - The input type for the matchJobDescription function.
 * - MatchJobDescriptionOutput - The return type for the matchJobDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MatchJobDescriptionInputSchema = z.object({
  resumeText: z
    .string()
    .describe('The text content of the resume to be analyzed.'),
  jobDescriptionText: z
    .string()
    .describe('The text content of the job description to match against.'),
});
export type MatchJobDescriptionInput = z.infer<
  typeof MatchJobDescriptionInputSchema
>;

const MatchJobDescriptionOutputSchema = z.object({
  similarityScore: z
    .number()
    .describe(
      'A score (0-1) indicating the similarity between the resume and the job description.'
    ),
  suggestions: z
    .string()
    .describe('Suggestions for improving the resume to better match the job description.'),
});
export type MatchJobDescriptionOutput = z.infer<
  typeof MatchJobDescriptionOutputSchema
>;

export async function matchJobDescription(
  input: MatchJobDescriptionInput
): Promise<MatchJobDescriptionOutput> {
  return matchJobDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'matchJobDescriptionPrompt',
  input: {schema: MatchJobDescriptionInputSchema},
  output: {schema: MatchJobDescriptionOutputSchema},
  prompt: `You are an expert resume analyst. Analyze the following resume against the job description and provide a similarity score and suggestions for improvement.

Resume:
{{resumeText}}

Job Description:
{{jobDescriptionText}}

Provide a similarity score between 0 and 1 (higher is better). Also, give specific, actionable suggestions to improve the resume.

Output in the following JSON format:
{
  "similarityScore": 0.75,
  "suggestions": "Add more keywords related to project management. Quantify your achievements with numbers."
}
`,
});

const matchJobDescriptionFlow = ai.defineFlow(
  {
    name: 'matchJobDescriptionFlow',
    inputSchema: MatchJobDescriptionInputSchema,
    outputSchema: MatchJobDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
