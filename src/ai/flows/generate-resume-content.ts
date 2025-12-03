'use server';

/**
 * @fileOverview A flow for generating resume content based on user career information and target job role.
 *
 * - generateResumeContent - A function that generates resume content.
 * - GenerateResumeContentInput - The input type for the generateResumeContent function.
 * - GenerateResumeContentOutput - The return type for the generateResumeContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateResumeContentInputSchema = z.object({
  careerInformation: z
    .string()
    .describe('Detailed information about the user\'s career history and skills.'),
  jobRole: z.string().describe('The target job role for the resume.'),
});
export type GenerateResumeContentInput = z.infer<typeof GenerateResumeContentInputSchema>;

const GenerateResumeContentOutputSchema = z.object({
  resumeContent: z
    .string()
    .describe('The generated resume content, including sentences, phrases, and achievements.'),
  progress: z.string().describe('Short summary of what was generated'),
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
  prompt: `You are an expert resume writer. Generate resume content based on the
  user's career information and the target job role.  Include tailored sentences,
  relevant phrases, and achievements. Make sure the content is well-written and
  highlights the user's strengths.  Do not include any introductory or concluding remarks.

  Career Information: {{{careerInformation}}}
  Job Role: {{{jobRole}}}
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
      progress: 'Generated initial resume content based on career information and job role.',
    };
  }
);
