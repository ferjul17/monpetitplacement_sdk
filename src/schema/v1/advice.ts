import { z } from 'zod';

export const AdviceInput = z.object({
  adviceId: z.number(),
  token: z.string(),
});

export const AdviceOutput = z.object({
  '@context': z.string(),
  '@id': z.string(),
  '@type': z.string(),
  id: z.string(),
  status: z.string(),
  advisor: z.object({
    '@id': z.string(),
    '@type': z.string(),
    id: z.number(),
    firstname: z.string(),
    gender: z.string(),
    picture: z.string(),
    calendlyCalendarUrl: z.string(),
  }),
  language: z.array(z.unknown()),
  video: z.string(),
  generalAdvice: z.string(),
  buyAdvice: z.string(),
  sellAdvice: z.string(),
  dashboardAdvice: z.string(),
  inconsistent: z.boolean(),
  suggestedInvestmentAccountProvider: z.string(),
  suggestedAdvicePackage: z.object({
    '@id': z.string(),
    '@type': z.string(),
    id: z.number(),
    slug: z.string(),
    enabled: z.boolean(),
    position: z.number(),
    title: z.string(),
    subtitle: z.string(),
    description: z.string(),
    picture: z.string(),
    bulletPoints: z.array(z.string()),
    ctaText: z.string(),
    defaultAdviceSubpackage: z.object({
      '@id': z.string(),
      '@type': z.string(),
      id: z.number(),
      slug: z.string(),
      enabled: z.boolean(),
      position: z.number(),
      title: z.string(),
      subtitle: z.string(),
      description: z.string(),
      picture: z.string(),
      ctaText: z.string(),
      waitingAdviceVideo: z.string(),
      genericVideo: z.string(),
    }),
  }),
  selectedAdvicePackage: z.object({
    '@id': z.string(),
    '@type': z.string(),
    id: z.number(),
    slug: z.string(),
    enabled: z.boolean(),
    position: z.number(),
    title: z.string(),
    subtitle: z.string(),
    description: z.string(),
    picture: z.string(),
    bulletPoints: z.array(z.string()),
    ctaText: z.string(),
    defaultAdviceSubpackage: z.object({
      '@id': z.string(),
      '@type': z.string(),
      id: z.number(),
      slug: z.string(),
      enabled: z.boolean(),
      position: z.number(),
      title: z.string(),
      subtitle: z.string(),
      description: z.string(),
      picture: z.string(),
      ctaText: z.string(),
      waitingAdviceVideo: z.string(),
      genericVideo: z.string(),
    }),
  }),
  suggestedAdviceSubpackage: z.object({
    '@id': z.string(),
    '@type': z.string(),
    id: z.number(),
    slug: z.string(),
    enabled: z.boolean(),
    position: z.number(),
    title: z.string(),
    subtitle: z.string(),
    description: z.string(),
    picture: z.string(),
    ctaText: z.string(),
    waitingAdviceVideo: z.string(),
  }),
  selectedAdviceSubpackage: z.object({
    '@id': z.string(),
    '@type': z.string(),
    id: z.number(),
    slug: z.string(),
    enabled: z.boolean(),
    position: z.number(),
    title: z.string(),
    subtitle: z.string(),
    description: z.string(),
    picture: z.string(),
    ctaText: z.string(),
    waitingAdviceVideo: z.string(),
  }),
  uuid: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
