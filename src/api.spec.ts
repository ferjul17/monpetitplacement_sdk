import faker from 'faker';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { z, ZodError } from 'zod';
import { Api } from './api';
import { UsersInput, UsersOutput } from './schema/v1/users';
import { UserKycsInput, UserKycsOutput } from './schema/v1/user_kycs';
import { AdviceInput, AdviceOutput } from './schema/v1/advice';
import {
  InvestProfileCategoriesInput,
  InvestProfileCategoriesOutput,
} from './schema/v1/invest_profile_categories';
import { InvestProfilesInput, InvestProfilesOutput } from './schema/v1/invest_profiles';
import { UserCouponsInput, UserCouponsOutput } from './schema/v1/user_coupons';
import {
  UserFinancialCapitalInput,
  UserFinancialCapitalOutput,
} from './schema/v1/user_financial_capital';
import { CouponsInput, CouponsOutput } from './schema/v1/coupons';
import {
  UserInvestmentAccountProductsInput,
  UserInvestmentAccountProductsOutput,
} from './schema/v1/user_investment_account_products';

describe('Api', () => {
  let mockAxios: AxiosMockAdapter;

  beforeEach(() => {
    mockAxios = new AxiosMockAdapter(axios);
  });

  it('throws a ZodError in case the output does not match the expected interface', async () => {
    const sdk = new Api();
    mockAxios.onPost().reply(200, null as any);

    await expect(sdk.login({ username: '', password: '' })).rejects.toEqual(expect.any(ZodError));
  });

  describe('login', () => {
    it('calls the api with the right parameters', async () => {
      const sdk = new Api();
      const creds = {
        username: faker.internet.email(),
        password: faker.internet.password(),
      };
      const mockedResponse = {
        token: faker.datatype.string(100),
        user: {
          id: faker.datatype.number(),
          username: faker.internet.email(),
          email: faker.internet.email(),
          enabled: faker.datatype.boolean(),
          isTest: faker.datatype.boolean(),
          lastLogin: faker.date.recent().toISOString(),
          passwordRequestedAt: null,
          roles: [],
          firstname: faker.name.firstName(),
          lastname: faker.name.lastName(),
          gender: faker.helpers.randomize(['man', 'woman']),
          phone: faker.phone.phoneNumber(),
          cgvAccepted: faker.datatype.boolean(),
          validatedAt: faker.date.recent().toISOString(),
          birthdate: faker.date.past().toISOString(),
          trackingToken: null,
          nationality: null,
          nif: null,
          affiliateProvider: {
            id: faker.datatype.number().toString(),
            name: faker.datatype.string(),
            slug: faker.datatype.string(),
            createdAt: faker.date.past().toISOString(),
            updatedAt: faker.date.recent().toISOString(),
          },
          lydiaToken: null,
          origin: faker.helpers.randomize(['Par la presse']),
          goal: null,
          viewPreference: faker.helpers.randomize(['invest-profile']),
          investmentAccounts: [],
          language: [],
          universignCertifiedAt: faker.date.past().toISOString(),
          bankinToken: null,
          crispId: faker.datatype.uuid(),
          crispSegments: [],
          uuid: faker.datatype.uuid(),
          createdAt: faker.date.past().toISOString(),
          updatedAt: faker.date.recent().toISOString(),
          affiliationLevel: faker.helpers.randomize(['Beginner']),
          affiliationAlreadyClientUserCount: faker.datatype.number(),
          affiliationTotalUserCount: faker.datatype.number(),
          affiliationSavingsPercent: faker.datatype.number(),
        },
      };

      mockAxios.onPost().reply(200, mockedResponse);

      const response = await sdk.login(creds);

      expect(response).toEqual(mockedResponse);
      expect(mockAxios.history.post.length).toBe(1);
      expect(mockAxios.history.post[0]).toEqual(
        expect.objectContaining({
          data: JSON.stringify(creds),
          url: 'authentication_token',
        })
      );
    });
  });

  describe('getUser', () => {
    it('calls the api with the right parameters', async () => {
      const sdk = new Api();
      const input: z.infer<typeof UsersInput> = {
        token: faker.datatype.string(100),
        userId: faker.datatype.number(),
      };
      const mockedResponse: z.infer<typeof UsersOutput> = {
        '@context': '/v1/contexts/User',
        '@id': `/v1/users/${input.userId}`,
        '@type': 'User',
        id: input.userId,
        username: faker.internet.email(),
        email: faker.internet.email(),
        enabled: faker.datatype.boolean(),
        isTest: faker.datatype.boolean(),
        lastLogin: faker.date.recent().toISOString(),
        roles: [],
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        gender: faker.helpers.randomize(['man', 'woman']),
        phone: faker.phone.phoneNumber(),
        cgvAccepted: faker.datatype.boolean(),
        validatedAt: faker.date.past().toISOString(),
        birthdate: faker.date.past().toISOString(),
        affiliateProvider: {
          '@id': `/v1/affiliate_providers/${faker.datatype.number().toString()}`,
          '@type': 'AffiliateProviders',
          id: faker.datatype.number().toString(),
          name: faker.datatype.string(),
          slug: faker.datatype.string(),
          createdAt: faker.date.past().toISOString(),
          updatedAt: faker.date.recent().toISOString(),
        },
        origin: faker.helpers.randomize(['Par la presse']),
        viewPreference: faker.helpers.randomize(['invest-profile']),
        investmentAccounts: [],
        language: [],
        universignCertifiedAt: faker.date.past().toISOString(),
        crispId: faker.datatype.uuid(),
        crispSegments: [],
        uuid: faker.datatype.uuid(),
        createdAt: faker.date.past().toISOString(),
        updatedAt: faker.date.recent().toISOString(),
        affiliationLevel: faker.helpers.randomize(['Beginner']),
        affiliationAlreadyClientUserCount: faker.datatype.number(),
        affiliationTotalUserCount: faker.datatype.number(),
        affiliationSavingsPercent: faker.datatype.number(),
      };
      mockAxios.onGet().reply(200, mockedResponse);

      const response = await sdk.getUser(input);

      expect(response).toEqual(mockedResponse);
      expect(mockAxios.history.get.length).toBe(1);
      expect(mockAxios.history.get[0]).toEqual(
        expect.objectContaining({
          headers: expect.objectContaining({ Authorization: `Bearer ${input.token}` }),
          url: `v1/users/${input.userId}`,
        })
      );
    });
  });

  describe('getUserKycs', () => {
    it('calls the api with the right parameters', async () => {
      const sdk = new Api();
      const input: z.infer<typeof UserKycsInput> = {
        token: faker.datatype.string(100),
        userId: faker.datatype.number(),
      };
      const mockedResponse: z.infer<typeof UserKycsOutput> = {
        '@context': '/v1/contexts/UserKycs',
        '@id': '/v1/users/32036/user_kycs',
        '@type': 'hydra:Collection',
        'hydra:member': [],
        'hydra:totalItems': 1,
      };
      mockAxios.onGet().reply(200, mockedResponse);

      const response = await sdk.getUserKycs(input);

      expect(response).toEqual(mockedResponse);
      expect(mockAxios.history.get.length).toBe(1);
      expect(mockAxios.history.get[0]).toEqual(
        expect.objectContaining({
          headers: expect.objectContaining({ Authorization: `Bearer ${input.token}` }),
          url: `v1/users/${input.userId}/user_kycs`,
        })
      );
    });
  });

  describe('getUserCoupons', () => {
    it('calls the api with the right parameters', async () => {
      const sdk = new Api();
      const input: z.infer<typeof UserCouponsInput> = {
        token: faker.datatype.string(100),
        userId: faker.datatype.number(),
      };
      const mockedResponse: z.infer<typeof UserCouponsOutput> = {
        '@context': '/v1/contexts/UserCoupons',
        '@id': `/v1/users/${input.userId}/user_coupons`,
        '@type': 'hydra:Collection',
        'hydra:member': [],
        'hydra:totalItems': 0,
        'hydra:view': {
          '@id': `/v1/users/${input.userId}/user_coupons?cache-version=0`,
          '@type': 'hydra:PartialCollectionView',
        },
      };
      mockAxios.onGet().reply(200, mockedResponse);

      const response = await sdk.getUserCoupons(input);

      expect(response).toEqual(mockedResponse);
      expect(mockAxios.history.get.length).toBe(1);
      expect(mockAxios.history.get[0]).toEqual(
        expect.objectContaining({
          headers: expect.objectContaining({ Authorization: `Bearer ${input.token}` }),
          url: `v1/users/${input.userId}/user_coupons`,
        })
      );
    });
  });

  describe('getCoupons', () => {
    it('calls the api with the right parameters', async () => {
      const sdk = new Api();
      const input: z.infer<typeof CouponsInput> = {
        token: faker.datatype.string(100),
        userId: faker.datatype.number(),
      };
      const mockedResponse: z.infer<typeof CouponsOutput> = {
        '@context': '/v1/contexts/Coupons',
        '@id': `/v1/users/${input.userId}/coupons`,
        '@type': 'hydra:Collection',
        'hydra:member': [],
        'hydra:totalItems': 0,
        'hydra:view': {
          '@id': `/v1/users/${input.userId}/coupons?cache-version=0`,
          '@type': 'hydra:PartialCollectionView',
        },
      };
      mockAxios.onGet().reply(200, mockedResponse);

      const response = await sdk.getCoupons(input);

      expect(response).toEqual(mockedResponse);
      expect(mockAxios.history.get.length).toBe(1);
      expect(mockAxios.history.get[0]).toEqual(
        expect.objectContaining({
          headers: expect.objectContaining({ Authorization: `Bearer ${input.token}` }),
          url: `v1/users/${input.userId}/coupons`,
        })
      );
    });
  });

  describe('getAdvice', () => {
    it('calls the api with the right parameters', async () => {
      const sdk = new Api();
      const input: z.infer<typeof AdviceInput> = {
        token: faker.datatype.string(100),
        adviceId: faker.datatype.number(),
      };
      const mockedResponse: z.infer<typeof AdviceOutput> = {
        '@context': '/v1/contexts/Advice',
        '@id': `/v1/advice/${input.adviceId}`,
        '@type': 'Advice',
        id: `${input.adviceId}`,
        status: faker.helpers.randomize(['pending']),
        advisor: {
          '@id': `/v1/users/${faker.datatype.number()}`,
          '@type': 'User',
          id: faker.datatype.number(),
          firstname: faker.name.firstName(),
          gender: faker.helpers.randomize(['man', 'woman']),
          picture: faker.internet.url(),
          calendlyCalendarUrl: faker.internet.url(),
        },
        language: [],
        video: faker.datatype.string(),
        generalAdvice: faker.datatype.string(),
        buyAdvice: faker.datatype.string(),
        sellAdvice: faker.datatype.string(),
        dashboardAdvice: faker.datatype.string(),
        inconsistent: faker.datatype.boolean(),
        suggestedInvestmentAccountProvider: faker.datatype.string(),
        suggestedAdvicePackage: {
          '@id': faker.datatype.string(),
          '@type': faker.datatype.string(),
          id: faker.datatype.number(),
          slug: faker.datatype.string(),
          enabled: faker.datatype.boolean(),
          position: faker.datatype.number(),
          title: faker.datatype.string(),
          subtitle: faker.datatype.string(),
          description: faker.datatype.string(),
          picture: faker.datatype.string(),
          bulletPoints: [],
          ctaText: faker.datatype.string(),
          defaultAdviceSubpackage: {
            '@id': faker.datatype.string(),
            '@type': faker.datatype.string(),
            id: faker.datatype.number(),
            slug: faker.datatype.string(),
            enabled: faker.datatype.boolean(),
            position: faker.datatype.number(),
            title: faker.datatype.string(),
            subtitle: faker.datatype.string(),
            description: faker.datatype.string(),
            picture: faker.datatype.string(),
            ctaText: faker.datatype.string(),
            waitingAdviceVideo: faker.datatype.string(),
            genericVideo: faker.datatype.string(),
          },
        },
        selectedAdvicePackage: {
          '@id': faker.datatype.string(),
          '@type': faker.datatype.string(),
          id: faker.datatype.number(),
          slug: faker.datatype.string(),
          enabled: faker.datatype.boolean(),
          position: faker.datatype.number(),
          title: faker.datatype.string(),
          subtitle: faker.datatype.string(),
          description: faker.datatype.string(),
          picture: faker.datatype.string(),
          bulletPoints: [],
          ctaText: faker.datatype.string(),
          defaultAdviceSubpackage: {
            '@id': faker.datatype.string(),
            '@type': faker.datatype.string(),
            id: faker.datatype.number(),
            slug: faker.datatype.string(),
            enabled: faker.datatype.boolean(),
            position: faker.datatype.number(),
            title: faker.datatype.string(),
            subtitle: faker.datatype.string(),
            description: faker.datatype.string(),
            picture: faker.datatype.string(),
            ctaText: faker.datatype.string(),
            waitingAdviceVideo: faker.datatype.string(),
            genericVideo: faker.datatype.string(),
          },
        },
        suggestedAdviceSubpackage: {
          '@id': faker.datatype.string(),
          '@type': faker.datatype.string(),
          id: faker.datatype.number(),
          slug: faker.datatype.string(),
          enabled: faker.datatype.boolean(),
          position: faker.datatype.number(),
          title: faker.datatype.string(),
          subtitle: faker.datatype.string(),
          description: faker.datatype.string(),
          picture: faker.datatype.string(),
          ctaText: faker.datatype.string(),
          waitingAdviceVideo: faker.datatype.string(),
        },
        selectedAdviceSubpackage: {
          '@id': faker.datatype.string(),
          '@type': faker.datatype.string(),
          id: faker.datatype.number(),
          slug: faker.datatype.string(),
          enabled: faker.datatype.boolean(),
          position: faker.datatype.number(),
          title: faker.datatype.string(),
          subtitle: faker.datatype.string(),
          description: faker.datatype.string(),
          picture: faker.datatype.string(),
          ctaText: faker.datatype.string(),
          waitingAdviceVideo: faker.datatype.string(),
        },
        uuid: faker.datatype.uuid(),
        createdAt: faker.date.past().toISOString(),
        updatedAt: faker.date.past().toISOString(),
      };
      mockAxios.onGet().reply(200, mockedResponse);

      const response = await sdk.getAdvice(input);

      expect(response).toEqual(mockedResponse);
      expect(mockAxios.history.get.length).toBe(1);
      expect(mockAxios.history.get[0]).toEqual(
        expect.objectContaining({
          headers: expect.objectContaining({ Authorization: `Bearer ${input.token}` }),
          url: `v1/advice/${input.adviceId}`,
        })
      );
    });
  });

  describe('getInvestProfileCategories', () => {
    it('calls the api with the right parameters', async () => {
      const sdk = new Api();
      const input: z.infer<typeof InvestProfileCategoriesInput> = {
        token: faker.datatype.string(100),
      };
      const mockedResponse: z.infer<typeof InvestProfileCategoriesOutput> = {
        '@context': '/v1/contexts/InvestProfileCategory',
        '@id': '/v1/invest_profile_categories',
        '@type': 'hydra:Collection',
        'hydra:member': [],
        'hydra:totalItems': 0,
        'hydra:view': {
          '@id': '/v1/invest_profile_categories?cache-version=0',
          '@type': 'hydra:PartialCollectionView',
        },
      };
      mockAxios.onGet().reply(200, mockedResponse);

      const response = await sdk.getInvestProfileCategories(input);

      expect(response).toEqual(mockedResponse);
      expect(mockAxios.history.get.length).toBe(1);
      expect(mockAxios.history.get[0]).toEqual(
        expect.objectContaining({
          headers: expect.objectContaining({ Authorization: `Bearer ${input.token}` }),
          url: `v1/invest_profile_categories`,
        })
      );
    });
  });

  describe('getInvestProfiles', () => {
    it('calls the api with the right parameters', async () => {
      const sdk = new Api();
      const input: z.infer<typeof InvestProfilesInput> = {
        token: faker.datatype.string(100),
      };
      const mockedResponse: z.infer<typeof InvestProfilesOutput> = {
        '@context': '/v1/contexts/InvestProfile',
        '@id': '/v1/invest_profiles',
        '@type': 'hydra:Collection',
        'hydra:member': [],
        'hydra:totalItems': 0,
        'hydra:view': {
          '@id': '/v1/invest_profiles?cache-version=0',
          '@type': 'hydra:PartialCollectionView',
        },
      };
      mockAxios.onGet().reply(200, mockedResponse);

      const response = await sdk.getInvestProfiles(input);

      expect(response).toEqual(mockedResponse);
      expect(mockAxios.history.get.length).toBe(1);
      expect(mockAxios.history.get[0]).toEqual(
        expect.objectContaining({
          headers: expect.objectContaining({ Authorization: `Bearer ${input.token}` }),
          url: `v1/invest_profiles`,
        })
      );
    });
  });

  describe('getUserFinancialCapital', () => {
    it('calls the api with the right parameters', async () => {
      const sdk = new Api();
      const input: z.infer<typeof UserFinancialCapitalInput> = {
        token: faker.datatype.string(100),
        userInvestmentAccountId: faker.datatype.number(),
      };
      const mockedResponse: z.infer<typeof UserFinancialCapitalOutput> = {
        '@context': '/v1/contexts/UserFinancialCapital',
        '@id': `/v1/user_financial_capitals/${input.userInvestmentAccountId}`,
        '@type': 'UserFinancialCapital',
        id: `${input.userInvestmentAccountId}`,
        amount: faker.datatype.number(),
        performance: faker.datatype.number(),
        numberPendingOperations: faker.datatype.number(),
        buyAmount: faker.datatype.number(),
        sellAmount: faker.datatype.number(),
        exchangeAmount: faker.datatype.number(),
        effectiveDate: faker.date.recent().toISOString(),
        totalInvestAmount: faker.datatype.number(),
        initialInvestmentPending: faker.datatype.boolean(),
        operationValuatedAt: null,
        isBeingDailyProcessed: faker.datatype.boolean(),
      };
      mockAxios.onGet().reply(200, mockedResponse);

      const response = await sdk.getUserFinancialCapital(input);

      expect(response).toEqual(mockedResponse);
      expect(mockAxios.history.get.length).toBe(1);
      expect(mockAxios.history.get[0]).toEqual(
        expect.objectContaining({
          headers: expect.objectContaining({ Authorization: `Bearer ${input.token}` }),
          url: `v1/user_investment_accounts/${input.userInvestmentAccountId}/user_financial_capital`,
        })
      );
    });
  });

  describe('getUserInvestmentAccountProducts', () => {
    it('calls the api with the right parameters', async () => {
      const sdk = new Api();
      const input: z.infer<typeof UserInvestmentAccountProductsInput> = {
        token: faker.datatype.string(100),
        userInvestmentAccountId: faker.datatype.number(),
      };
      const mockedResponse: z.infer<typeof UserInvestmentAccountProductsOutput> = {
        '@context': '/v1/contexts/UserInvestmentAccountProduct',
        '@id': `/v1/user_investment_accounts/${input.userInvestmentAccountId}/user_investment_account_products`,
        '@type': 'hydra:Collection',
        'hydra:member': [],
        'hydra:view': {
          '@id': `/v1/user_investment_accounts/${input.userInvestmentAccountId}/user_investment_account_products`,
          '@type': 'hydra:PartialCollectionView',
        },
        'hydra:search': {
          '@type': 'hydra:IriTemplate',
          'hydra:template': `/v1/user_investment_accounts/${input.userInvestmentAccountId}/user_investmen...`,
          'hydra:variableRepresentation': 'BasicRepresentation',
          'hydra:mapping': [],
        },
      };
      mockAxios.onGet().reply(200, mockedResponse);

      const response = await sdk.getUserInvestmentAccountProducts(input);

      expect(response).toEqual(mockedResponse);
      expect(mockAxios.history.get.length).toBe(1);
      expect(mockAxios.history.get[0]).toEqual(
        expect.objectContaining({
          headers: expect.objectContaining({ Authorization: `Bearer ${input.token}` }),
          url: `v1/user_investment_accounts/${input.userInvestmentAccountId}/user_investment_account_products`,
        })
      );
    });
  });
});
