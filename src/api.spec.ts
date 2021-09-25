import faker from 'faker';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { z, ZodError } from 'zod';
import { Api } from './api';
import { UsersInput, UsersOutput } from './schema/v1/users';
import { UserKycsInput, UserKycsOutput } from './schema/v1/user_kycs';

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
});
