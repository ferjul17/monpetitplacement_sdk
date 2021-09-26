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
  const user = await api.getUser({ token, userId });
  const userKycs = await api.getUserKycs({ token, userId });
  const advices = await Promise.all(
    userKycs['hydra:member'].map(({ advice }) =>
      api.getAdvice({
        token,
        adviceId: parseInt(advice.id, 10),
      })
    )
  );
  console.log({ investProfileCategories, user, userKycs, advices });
})().catch((e) => {
  console.error(e);
  process.exit(-1);
});
