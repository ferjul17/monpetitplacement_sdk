import { z } from 'zod';

export const UserFinancialCapitalInput = z.object({
  userInvestmentAccountId: z.number(),
  token: z.string(),
});

export const UserFinancialCapitalOutput = z.object({
  '@context': z.string(),
  '@id': z.string(),
  '@type': z.string(),
  id: z.string(),
  amount: z.number(),
  performance: z.number(),
  numberPendingOperations: z.number(),
  buyAmount: z.number(),
  sellAmount: z.number(),
  exchangeAmount: z.number(),
  effectiveDate: z.string(),
  totalInvestAmount: z.number(),
  initialInvestmentPending: z.boolean(),
  operationValuatedAt: z.unknown().nullable(),
  isBeingDailyProcessed: z.boolean(),
});
