import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { z } from 'zod';
import { AuthenticationTokenInput, AuthenticationTokenOutput } from './schema/authentication-token';
import { UserKycsInput, UserKycsOutput } from './schema/v1/user_kycs';
import { AdviceInput, AdviceOutput } from './schema/v1/advice';
import {
  InvestProfileCategoriesInput,
  InvestProfileCategoriesOutput,
} from './schema/v1/invest_profile_categories';
import { InvestProfilesInput, InvestProfilesOutput } from './schema/v1/invest_profiles';
import { UserCouponsInput, UserCouponsOutput } from './schema/v1/user_coupons';
import {
  UserFinancialCapitalInput,
  UserFinancialCapitalOutput,
} from './schema/v1/user_financial_capital';
import { CouponsInput, CouponsOutput } from './schema/v1/coupons';
import {
  UserInvestmentAccountProductsInput,
  UserInvestmentAccountProductsOutput,
} from './schema/v1/user_investment_account_products';
import { AvailableProductsInput, AvailableProductsOutput } from './schema/v1/available_products';
import {
  UserInvestmentValuesInput,
  UserInvestmentValuesOutput,
} from './schema/v1/user_investment_values';
import { MeInput, MeOutput } from './schema/v1/me';

export class Api {
  readonly #axiosApi: AxiosInstance;

  readonly #axiosSso: AxiosInstance;

  public constructor(
    { apiBaseUrl, ssoBaseUrl }: { apiBaseUrl: string; ssoBaseUrl: string } = {
      apiBaseUrl: 'https://api.monpetitplacement.fr/',
      ssoBaseUrl: 'https://sso.monpetitplacement.fr/',
    }
  ) {
    this.#axiosApi = axios.create({ baseURL: apiBaseUrl });
    this.#axiosSso = axios.create({ baseURL: ssoBaseUrl });
  }

  public async login({
    username,
    password,
  }: z.infer<typeof AuthenticationTokenInput>): Promise<z.infer<typeof AuthenticationTokenOutput>> {
    const data = new URLSearchParams();
    data.set('grant_type', 'password');
    data.set('client_id', 'mpp-app');
    data.set('username', username);
    data.set('password', password);
    return this.#callSso(
      {
        method: 'POST',
        url: 'auth/realms/mpp-prod/protocol/openid-connect/token',
        data,
      },
      AuthenticationTokenOutput
    );
  }

  public async getMe({ token }: z.infer<typeof MeInput>): Promise<z.infer<typeof MeOutput>> {
    return this.#callApi(
      {
        method: 'GET',
        url: `v1/me`,
        headers: { Authorization: `Bearer ${token}` },
      },
      MeOutput
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

  public async getUserCoupons({
    token,
    userId,
  }: z.infer<typeof UserCouponsInput>): Promise<z.infer<typeof UserCouponsOutput>> {
    return this.#callApi(
      {
        method: 'GET',
        url: `v1/users/${userId}/user_coupons`,
        headers: { Authorization: `Bearer ${token}` },
      },
      UserCouponsOutput
    );
  }

  public async getCoupons({
    token,
    userId,
  }: z.infer<typeof CouponsInput>): Promise<z.infer<typeof CouponsOutput>> {
    return this.#callApi(
      {
        method: 'GET',
        url: `v1/users/${userId}/coupons`,
        headers: { Authorization: `Bearer ${token}` },
      },
      CouponsOutput
    );
  }

  public async getAdvice({
    token,
    adviceId,
  }: z.infer<typeof AdviceInput>): Promise<z.infer<typeof AdviceOutput>> {
    return this.#callApi(
      {
        method: 'GET',
        url: `v1/advice/${adviceId}`,
        headers: { Authorization: `Bearer ${token}` },
      },
      AdviceOutput
    );
  }

  public async getInvestProfileCategories({
    token,
  }: z.infer<typeof InvestProfileCategoriesInput>): Promise<
    z.infer<typeof InvestProfileCategoriesOutput>
  > {
    return this.#callApi(
      {
        method: 'GET',
        url: `v1/invest_profile_categories`,
        headers: { Authorization: `Bearer ${token}` },
      },
      InvestProfileCategoriesOutput
    );
  }

  public async getInvestProfiles({
    token,
  }: z.infer<typeof InvestProfilesInput>): Promise<z.infer<typeof InvestProfilesOutput>> {
    return this.#callApi(
      {
        method: 'GET',
        url: `v1/invest_profiles`,
        headers: { Authorization: `Bearer ${token}` },
      },
      InvestProfilesOutput
    );
  }

  public async getUserFinancialCapital({
    token,
    userInvestmentAccountId,
  }: z.infer<typeof UserFinancialCapitalInput>): Promise<
    z.infer<typeof UserFinancialCapitalOutput>
  > {
    return this.#callApi(
      {
        method: 'GET',
        url: `v1/user_investment_accounts/${userInvestmentAccountId}/user_financial_capital`,
        headers: { Authorization: `Bearer ${token}` },
      },
      UserFinancialCapitalOutput
    );
  }

  public async getUserInvestmentValuesInput({
    token,
    userInvestmentAccountId,
  }: z.infer<typeof UserInvestmentValuesInput>): Promise<
    z.infer<typeof UserInvestmentValuesOutput>
  > {
    return this.#callApi(
      {
        method: 'GET',
        url: `v1/user_investment_accounts/${userInvestmentAccountId}/user_investment_values`,
        headers: { Authorization: `Bearer ${token}` },
      },
      UserInvestmentValuesOutput
    );
  }

  public async getUserInvestmentAccountProducts({
    token,
    userInvestmentAccountId,
  }: z.infer<typeof UserInvestmentAccountProductsInput>): Promise<
    z.infer<typeof UserInvestmentAccountProductsOutput>
  > {
    return this.#callApi(
      {
        method: 'GET',
        url: `v1/user_investment_accounts/${userInvestmentAccountId}/user_investment_account_products`,
        headers: { Authorization: `Bearer ${token}` },
      },
      UserInvestmentAccountProductsOutput
    );
  }

  public async getAvailableProducts({
    token,
    userKycsId,
  }: z.infer<typeof AvailableProductsInput>): Promise<z.infer<typeof AvailableProductsOutput>> {
    return this.#callApi(
      {
        method: 'GET',
        url: `v1/user_kycs/${userKycsId}/available_products`,
        headers: { Authorization: `Bearer ${token}` },
      },
      AvailableProductsOutput
    );
  }

  static async #call<T>(
    axiosInstance: AxiosInstance,
    options: AxiosRequestConfig,
    type: z.ZodType<T>
  ): Promise<T> {
    const res = await axiosInstance.request(options);

    const output = await type.parseAsync(res.data);

    return output;
  }

  #callApi<T>(options: AxiosRequestConfig, type: z.ZodType<T>): Promise<T> {
    return Api.#call(this.#axiosApi, options, type);
  }

  #callSso<T>(options: AxiosRequestConfig, type: z.ZodType<T>): Promise<T> {
    return Api.#call(this.#axiosSso, options, type);
  }
}
