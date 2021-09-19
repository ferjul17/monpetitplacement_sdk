import axios, { AxiosInstance } from 'axios';
import { z } from 'zod';
import { AuthenticationTokenInput, AuthenticationTokenOutput } from './schema/authentication-token';
import { UsersInput, UsersOutput } from './schema/v1/users';

export class Api {
  readonly #axios: AxiosInstance;

  public constructor(
    { baseUrl }: { baseUrl: string } = {
      baseUrl: 'https://api.monpetitplacement.fr/',
    }
  ) {
    this.#axios = axios.create({
      baseURL: baseUrl,
    });
  }

  public async login({
    username,
    password,
  }: z.infer<typeof AuthenticationTokenInput>): Promise<z.infer<typeof AuthenticationTokenOutput>> {
    const res = await this.#axios.post('authentication_token', {
      username,
      password,
    });

    const output = await AuthenticationTokenOutput.parseAsync(res.data);

    return output;
  }

  public async getUser({
    token,
    userId,
  }: z.infer<typeof UsersInput>): Promise<z.infer<typeof UsersOutput>> {
    const res = await this.#axios.get(`v1/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const output = await UsersOutput.parseAsync(res.data);

    return output;
  }
}
