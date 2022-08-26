import { z } from 'zod';

// Really interesting type ;)
export const UserAdviceInvestmentFund = z.object({
  '@context': z.object({
    '@vocab': z.string(),
    amount: z.string(),
    dici: z.string(),
    hydra: z.string(),
    isin: z.string(),
    name: z.string(),
    percent: z.string(),
    slug: z.string(),
    type: z.string(),
  }),
  '@id': z.string(),
  '@type': z.string(),
  amount: z.number(),
  dici: z.string(),
  isin: z.string(),
  name: z.string(),
  percent: z.number(),
  slug: z.string(),
  type: z.string(),
});

export const UserAdviceDTOInput = z.object({
  token: z.string(),
  userInvestmentAccountId: z.number(),
});

export const UserAdviceDTOOutput = z.object({
  '@context': z.object({
    '@vocab': z.string(),
    adviceId: z.string(),
    advisor: z.string(),
    hydra: z.string(),
    introVideoLinkProvided: z.string(),
    mppChoice: z.string(),
    provider: z.string(),
    userChoice: z.string(),
    video: z.string(),
  }),
  '@id': z.string(),
  '@type': z.string(),
  adviceId: z.string(),
  advisor: z.object({
    '@context': z.string(),
    '@id': z.string(),
    '@type': z.string(),
    calendlyCalendarUrl: z.string(),
    firstname: z.string(),
    lastname: z.string(),
  }),
  introVideoLinkProvided: z.boolean(),
  mppChoice: z.object({
    '@context': z.object({
      '@vocab': z.string(),
      automatic: z.string(),
      hydra: z.string(),
      inconsistent: z.string(),
      initialAmount: z.string(),
      initialDistribution: z.string(),
      monthlyAmount: z.string(),
      monthlyDistribution: z.string(),
      splitDuration: z.string(),
      trustLevel: z.string(),
    }),
    '@id': z.string(),
    '@type': z.string(),
    automatic: z.boolean(),
    inconsistent: z.boolean(),
    initialAmount: z.number(),
    initialDistribution: z.array(
      z.object({
        '@context': z.object({
          '@vocab': z.string(),
          amount: z.string(),
          funds: z.string(),
          hydra: z.string(),
          name: z.string(),
          percent: z.string(),
          slug: z.string(),
          type: z.string(),
        }),
        '@id': z.string(),
        '@type': z.string(),
        amount: z.number(),
        funds: z.array(UserAdviceInvestmentFund),
        name: z.string(),
        percent: z.number(),
        slug: z.string(),
        type: z.string(),
      })
    ),
    monthlyAmount: z.number(),
    monthlyDistribution: z.array(
      z.object({
        '@context': z.object({
          '@vocab': z.string(),
          amount: z.string(),
          funds: z.string(),
          hydra: z.string(),
          name: z.string(),
          percent: z.string(),
          slug: z.string(),
          type: z.string(),
        }),
        '@id': z.string(),
        '@type': z.string(),
        amount: z.number(),
        funds: z.array(UserAdviceInvestmentFund),
        name: z.string(),
        percent: z.number(),
        slug: z.string(),
        type: z.string(),
      })
    ),
    splitDuration: z.number(),
  }),
  provider: z.string(),
});
