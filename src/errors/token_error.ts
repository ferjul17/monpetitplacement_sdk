import { z } from 'zod';

export const TokenError = z.object({
  type: z.string(),
  title: z.string(),
  detail: z.string(),
});
