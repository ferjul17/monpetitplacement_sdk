import { faker } from '@faker-js/faker';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { z, ZodError } from 'zod';
import { Api } from './api';
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
import { AvailableProductsInput, AvailableProductsOutput } from './schema/v1/available_products';
import {
  UserInvestmentValuesInput,
  UserInvestmentValuesOutput,
} from './schema/v1/user_investment_values';
import { MeInput, MeOutput } from './schema/v1/me';
import { AuthenticationTokenOutput } from './schema/authentication-token';

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
      const data = new URLSearchParams();
      data.set('grant_type', 'password');
      data.set('client_id', 'mpp-app');
      data.set('username', creds.username);
      data.set('password', creds.password);

      const mockedResponse: z.infer<typeof AuthenticationTokenOutput> = {
        access_token: faker.datatype.string(100),
        expires_in: 300,
        'not-before-policy': 0,
        refresh_expires_in: 3600,
        refresh_token: faker.datatype.string(100),
        scope: 'email profile',
        session_state: faker.datatype.uuid(),
        token_type: 'Bearer',
      };

      mockAxios.onPost().reply(200, mockedResponse);

      const response = await sdk.login(creds);

      expect(response).toEqual(mockedResponse);
      expect(mockAxios.history.post.length).toBe(1);
      expect(mockAxios.history.post[0]).toEqual(
        expect.objectContaining({
          data: data.toString(),
          url: 'auth/realms/mpp-prod/protocol/openid-connect/token',
        })
      );
    });
  });

  describe('getMe', () => {
    it('calls the api with the right parameters', async () => {
      const sdk = new Api();
      const input: z.infer<typeof MeInput> = {
        token: faker.datatype.string(100),
      };
      const userId = faker.datatype.number({ min: 1 });
      const mockedResponse: z.infer<typeof MeOutput> = {
        '@context': '/v1/contexts/User',
        '@id': `/v1/users/${userId}`,
        '@type': 'User',
        id: userId,
        username: faker.internet.email(),
        email: faker.internet.email(),
        isTest: faker.datatype.boolean(),
        lastLogin: faker.date.recent().toISOString(),
        roles: [],
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        gender: faker.helpers.arrayElement(['man', 'woman']),
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
        origin: faker.helpers.arrayElement(['Par la presse']),
        viewPreference: faker.helpers.arrayElement(['invest-profile']),
        investmentAccounts: [],
        universignCertifiedAt: faker.date.past().toISOString(),
        crispId: faker.datatype.uuid(),
        crispSegments: [],
        uuid: faker.datatype.uuid(),
        createdAt: faker.date.past().toISOString(),
        updatedAt: faker.date.recent().toISOString(),
        affiliationLevel: faker.helpers.arrayElement(['Beginner']),
        affiliationAlreadyClientUserCount: faker.datatype.number(),
        affiliationTotalUserCount: faker.datatype.number(),
        affiliationSavingsPercent: faker.datatype.number(),
        userSensibleData: [
          {
            '@id': `/v1/user_sensible_datas/${faker.datatype.number({ min: 1 })}`,
            '@type': 'UserSensibleData',
            iban: faker.finance.iban(),
            swift: faker.finance.bic(),
            uuid: faker.datatype.uuid(),
          },
        ],
      };
      mockAxios.onGet().reply(200, mockedResponse);

      const response = await sdk.getMe(input);

      expect(response).toEqual(mockedResponse);
      expect(mockAxios.history.get.length).toBe(1);
      expect(mockAxios.history.get[0]).toEqual(
        expect.objectContaining({
          headers: expect.objectContaining({ Authorization: `Bearer ${input.token}` }),
          url: `v1/me`,
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
        status: faker.helpers.arrayElement(['pending']),
        advisor: {
          '@id': `/v1/users/${faker.datatype.number()}`,
          '@type': 'User',
          id: faker.datatype.number(),
          firstname: faker.name.firstName(),
          gender: faker.helpers.arrayElement(['man', 'woman']),
          picture: faker.internet.url(),
          calendlyCalendarUrl: faker.internet.url(),
        },
        video: faker.datatype.string(),
        inconsistent: faker.datatype.boolean(),
        suggestedInvestmentAccountProvider: faker.datatype.string(),
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

  describe('getUserInvestmentValuesInput', () => {
    it('calls the api with the right parameters', async () => {
      const sdk = new Api();
      const input: z.infer<typeof UserInvestmentValuesInput> = {
        token: faker.datatype.string(100),
        userInvestmentAccountId: faker.datatype.number(),
      };
      const mockedResponse: z.infer<typeof UserInvestmentValuesOutput> = {
        '@context': '/v1/contexts/UserInvestmentValues',
        '@id': `/v1/user_investment_accounts/${input.userInvestmentAccountId}/user_investment_values`,
        '@type': 'hydra:Collection',
        'hydra:member': [],
        'hydra:totalItems': 0,
      };
      mockAxios.onGet().reply(200, mockedResponse);

      const response = await sdk.getUserInvestmentValuesInput(input);

      expect(response).toEqual(mockedResponse);
      expect(mockAxios.history.get.length).toBe(1);
      expect(mockAxios.history.get[0]).toEqual(
        expect.objectContaining({
          headers: expect.objectContaining({ Authorization: `Bearer ${input.token}` }),
          url: `v1/user_investment_accounts/${input.userInvestmentAccountId}/user_investment_values`,
        })
      );
    });
  });

  describe('getAvailableProducts', () => {
    it('calls the api with the right parameters', async () => {
      const sdk = new Api();
      const input: z.infer<typeof AvailableProductsInput> = {
        token: faker.datatype.string(100),
        userKycsId: faker.datatype.number(),
      };
      const mockedResponse: z.infer<typeof AvailableProductsOutput> = {
        '@context': '/v1/contexts/Products',
        '@id': '/v1/products',
        '@type': 'hydra:Collection',
        'hydra:member': [],
        'hydra:totalItems': 0,
      };
      mockAxios.onGet().reply(200, mockedResponse);

      const response = await sdk.getAvailableProducts(input);

      expect(response).toEqual(mockedResponse);
      expect(mockAxios.history.get.length).toBe(1);
      expect(mockAxios.history.get[0]).toEqual(
        expect.objectContaining({
          headers: expect.objectContaining({ Authorization: `Bearer ${input.token}` }),
          url: `v1/user_kycs/${input.userKycsId}/available_products`,
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
