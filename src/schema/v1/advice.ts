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
  video: z.string(),
  inconsistent: z.boolean(),
  suggestedInvestmentAccountProvider: z.string(),
  uuid: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const AdviceWaitingVideoInput = z.object({
  token: z.string(),
});

export const AdviceWaitingVideoOutput = z.object({
  key: z.string(),
  readable: z.boolean(),
  value: z.object({
    videoId: z.number(),
  }),
});
