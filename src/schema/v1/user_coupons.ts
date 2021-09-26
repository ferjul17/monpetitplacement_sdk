import { z } from 'zod';

export const UserCouponsInput = z.object({
  userId: z.number(),
  token: z.string(),
});

export const UserCouponsOutput = z.object({
  '@context': z.string(),
  '@id': z.string(),
  '@type': z.string(),
  'hydra:member': z.array(
    z.object({
      '@id': z.string(),
      '@type': z.string(),
      id: z.string(),
      subscriptionOfferedAt: z.unknown().nullable(),
      discountUsedAt: z.unknown().nullable(),
      lastNotificationAt: z.unknown().nullable(),
      discountEndsAt: z.unknown().nullable(),
      reminderEndDiscountSent: z.boolean(),
      coupon: z.object({
        '@id': z.string(),
        '@type': z.string(),
        id: z.string(),
        code: z.string(),
        enabled: z.boolean(),
        subscriptionFree: z.boolean(),
        discountAmount: z.number(),
        sponsorshipFactor: z.number(),
        discountTimeInSeconds: z.unknown().nullable(),
        sponsor: z.string(),
        couponCategory: z.object({
          '@id': z.string(),
          '@type': z.string(),
          id: z.string(),
          slug: z.string(),
          name: z.string(),
          uuid: z.string(),
        }),
        translations: z.object({ fr: z.array(z.unknown()) }),
        name: z.string(),
        description: z.string(),
        slug: z.string(),
        uuid: z.string(),
        createdAt: z.string(),
        updatedAt: z.string(),
      }),
      order: z.unknown().nullable(),
      user: z.string(),
      uuid: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
      notifiable: z.boolean(),
      completed: z.boolean(),
    })
  ),
  'hydra:totalItems': z.number(),
  'hydra:view': z.object({ '@id': z.string(), '@type': z.string() }).optional(),
});
