import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { z } from 'zod';
import { AuthenticationTokenInput, AuthenticationTokenOutput } from './schema/authentication-token';
import { UsersInput, UsersOutput } from './schema/v1/users';
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

  async #callApi<T>(options: AxiosRequestConfig, type: z.ZodType<T>): Promise<T> {
    const res = await this.#axios.request(options);

    const output = await type.parseAsync(res.data);

    return output;
  }
}
