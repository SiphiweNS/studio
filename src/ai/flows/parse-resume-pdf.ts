'use server';

/**
 * @fileOverview A flow to parse a resume PDF and extract structured data.
 *
 * - parseResumePdf - A function that takes a PDF data URI and returns structured resume data.
 * - ParseResumePdfInput - The input type for the parseResumePdf function.
 * - ParseResumePdfOutput - The return type for the parseResumePdf function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalInfoSchema = z.object({
  name: z.string().describe('Full name of the person.'),
  email: z.string().describe('Email address.'),
  phone: z.string().describe('Phone number.'),
  linkedin: z.string().describe('LinkedIn profile URL.'),
  website: z.string().describe('Personal portfolio or website URL.'),
  summary: z.string().describe('The professional summary or objective statement.'),
});

const ExperienceSchema = z.object({
  id: z.string().describe("A unique ID for the experience, e.g., 'exp1'"),
  jobTitle: z.string().describe('The job title.'),
  company: z.string().describe('The name of the company.'),
  location: z.string().describe('The location of the job.'),
  startDate: z.string().describe('The start date of the employment.'),
  endDate: z.string().describe('The end date of the employment.'),
  responsibilities: z.array(z.string()).describe('A list of responsibilities and achievements.'),
});

const EducationSchema = z.object({
  id: z.string().describe("A unique ID for the education entry, e.g., 'edu1'"),
  degree: z.string().describe('The degree or certificate obtained.'),
  institution: z.string().describe('The name of the institution.'),
  location: z.string().describe('The location of the institution.'),
  graduationDate: z.string().describe('The date of graduation.'),
});

const ParseResumePdfInputSchema = z.object({
  pdfDataUri: z
    .string()
    .describe(
      "A PDF file of a resume, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:application/pdf;base64,<encoded_data>'."
    ),
});
export type ParseResumePdfInput = z.infer<typeof ParseResumePdfInputSchema>;

const ParseResumePdfOutputSchema = z.object({
  personalInfo: PersonalInfoSchema.optional(),
  experience: z.array(ExperienceSchema).optional(),
  education: z.array(EducationSchema).optional(),
  skills: z.array(z.string()).optional().describe('A list of skills.'),
});
export type ParseResumePdfOutput = z.infer<typeof ParseResumePdfOutputSchema>;


export async function parseResumePdf(input: ParseResumePdfInput): Promise<ParseResumePdfOutput> {
  return parseResumePdfFlow(input);
}

const prompt = ai.definePrompt({
  name: 'parseResumePdfPrompt',
  input: {schema: ParseResumePdfInputSchema},
  output: {schema: ParseResumePdfOutputSchema},
  prompt: `You are an expert resume parser. Analyze the provided resume PDF and extract the content into a structured JSON format.
  Pay close attention to extracting all work experiences, education history, skills, and personal contact information.
  Generate a unique ID for each experience and education entry (e.g., 'exp1', 'edu1').
  
  Resume PDF: {{media url=pdfDataUri}}`,
});

const parseResumePdfFlow = ai.defineFlow(
  {
    name: 'parseResumePdfFlow',
    inputSchema: ParseResumePdfInputSchema,
    outputSchema: ParseResumePdfOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
