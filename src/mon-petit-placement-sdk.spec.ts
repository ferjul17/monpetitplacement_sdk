import faker from 'faker';
import { MonPetitPlacementSdk } from './mon-petit-placement-sdk';

describe('MonPetitPlacementSdk', () => {
  describe('login', () => {
    it('works', async () => {
      const sdk = new MonPetitPlacementSdk();

      await expect(
        sdk.login({
          username: faker.internet.email(),
          password: faker.internet.password(),
        })
      ).resolves.toEqual({});
    });
  });
});
