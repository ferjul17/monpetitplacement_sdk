/* eslint-disable no-console */
import axios, { AxiosError } from 'axios';
import 'dotenv/config';
import { Api } from './src';

const { USERNAME, PASSWORD } = process.env;
if (USERNAME === undefined) {
  throw new Error(`Missing en var "username".`);
}
if (PASSWORD === undefined) {
  throw new Error(`Missing en var "password".`);
}

function handleError(err: AxiosError | Error) {
  if (axios.isAxiosError(err)) {
    console.error(
      err.code,
      err.config.baseURL && err.config.url ? err.config.baseURL + err.config.url : '',
      err.response?.data
    );
    return;
  }

  console.error('unknown error', err);
}

async function parseKYCS(
  token: string,
  api: Api,
  kycs: Awaited<ReturnType<Api['getUserKycs']>>['hydra:member']
) {
  const advicePromises = [];
  for (let index = 0, l = kycs.length; index < l; index += 1) {
    const advice = kycs[index];
    if (!advice) {
      // eslint-disable-next-line no-continue
      continue;
    }

    advicePromises.push(api.getAdvice({ token, adviceId: parseInt(advice.id, 10) }));
  }

  return Promise.all(advicePromises);
}

(async () => {
  const api = new Api();

  console.warn('login as', USERNAME);
  const { access_token: token } = await api.login({ username: USERNAME, password: PASSWORD });
  const user = await api.getMe({ token });

  const userId = user.id;
  const investProfileCategories = await api.getInvestProfileCategories({ token });
  const investProfiles = await api.getInvestProfiles({ token });
  const userCoupons = await api.getUserCoupons({ token, userId });
  const coupons = await api.getCoupons({ token, userId });
  const userKycs = await api.getUserKycs({ token, userId });

  // console.debug(investProfileCategories, investProfiles, userCoupons, coupons, userKycs);
  const kycs = userKycs['hydra:member'];

  // Below doesn't work if no strategy in account
  try {
    const advices = await parseKYCS(token, api, kycs);
    if (!advices) {
      console.warn('No advices found');
    }

    if (!user.investmentAccounts) {
      console.error('no investmentAccounts found', user.firstname);
      return;
    }

    const activeInvestmentAccounts = user.investmentAccounts.filter(
      (investmentAccount) => investmentAccount.status !== 'pending'
    );

    if (!activeInvestmentAccounts.length) {
      console.error('No active investment accounts found');
      return;
    }

    const availableProducts = await Promise.all(
      userKycs['hydra:member'].map(({ id }) =>
        api.getAvailableProducts({ token, userKycsId: parseInt(id, 10) })
      )
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
    console.log({
      investProfileCategories,
      investProfiles,
      user,
      userCoupons,
      coupons,
      userKycs,
      availableProducts,
      advices,
      userFinancialCapitals,
      userInvestmentValuesInput,
      userInvestmentAccountProducts,
    });
  } catch (err) {
    if (err instanceof Error || err instanceof AxiosError) {
      handleError(err);
      return;
    }

    console.error('Error while calling apis', err);
  }
})().catch((e) => {
  console.error(e);
  process.exit(-1);
});
