/* eslint-disable no-console */
import 'dotenv/config';
import { Api } from './src';

const { USERNAME, PASSWORD } = process.env;
if (USERNAME === undefined) {
  throw new Error(`Missing en var "username".`);
}
if (PASSWORD === undefined) {
  throw new Error(`Missing en var "password".`);
}

(async () => {
  const api = new Api();

  const { access_token: token } = await api.login({ username: USERNAME, password: PASSWORD });
  const user = await api.getMe({ token });

  const userId = user.id;
  const investProfileCategories = await api.getInvestProfileCategories({ token });
  const investProfiles = await api.getInvestProfiles({ token });
  const userCoupons = await api.getUserCoupons({ token, userId });
  const coupons = await api.getCoupons({ token, userId });
  const userKycs = await api.getUserKycs({ token, userId });
  try {
    const availableProducts = await Promise.all(
      userKycs['hydra:member'].map(
        ({ id }) => api.getAvailableProducts({ token, userKycsId: parseInt(id, 10) })
        // return 403 when account pending "strategy"
      )
    );
    const advices = await Promise.all(
      userKycs['hydra:member']
        .map(({ advice }) =>
          advice ? api.getAdvice({ token, adviceId: parseInt(advice.id, 10) }) : null
        )
        .filter(Boolean)
    );

    if (!user.investmentAccounts) {
      console.error('no investmentAccounts found');
      return;
    }

    const userFinancialCapitals = await Promise.all(
      user.investmentAccounts.map(({ id }) =>
        api.getUserFinancialCapital({ token, userInvestmentAccountId: parseInt(id, 10) })
      )
    );
    const userInvestmentValuesInput = await Promise.all(
      user.investmentAccounts.map(({ id }) =>
        api.getUserInvestmentValuesInput({ token, userInvestmentAccountId: parseInt(id, 10) })
      )
    );
    const userInvestmentAccountProducts = await Promise.all(
      user.investmentAccounts.map(({ id }) =>
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
    console.error('Unable to get available products, are you fully registered?'); // ,err);
  }
})().catch((e) => {
  console.error(e);
  process.exit(-1);
});
