/* eslint-disable no-console */
import prompt from 'prompt';
import 'dotenv/config';
import { ZodError } from 'zod';

import { logger } from './src/logger';

import { Api } from './src';
import { RemoteError } from './src/api';
import { isExternalError } from './src/errors';

const { USERNAME, PASSWORD } = process.env;
if (USERNAME === undefined) {
  throw new Error(`Missing en var "username".`);
}
if (PASSWORD === undefined) {
  throw new Error(`Missing en var "password".`);
}

function defaultHandler(err: RemoteError | ZodError) {
  logger.fatal(err);
}

(async () => {
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

  async function allActivatedEndpoints() {
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
  }

  logger.warn('Are you still waiting for a strategy ?');
  prompt.start();
  prompt.get(['strategyComplete'], async function onAnswer(err, result) {
    if (result.strategyComplete !== 'y') {
      return;
    }

    await allActivatedEndpoints();
  });
})().catch((e) => {
  defaultHandler(e);
  process.exit(-1);
});
