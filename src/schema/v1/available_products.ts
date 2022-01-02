import { z } from 'zod';

export const AvailableProductsInput = z.object({
  token: z.string(),
  userKycsId: z.number(),
});

export const AvailableProductsOutput = z.object({
  '@context': z.string(),
  '@id': z.string(),
  '@type': z.string(),
  'hydra:member': z.array(
    z.object({
      '@id': z.string(),
      '@type': z.string(),
      id: z.string(),
      position: z.string().nullable(),
      estimatedPerformance: z.number(),
      providerFeeRate: z.number().nullable(),
      providerFeeRetrocommissionRate: z.number().nullable(),
      name: z.string(),
      slug: z.string(),
      isin: z.string(),
      versiondate: z.string().nullable(),
      risk: z.string(),
      annualPerformance: z.number(),
      impactReport: z.string().nullable(),
      productProvider: z.string(),
      dici: z.string().nullable(),
      details: z.object({
        cumulated_performance: z.record(z.number()).nullable(),
        annualized_performance: z.record(z.number()),
      }),
      investmentAccountProvider: z.array(z.string()),
      uuid: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
      investProfiles: z.array(z.string()),
    })
  ),
  'hydra:totalItems': z.number(),
  'hydra:view': z.object({ '@id': z.string(), '@type': z.string() }).optional(),
});
