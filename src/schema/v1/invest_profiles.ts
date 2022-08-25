import { z } from 'zod';

export const InvestProfilesInput = z.object({ token: z.string() });

export const InvestProfilesOutput = z.object({
  '@context': z.string(),
  '@id': z.string(),
  '@type': z.string(),
  'hydra:member': z.array(
    z.object({
      '@id': z.string().or(z.number()),
      '@type': z.string(),
      id: z.string().or(z.number()),
      name: z.string(),
      slug: z.string(),
      thematic: z.boolean().nullable(),
      position: z.string().nullable(),
      minimumAmount: z.object({ apicil: z.number(), generali: z.number() }),
      investProfileCategory: z.object({
        '@id': z.string(),
        '@type': z.string(),
        id: z.number(),
        name: z.string(),
        slug: z.string(),
        thematic: z.boolean().nullable(),
        position: z.unknown().nullable(),
        color: z.string(),
        description: z.string().nullable(),
      }),
    })
  ),
  'hydra:totalItems': z.number(),
  'hydra:view': z.object({ '@id': z.string(), '@type': z.string() }).optional(),
});
