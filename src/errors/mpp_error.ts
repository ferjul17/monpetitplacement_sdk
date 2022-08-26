import { z } from 'zod';

export const MPPError = z.object({
  error: z.string(),
  error_description: z.string(),
});
