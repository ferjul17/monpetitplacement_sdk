import { z } from 'zod';

export const UserInvestmentAccountInput = z.object({
  userInvestmentAccountId: z.string(),
  token: z.string(),
});

export const UserInvestmentAccountOutput = z.object({
  '@context': z.string(),
  '@id': z.string(),
  '@type': z.string(),
  advice: z.array(z.string()),
  appointmentRequired: z.boolean(),
  createdAt: z.string(),
  duration: z.number(),
  hidden: z.boolean(),
  id: z.string(),
  incompatible: z.boolean(),
  provider: z.string(),
  status: z.string(),
  updatedAt: z.string(),
  user: z.string(),
  userInvestmentAccountCallBack: z.array(z.string()),
  userKyc: z.string(),
  userKycs: z.array(z.string()),
  uuid: z.string(),
  watermark: z.number(),
});
