import { z } from 'zod';

export const InvestmentAccount = z.object({
  id: z.string(),
  status: z.string(),
  reference: z.string(),
  watermark: z.number(),
  watermarkedAt: z.string(),
  error: z.unknown().nullable(),
  refusedSource: z.unknown().nullable(),
  providerProjectId: z.string(),
  providerContractId: z.string(),
  statusProvider: z.string(),
  profile: z.string(),
  incompatible: z.boolean(),
  effectiveDate: z.string(),
  nextMonthlyPaymentDate: z.string(),
  lastProviderKycUpdateAt: z.string(),
  provider: z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
    position: z.string(),
    enabled: z.boolean(),
    publicationMode: z.unknown().nullable(),
    publishOn: z.unknown().nullable(),
    unpublishOn: z.unknown().nullable(),
    minimumFirstInvestment: z.string(),
    minimumFirstInvestmentMonthly: z.string(),
    minimumInvestmentMonthly: z.string(),
    walletProvider: z.array(z.unknown()),
    uuid: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
  uuid: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const InvestmentAccountWithView = InvestmentAccount.extend({
  '@id': z.string(),
  '@type': z.string(),
  provider: InvestmentAccount.shape.provider.extend({
    '@id': z.string(),
    '@type': z.string(),
  }),
});
