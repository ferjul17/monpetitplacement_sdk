import { z } from 'zod';

export const UserInvestmentValuesInput = z.object({
  userInvestmentAccountId: z.number(),
  token: z.string(),
});

export const UserInvestmentValuesOutput = z.object({
  '@context': z.string(),
  '@id': z.string(),
  '@type': z.string(),
  'hydra:member': z.array(
    z.object({
      '@id': z.string(),
      '@type': z.string(),
      id: z.string(),
      type: z.string(),
      date: z.string(),
      amount: z.number(),
      unrealisedAmount: z.number().nullable(),
      averageAcquisitionAmount: z.unknown().nullable(),
      securityUnits: z.unknown().nullable(),
      performance: z.number().nullable(),
      investedAmount: z.number().nullable(),
      product: z.unknown().nullable(),
      userInvestmentAccount: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
      owner: z.string(),
    })
  ),
  'hydra:totalItems': z.number(),
  'hydra:view': z.object({ '@id': z.string(), '@type': z.string() }).optional(),
});
