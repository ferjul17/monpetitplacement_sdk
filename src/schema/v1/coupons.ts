import { z } from 'zod';

export const CouponsInput = z.object({
  userId: z.number(),
  token: z.string(),
});

export const CouponsOutput = z.object({
  '@context': z.string(),
  '@id': z.string(),
  '@type': z.string(),
  'hydra:member': z.array(
    z.object({
      '@id': z.string(),
      '@type': z.string(),
      id: z.string(),
      code: z.string(),
      enabled: z.boolean(),
      subscriptionFree: z.boolean(),
      discountAmount: z.number(),
      sponsorshipFactor: z.number(),
      userCoupons: z.array(z.unknown()),
      sponsor: z.object({
        '@id': z.string(),
        '@type': z.string(),
        id: z.number(),
        username: z.string(),
        email: z.string(),
        firstname: z.string(),
        lastname: z.string(),
        gender: z.string(),
        validatedAt: z.string(),
        uuid: z.string(),
        createdAt: z.string(),
        updatedAt: z.string(),
      }),
      couponCategory: z.object({
        '@id': z.string(),
        '@type': z.string(),
        id: z.string(),
        slug: z.string(),
        name: z.string(),
        uuid: z.string(),
      }),
      uuid: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
    })
  ),
  'hydra:totalItems': z.number(),
  'hydra:view': z.object({ '@id': z.string(), '@type': z.string() }).optional(),
});
