import { z } from 'zod';

export const GetConsultingAnalysisInput = z.object({
  token: z.string(),
  userKycsId: z.number(),
});

export const GetConsultingAnalaysisOutput = z.array(
  z.object({
    amount: z.number(),
    funds: z.array(
      z.object({
        amount: z.number(),
        dici: z.string(),
        isin: z.string(),
        name: z.string(),
        percent: z.number(),
        slug: z.string(),
        type: z.string(),
      })
    ),
    name: z.string(),
    percent: z.number(),
    slug: z.string(),
    type: z.string(),
  })
);
