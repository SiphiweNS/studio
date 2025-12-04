'use server';

/**
 * @fileOverview A flow for generating resume content based on user career information and target job role.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateResumeContentInputSchema = z.object({
  careerInformation: z
    .string()
    .describe('A summary of the user\'s career history and skills.'),
  jobRole: z.string().describe('The target job role for the resume.'),
});
export type GenerateResumeContentInput = z.infer<typeof GenerateResumeContentInputSchema>;

const GenerateResumeContentOutputSchema = z.object({
  resumeContent: z
    .string()
    .describe('The generated resume summary.'),
  progress: z.string().describe('A short summary of what was generated.'),
});
export type GenerateResumeContentOutput = z.infer<typeof GenerateResumeContentOutputSchema>;

export async function generateResumeContent(
  input: GenerateResumeContentInput
): Promise<GenerateResumeContentOutput> {
  return generateResumeContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateResumeContentPrompt',
  input: {schema: GenerateResumeContentInputSchema},
  output: {schema: GenerateResumeContentOutputSchema},
  prompt: `You are an expert resume writer. Generate a professional summary for a
  resume based on the user's career information and the target job role.
  The summary should be concise, tailored, and highlight the user's key strengths and achievements.
  Do not include any introductory or concluding remarks.

  Career Information: {{{careerInformation}}}
  Target Job Role: {{{jobRole}}}
  `,
});

const generateResumeContentFlow = ai.defineFlow(
  {
    name: 'generateResumeContentFlow',
    inputSchema: GenerateResumeContentInputSchema,
    outputSchema: GenerateResumeContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return {
      ...output!,
      progress: 'Generated resume summary based on your career info and target role.',
    };
  }
);
