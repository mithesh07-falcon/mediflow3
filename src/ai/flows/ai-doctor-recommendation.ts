'use server';
/**
 * @fileOverview An AI agent that recommends specialist doctors based on patient symptoms.
 *
 * - aiDoctorRecommendation - A function that handles the AI doctor recommendation process.
 * - AIDoctorRecommendationInput - The input type for the aiDoctorRecommendation function.
 * - AIDoctorRecommendationOutput - The return type for the aiDoctorRecommendation function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AIDoctorRecommendationInputSchema = z.object({
  symptoms: z.string().describe('A detailed description of the patient\'s symptoms.'),
});
export type AIDoctorRecommendationInput = z.infer<typeof AIDoctorRecommendationInputSchema>;

const AIDoctorRecommendationOutputSchema = z.object({
  recommendedSpecialist: z.string().describe('The name of the recommended specialist doctor.'),
  reason: z.string().describe('A brief explanation for the recommendation.'),
});
export type AIDoctorRecommendationOutput = z.infer<typeof AIDoctorRecommendationOutputSchema>;

export async function aiDoctorRecommendation(input: AIDoctorRecommendationInput): Promise<AIDoctorRecommendationOutput> {
  return aiDoctorRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiDoctorRecommendationPrompt',
  input: { schema: AIDoctorRecommendationInputSchema },
  output: { schema: AIDoctorRecommendationOutputSchema },
  prompt: `You are a clinical triage assistant for MediFlow Hospital. 
Analyze the symptoms provided and recommend the most appropriate specialist from the following list:
- ENT (for ear, nose, throat, hearing, sinus issues)
- Gastroenterology (for stomach, digestion, abdominal pain, gastric issues)
- Neurology (for brain, nerves, headaches, dizziness, tremors)
- Cardiology (for heart, chest pain, palpitations, blood pressure)
- Ophthalmology (for eyes, vision, eye irritation)
- Pediatrics (if the patient is a child or has childhood-specific issues)

Rules:
1. If the symptoms include "ear pain", "ear blockage", or "hearing issues", you MUST recommend ENT.
2. If the symptoms include "stomach ache", "heartburn", or "gastric", you MUST recommend Gastroenterology.
3. Be concise in your reason.

Symptoms: {{{symptoms}}}`,
});

const aiDoctorRecommendationFlow = ai.defineFlow(
  {
    name: 'aiDoctorRecommendationFlow',
    inputSchema: AIDoctorRecommendationInputSchema,
    outputSchema: AIDoctorRecommendationOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
