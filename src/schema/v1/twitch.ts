import { z } from 'zod';

export const MPPTwitchInput = z.object({
  token: z.string(),
});

export const MPPTwitchOutput = z.object({
  key: z.string(),
  readable: z.boolean(),
  value: z.object({
    isLive: z.boolean(),
  }),
});
