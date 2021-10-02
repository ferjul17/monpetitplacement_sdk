import { Api } from './src';

const { username, password } = process.env;
if (username === undefined) {
  throw new Error(`Missing en var "username".`);
}
if (password === undefined) {
  throw new Error(`Missing en var "password".`);
}

(async () => {
  const api = new Api();
  const {
    token,
    user: { id: userId },
  } = await api.login({ username, password });
  const investProfileCategories = await api.getInvestProfileCategories({ token });
  const investProfiles = await api.getInvestProfiles({ token });
  const user = await api.getUser({ token, userId });
  const userCoupons = await api.getUserCoupons({ token, userId });
  const coupons = await api.getCoupons({ token, userId });
  const userKycs = await api.getUserKycs({ token, userId });
  const advices = await Promise.all(
    userKycs['hydra:member'].map(({ advice }) =>
      api.getAdvice({ token, adviceId: parseInt(advice.id, 10) })
    )
  );
  const userFinancialCapitals = await Promise.all(
    user.investmentAccounts.map(({ id }) =>
      api.getUserFinancialCapital({ token, userInvestmentAccountId: parseInt(id, 10) })
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
    advices,
    userFinancialCapitals,
    userInvestmentAccountProducts,
  });
})().catch((e) => {
  console.error(e);
  process.exit(-1);
});
