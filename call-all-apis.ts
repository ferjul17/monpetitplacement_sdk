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
  const user = await api.getUser({ token, userId });
  const userKycs = await api.getUserKycs({ token, userId });
  console.log({ user, userKycs });
})().catch((e) => {
  console.error(e);
  process.exit(-1);
});
