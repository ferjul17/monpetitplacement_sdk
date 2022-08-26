import { z } from 'zod';

export const UserInvestmentAccountProvidersInput = z.object({
  provider: z.string(),
  token: z.string(),
});

export const UserInvestmentAccountProvidersOutput = z.object({
  '@context': z.string(),
  '@id': z.string(),
  '@type': z.string(),
  id: z.string(),
  name: z.string(),
  slug: z.string(),
});
