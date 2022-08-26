import { z } from 'zod';

export const GetInvestProfileInput = z.object({
  profile: z.string(),
});

export const GetInvestProfileOutput = z.object({
  history: z.record(z.number()),
});
