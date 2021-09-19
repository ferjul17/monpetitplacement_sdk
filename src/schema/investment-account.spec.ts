import { z } from 'zod';
import faker from 'faker';
import { InvestmentAccount, InvestmentAccountWithView } from './investment-account';

export const InvestmentAccountMockedResponse = (): z.infer<typeof InvestmentAccount> => ({
  id: faker.datatype.number().toString(),
  status: faker.helpers.randomize(['active']),
  reference: faker.datatype.number().toString(),
  watermark: faker.datatype.number(),
  watermarkedAt: faker.date.recent().toISOString(),
  error: null,
  refusedSource: null,
  providerProjectId: faker.datatype.number().toString(),
  providerContractId: faker.datatype.number().toString(),
  statusProvider: faker.helpers.randomize(['Contrat ouvert']),
  profile: faker.helpers.randomize(['co-pilot']),
  incompatible: faker.datatype.boolean(),
  effectiveDate: faker.date.recent().toISOString(),
  nextMonthlyPaymentDate: faker.date.soon().toISOString(),
  lastProviderKycUpdateAt: faker.date.recent().toISOString(),
  provider: {
    id: faker.datatype.number().toString(),
    name: 'Apicil',
    slug: 'apicil',
    position: faker.datatype.number().toString(),
    enabled: faker.datatype.boolean(),
    publicationMode: null,
    publishOn: null,
    unpublishOn: null,
    minimumFirstInvestment: faker.datatype.number().toString(),
    minimumFirstInvestmentMonthly: faker.datatype.number().toString(),
    minimumInvestmentMonthly: faker.datatype.number().toString(),
    walletProvider: [],
    uuid: faker.datatype.uuid(),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
  },
  uuid: faker.datatype.uuid(),
  createdAt: faker.date.past().toISOString(),
  updatedAt: faker.date.recent().toISOString(),
});

export const InvestmentAccountWithViewMockedResponse = (): z.infer<
  typeof InvestmentAccountWithView
> => {
  const investmentAccount = InvestmentAccountMockedResponse();

  return {
    ...investmentAccount,
    '@id': `/v1/user_investment_accounts/${investmentAccount.id}`,
    '@type': 'UserInvestmentAccounts',
    provider: {
      ...investmentAccount.provider,
      '@id': '/v1/investment_account_providers/apicil',
      '@type': 'InvestmentAccountProviders',
    },
  };
};
