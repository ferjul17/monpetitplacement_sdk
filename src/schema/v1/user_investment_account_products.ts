import { z } from 'zod';

export const UserInvestmentAccountProductsInput = z.object({
  userInvestmentAccountId: z.number(),
  token: z.string(),
});

export const UserInvestmentAccountProductsOutput = z.object({
  '@context': z.string(),
  '@id': z.string(),
  '@type': z.string(),
  'hydra:member': z.array(
    z.object({
      '@id': z.string(),
      '@type': z.string(),
      id: z.string(),
      productId: z.number(),
      name: z.string(),
      investProfileCategories: z.array(z.string()),
      amount: z.number(),
      pendingTransaction: z.boolean(),
      performance: z.number(),
      securityUnits: z.number(),
      averageAcquisitionAmount: z.number(),
    })
  ),
  'hydra:view': z.object({ '@id': z.string(), '@type': z.string() }).optional(),
  'hydra:search': z.object({
    '@type': z.string(),
    'hydra:template': z.string(),
    'hydra:variableRepresentation': z.string(),
    'hydra:mapping': z.array(
      z.object({
        '@type': z.string(),
        variable: z.string(),
        property: z.string(),
        required: z.boolean(),
      })
    ),
  }),
});
