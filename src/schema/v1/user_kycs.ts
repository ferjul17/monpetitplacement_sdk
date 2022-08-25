import { z } from 'zod';

export const UserKycsInput = z.object({
  userId: z.number(),
  token: z.string(),
});

export const UserKycsOutput = z.object({
  '@context': z.string(),
  '@id': z.string(),
  '@type': z.string(),
  'hydra:member': z.array(
    z.object({
      '@id': z.string(),
      '@type': z.string(),
      id: z.string(),
      status: z.string(),
      currentStep: z.string(),
      lastNode: z.string(),
      advice: z
        .object({
          '@id': z.string(),
          '@type': z.string(),
          id: z.string(),
          status: z.string(),
          video: z.string(),
          inconsistent: z.boolean(),
          suggestedInvestmentAccountProvider: z.string(),
          format: z.string(),
          uuid: z.string(),
          createdAt: z.string(),
          updatedAt: z.string(),
        })
        .optional(),
      investmentAccount: z.string(),
      user: z.string(),
      userKycAnswers: z.array(
        z.object({
          '@id': z.string(),
          '@type': z.string(),
          id: z.string(),
          value: z.string().optional(),
          valid: z.boolean(),
          question: z.string(),
          answer: z.string().optional(),
          uuid: z.string(),
          createdAt: z.string(),
          updatedAt: z.string(),
        })
      ),
      fastAdvice: z.boolean(),
      universignTransactions: z.array(z.unknown()),
      uuid: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
      initialInvestmentFirst: z.number(),
      initialInvestmentMonthly: z.number(),
    })
  ),
  'hydra:totalItems': z.number(),
  'hydra:view': z.object({ '@id': z.string(), '@type': z.string() }).optional(),
});
