import { config } from 'dotenv';
config();

import '@/ai/flows/match-job-description.ts';
import '@/ai/flows/learn-from-user-edits.ts';
import '@/ai/flows/generate-resume-content.ts';
import '@/ai/flows/suggest-keywords.ts';