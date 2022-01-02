import { z } from 'zod';

export const AuthenticationTokenInput = z.object({
  username: z.string().email(),
  password: z.string(),
});

export const AuthenticationTokenOutput = z.object({
  access_token: z.string(),
  expires_in: z.number(),
  'not-before-policy': z.number(),
  refresh_expires_in: z.number(),
  refresh_token: z.string(),
  scope: z.string(),
  session_state: z.string(),
  token_type: z.string(),
});
