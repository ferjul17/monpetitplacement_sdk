import { z } from 'zod';

export const InvestProfileCategoriesInput = z.object({ token: z.string() });

export const InvestProfileCategoriesOutput = z.object({
  '@context': z.string(),
  '@id': z.string(),
  '@type': z.string(),
  'hydra:member': z.array(
    z.union([
      z.object({
        '@id': z.string(),
        '@type': z.string(),
        id: z.number(),
        name: z.string(),
        slug: z.string(),
        thematic: z.boolean().nullable(),
        position: z.unknown().nullable(),
        color: z.string(),
        description: z.string(),
        investProfiles: z.array(z.string()),
      }),
      z.object({
        '@id': z.string(),
        '@type': z.string(),
        id: z.number(),
        name: z.string(),
        slug: z.string(),
        thematic: z.boolean().nullable(),
        position: z.unknown().nullable(),
        color: z.string(),
        description: z.unknown().nullable().nullable(),
        investProfiles: z.array(z.string()),
      }),
    ])
  ),
  'hydra:totalItems': z.number(),
  'hydra:view': z.object({ '@id': z.string(), '@type': z.string() }).optional(),
});
