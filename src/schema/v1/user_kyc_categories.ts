import { z } from 'zod';

export const UserKycCategoryInput = z.object({
  token: z.string(),
});

export const UserKycCategoryOutput = z.object({
  '@context': z.string(),
  '@id': z.string(),
  '@type': z.string(),
  'hydra:member': z.array(
    z.object({
      '@id': z.string(),
      '@type': z.string(),
      createdAt: z.string(),
      id: z.string(),
      position: z.string(),
      name: z.string(),
      slug: z.string(),
      updatedAt: z.string(),
      uuid: z.string(),
    })
  ),
  'hydra:totalItems': z.number(),
});
