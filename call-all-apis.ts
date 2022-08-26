/* eslint-disable no-console */
// eslint-disable-next-line import/no-extraneous-dependencies
import prompt from 'prompt';
import 'dotenv/config';

import { logger } from './logger';

import { Api } from './src';
import { isExternalError } from './src/errors';

async function retrieveCreds() {
  let { USERNAME, PASSWORD } = process.env;
  if (USERNAME === undefined) {
    const response = await prompt.get(['username']);
    USERNAME = response.username as string;
    if (USERNAME) {
      throw new Error(`Missing env var "username".`);
    }
  }
  if (PASSWORD === undefined) {
    const response = await prompt.get(['password']);
    PASSWORD = response.password as string;
    if (!PASSWORD) {
      throw new Error(`Missing env var "password".`);
    }
  }

  return {
    USERNAME,
    PASSWORD,
  };
}

(async () => {
  const { USERNAME, PASSWORD } = await retrieveCreds();
  const api = new Api();

  const res = await api.login({ username: USERNAME, password: PASSWORD });
  if (isExternalError(res)) {
    logger.fatal('login error', res);
    return;
  }

  const token = res.access_token;

  const user = await api.getMe({ token });
  if (isExternalError(user)) {
    logger.fatal('getMe error', res);
    return;
  }

  const profileNames = ['volontaire', 'energique', 'ambitieux', 'intrepide'];

  const publicInvestorProfiles = profileNames.map((profile) => {
    return api.getInvestProfileHistory({
      profile,
    });
  });

  const profiles = await Promise.all(publicInvestorProfiles);

  logger.warn({
    action: 'login',
    username: USERNAME,
  });

  const userId = user.id;
  const investProfileCategories = await api.getInvestProfileCategories({ token });
  const investProfiles = await api.getInvestProfiles({ token });
  const userCoupons = await api.getUserCoupons({ token, userId });
  const coupons = await api.getCoupons({ token, userId });
  const userKycs = await api.getUserKycs({ token, userId });

  if (isExternalError(userKycs)) {
    logger.fatal('getUserKycs error', userKycs);
    return;
  }

  const members = userKycs['hydra:member'];

  if (!user.investmentAccounts) {
    logger.error({
      message: 'no investmentAccounts found',
      user,
    });
    return;
  }

  const advicesDTO = await Promise.all(
    user.investmentAccounts?.map((investmentAccount) => {
      return api.getAdviceDTO({
        token,
        userInvestmentAccountId: parseInt(investmentAccount.id, 10),
      });
    })
  );

  // Below doesn't work if no strategy in account
  const activeInvestmentAccounts = user.investmentAccounts.filter(
    (investmentAccount) => investmentAccount.status !== 'pending'
  );

  if (!activeInvestmentAccounts.length) {
    logger.error({
      message: 'No active investment accounts found',
      accounts: user.investmentAccounts,
    });
    return;
  }

  logger.warn('Are you still waiting for a strategy ?');
  prompt.start();
  const response = await prompt.get(['strategyComplete']);
  if (response.strategyComplete !== 'y') {
    return;
  }

  const advices = await Promise.all(
    members.map((adviceId) => api.getAdvice({ token, adviceId: parseInt(adviceId.id, 10) }))
  );
  if (advices && !advices.length) {
    logger.warn('No advices found');
  }

  // below is denied for inactive investment accounts
  const availableProducts = await Promise.all(
    members.map(({ id }) => api.getAvailableProducts({ token, userKycsId: parseInt(id, 10) }))
  );

  const userFinancialCapitals = await Promise.all(
    activeInvestmentAccounts.map(({ id }) =>
      api.getUserFinancialCapital({ token, userInvestmentAccountId: parseInt(id, 10) })
    )
  );

  const userInvestmentValuesInput = await Promise.all(
    activeInvestmentAccounts.map(({ id }) =>
      api.getUserInvestmentValuesInput({ token, userInvestmentAccountId: parseInt(id, 10) })
    )
  );

  const userInvestmentAccountProducts = await Promise.all(
    activeInvestmentAccounts.map(({ id }) =>
      api.getUserInvestmentAccountProducts({ token, userInvestmentAccountId: parseInt(id, 10) })
    )
  );
  logger.info({
    profiles,
    investProfileCategories,
    investProfiles,
    user,
    userCoupons,
    coupons,
    userKycs,
    advicesDTO,
    advices,
    availableProducts,
    userFinancialCapitals,
    userInvestmentValuesInput,
    userInvestmentAccountProducts,
  });
})().catch((e) => {
  logger.fatal(e);
  process.exit(-1);
});
