import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { z } from 'zod';
import { AuthenticationTokenInput, AuthenticationTokenOutput } from './schema/authentication-token';
import { UsersInput, UsersOutput } from './schema/v1/users';
import { UserKycsInput, UserKycsOutput } from './schema/v1/user_kycs';

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
    return this.#callApi(
      {
        method: 'POST',
        url: 'authentication_token',
        data: { username, password },
      },
      AuthenticationTokenOutput
    );
  }

  public async getUser({
    token,
    userId,
  }: z.infer<typeof UsersInput>): Promise<z.infer<typeof UsersOutput>> {
    return this.#callApi(
      {
        method: 'GET',
        url: `v1/users/${userId}`,
        headers: { Authorization: `Bearer ${token}` },
      },
      UsersOutput
    );
  }

  public async getUserKycs({
    token,
    userId,
  }: z.infer<typeof UserKycsInput>): Promise<z.infer<typeof UserKycsOutput>> {
    return this.#callApi(
      {
        method: 'GET',
        url: `v1/users/${userId}/user_kycs`,
        headers: { Authorization: `Bearer ${token}` },
      },
      UserKycsOutput
    );
  }

  async #callApi<T>(options: AxiosRequestConfig, type: z.ZodType<T>): Promise<T> {
    const res = await this.#axios.request(options);

    const output = await type.parseAsync(res.data);

    return output;
  }
}
