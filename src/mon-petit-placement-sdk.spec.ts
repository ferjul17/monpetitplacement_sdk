import faker from 'faker';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { MonPetitPlacementSdk } from './mon-petit-placement-sdk';

describe('MonPetitPlacementSdk', () => {
  let mockAxios: AxiosMockAdapter;

  beforeEach(() => {
    mockAxios = new AxiosMockAdapter(axios);
  });

  describe('login', () => {
    it('calls the api with the right parameters', async () => {
      const sdk = new MonPetitPlacementSdk();
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
          roles: ['ROLE_USER', 'ROLE_TEST'],
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
          investmentAccounts: [
            {
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
                minimumFirstInvestmentMonthly: faker.datatype
                  .number()
                  .toString(),
                minimumInvestmentMonthly: faker.datatype.number().toString(),
                walletProvider: [],
                uuid: faker.datatype.uuid(),
                createdAt: faker.date.past().toISOString(),
                updatedAt: faker.date.recent().toISOString(),
              },
              uuid: faker.datatype.uuid(),
              createdAt: faker.date.past().toISOString(),
              updatedAt: faker.date.recent().toISOString(),
            },
          ],
          language: [],
          universignCertifiedAt: faker.date.past().toISOString(),
          bankinToken: null,
          crispId: faker.datatype.uuid(),
          crispSegments: ['client', 'co-pilote', 'vid\u00e9o perso', 'apicil'],
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
});
