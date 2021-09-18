import axios, { AxiosInstance } from 'axios';
import { z } from 'zod';
import {
  AuthenticationTokenInput,
  AuthenticationTokenOutput,
} from './schema/authentication-token';

export class MonPetitPlacementSdk {
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
  }: z.infer<typeof AuthenticationTokenInput>): Promise<
    z.infer<typeof AuthenticationTokenOutput>
  > {
    const res = await this.#axios.post('authentication_token', {
      username,
      password,
    });

    const output = await AuthenticationTokenOutput.parseAsync(res.data);

    return output;
  }
}
