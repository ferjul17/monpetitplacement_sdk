import { z } from 'zod';

export const MeInput = z.object({
  token: z.string(),
});

export const MeOutput = z.object({
  '@context': z.string(),
  '@id': z.string(),
  '@type': z.string(),
  id: z.number(),
  username: z.string(),
  email: z.string(),
  isTest: z.boolean(),
  lastLogin: z.string(),
  roles: z.array(z.string()),
  firstname: z.string(),
  lastname: z.string(),
  gender: z.string(),
  phone: z.string(),
  cgvAccepted: z.boolean(),
  validatedAt: z.string(),
  birthdate: z.string(),
  nationality: z.string(),
  affiliateProvider: z
    .object({
      '@id': z.string(),
      '@type': z.string(),
      id: z.string(),
      name: z.string(),
      slug: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
    })
    .optional(),
  origin: z.string().optional(),
  viewPreference: z.string(),
  investmentAccounts: z
    .array(
      z.object({
        '@id': z.string(),
        '@type': z.string(),
        id: z.string(),
        status: z.string(),
        appointmentRequired: z.boolean(),
        reference: z.string().optional(),
        watermark: z.number(),
        watermarkedAt: z.string().optional(),
        providerProjectId: z.string().optional(),
        providerContractId: z.string().optional(),
        statusProvider: z.string().optional(),
        profile: z.string().optional(),
        incompatible: z.boolean(),
        effectiveDate: z.string().optional(),
        nextMonthlyPaymentDate: z.string().optional(),
        lastProviderKycUpdateAt: z.string().optional(),
        provider: z
          .array(
            z.object({
              '@id': z.string(),
              '@type': z.string(),
              id: z.string(),
              name: z.string(),
              slug: z.string(),
              position: z.string(),
              enabled: z.boolean(),
              minimumFirstInvestment: z.number(),
              minimumFirstInvestmentMonthly: z.number(),
              minimumInvestmentMonthly: z.number(),
              uuid: z.string(),
              createdAt: z.string(),
              updatedAt: z.string(),
            })
          )
          .or(
            z.object({
              '@id': z.string(),
              '@type': z.string(),
              id: z.string(),
              name: z.string(),
              slug: z.string(),
              position: z.string(),
              enabled: z.boolean(),
              minimumFirstInvestment: z.number(),
              minimumFirstInvestmentMonthly: z.number(),
              minimumInvestmentMonthly: z.number(),
              uuid: z.string(),
              createdAt: z.string(),
              updatedAt: z.string(),
            })
          ),
        hidden: z.boolean(),
        duration: z.number(),
        userKyc: z.string(),
        userKycs: z.array(z.string()),
        uuid: z.string(),
        createdAt: z.string(),
        updatedAt: z.string(),
      })
    )
    .optional(),
  userSensibleData: z.array(
    z.object({
      '@id': z.string(),
      '@type': z.string(),
      iban: z.string(),
      swift: z.string(),
      uuid: z.string(),
    })
  ),
  registrationReason: z.object({
    '@type': z.string(),
    '@id': z.string(),
    message: z.string(),
    persona: z.string(),
    id: z.string(),
  }),
  registrationReasonDetail: z.string(),
  universignCertifiedAt: z.string().optional(),
  crispId: z.string(),
  crispSegments: z.array(z.string()),
  uuid: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  affiliationLevel: z.string(),
  affiliationAlreadyClientUserCount: z.number(),
  affiliationTotalUserCount: z.number(),
  affiliationSavingsPercent: z.number(),
  affiliationSavingPercentWithoutGodChilds: z.number(),
});
