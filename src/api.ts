/* eslint-disable class-methods-use-this */
import { Headers, fetch, RequestInit } from 'undici';
import { z } from 'zod';

import { AuthenticationTokenInput, AuthenticationTokenOutput } from './schema/authentication-token';
import { UserKycsInput, UserKycsOutput } from './schema/v1/user_kycs';
import {
  AdviceInput,
  AdviceOutput,
  AdviceWaitingVideoInput,
  AdviceWaitingVideoOutput,
} from './schema/v1/advice';
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
import {
  UserInvestmentAccountProvidersInput,
  UserInvestmentAccountProvidersOutput,
} from './schema/v1/user_investment_account_providers';
import {
  UserInvestmentAccountInput,
  UserInvestmentAccountOutput,
} from './schema/v1/user_investment_account';
import { UserKycCategoryInput, UserKycCategoryOutput } from './schema/v1/user_kyc_categories';
import { UserKycQuestionsInput, UserKycQuestionsOutput } from './schema/v1/user_kyc_questions';
import {
  UserAdviceDTOInput,
  UserAdviceDTOOutput,
} from './schema/v1/user_investment_account_advice_dto';
import { MPPTwitchInput, MPPTwitchOutput } from './schema/v1/twitch';
import {
  GetConsultingAnalaysisOutput,
  GetConsultingAnalysisInput,
} from './schema/v1/consulting_analysis';
import { GetInvestProfileInput, GetInvestProfileOutput } from './schema/v1/public_invest_profile';

const kApiBaseURL = 'https://api.monpetitplacement.fr/';
const kSsoBaseURL = 'https://sso.monpetitplacement.fr/';
const kPublicBaseURL = 'https://www.monpetitplacement.fr/';

type MPPFacade = 'api' | 'sso' | 'public';

export function baseURLForFacade(facade: MPPFacade): string {
  switch (facade) {
    case 'api':
      return kApiBaseURL;
    case 'sso':
      return kSsoBaseURL;
    case 'public':
      return kPublicBaseURL;
    default:
      throw new Error(`Unexpected facade ${facade}`);
  }
}

export class Api {
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
      'auth/realms/mpp-prod/protocol/openid-connect/token',
      {
        method: 'POST',
        headers: {},
        body: data,
      },
      AuthenticationTokenOutput
    );
  }

  public async getMe({ token }: z.infer<typeof MeInput>): Promise<z.infer<typeof MeOutput>> {
    return this.#callApi(
      `v1/me`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
      MeOutput
    );
  }

  public async getTwitch({
    token,
  }: z.infer<typeof MPPTwitchInput>): Promise<z.infer<typeof MPPTwitchOutput>> {
    return this.#callApi(
      `v1/settings/twitch.json`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
      MPPTwitchOutput
    );
  }

  public async getAdviceWaitingVideo({
    token,
  }: z.infer<typeof AdviceWaitingVideoInput>): Promise<z.infer<typeof AdviceWaitingVideoOutput>> {
    return this.#callApi(
      `v1/settings/advice-waiting-video.json`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
      AdviceWaitingVideoOutput
    );
  }

  public async getUserKycs({
    token,
    userId,
  }: z.infer<typeof UserKycsInput>): Promise<z.infer<typeof UserKycsOutput>> {
    return this.#callApi(
      `v1/users/${userId}/user_kycs`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
      UserKycsOutput
    );
  }

  public async getAdviceDTO({
    token,
    userInvestmentAccountId,
  }: z.infer<typeof UserAdviceDTOInput>): Promise<z.infer<typeof UserAdviceDTOOutput>> {
    return this.#callApi(
      `v1/user_investment_accounts/${userInvestmentAccountId}/advice_dto`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
      UserAdviceDTOOutput
    );
  }

  public async getKycQuestions({
    token,
    provider,
  }: z.infer<typeof UserKycQuestionsInput>): Promise<z.infer<typeof UserKycQuestionsOutput>> {
    return this.#callApi(
      `v1/investment_account_providers/${provider}/kyc_questions`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
      UserKycQuestionsOutput
    );
  }

  public async getKycCategories({
    token,
  }: z.infer<typeof UserKycCategoryInput>): Promise<z.infer<typeof UserKycCategoryOutput>> {
    return this.#callApi(
      `v1/kyc_categories`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
      UserKycCategoryOutput
    );
  }

  public async getUserCoupons({
    token,
    userId,
  }: z.infer<typeof UserCouponsInput>): Promise<z.infer<typeof UserCouponsOutput>> {
    return this.#callApi(
      `v1/users/${userId}/user_coupons`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
      UserCouponsOutput
    );
  }

  public async getCoupons({
    token,
    userId,
  }: z.infer<typeof CouponsInput>): Promise<z.infer<typeof CouponsOutput>> {
    return this.#callApi(
      `v1/users/${userId}/coupons`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
      CouponsOutput
    );
  }

  public async getAdvice({
    token,
    adviceId,
  }: z.infer<typeof AdviceInput>): Promise<z.infer<typeof AdviceOutput>> {
    return this.#callApi(
      `v1/advice/${adviceId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
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
      `v1/invest_profile_categories`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
      InvestProfileCategoriesOutput
    );
  }

  public async getInvestProfiles({
    token,
  }: z.infer<typeof InvestProfilesInput>): Promise<z.infer<typeof InvestProfilesOutput>> {
    return this.#callApi(
      `v1/invest_profiles`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
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
      `v1/user_investment_accounts/${userInvestmentAccountId}/user_financial_capital`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
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
      `v1/user_investment_accounts/${userInvestmentAccountId}/user_investment_values`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
      UserInvestmentValuesOutput
    );
  }

  public async getUserInvestmentAccountProviders({
    token,
    provider,
  }: z.infer<typeof UserInvestmentAccountProvidersInput>): Promise<
    z.infer<typeof UserInvestmentAccountProvidersOutput>
  > {
    return this.#callApi(
      `v1/investment_account_providers/${provider}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
      UserInvestmentAccountProvidersOutput
    );
  }

  public async getUserInvestmentAccount({
    token,
    userInvestmentAccountId,
  }: z.infer<typeof UserInvestmentAccountInput>): Promise<
    z.infer<typeof UserInvestmentAccountOutput>
  > {
    return this.#callApi(
      `v1/user_investment_accounts/${userInvestmentAccountId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
      UserInvestmentAccountOutput
    );
  }

  public async getUserInvestmentAccountProducts({
    token,
    userInvestmentAccountId,
  }: z.infer<typeof UserInvestmentAccountProductsInput>): Promise<
    z.infer<typeof UserInvestmentAccountProductsOutput>
  > {
    return this.#callApi(
      `v1/user_investment_accounts/${userInvestmentAccountId}/user_investment_account_products`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
      UserInvestmentAccountProductsOutput
    );
  }

  public async getAvailableProducts({
    token,
    userKycsId,
  }: z.infer<typeof AvailableProductsInput>): Promise<z.infer<typeof AvailableProductsOutput>> {
    return this.#callApi(
      `v1/user_kycs/${userKycsId}/available_products`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
      AvailableProductsOutput
    );
  }

  public async getInvestProfileHistory({
    profile,
  }: z.infer<typeof GetInvestProfileInput>): Promise<z.infer<typeof GetInvestProfileOutput>> {
    return this.#callPublicApi(
      `invest-profile/history/${profile}`,
      {
        method: 'POST',
        body: null,
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-language': 'en-US,en;q=0.9,fr-FR;q=0.8,fr;q=0.7',
          'content-type': 'application/json;charset=utf-8',
          'sec-ch-ua': '"Chromium";v="107", "Not=A?Brand";v="24"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'x-requested-with': 'XMLHttpRequest',
          Referer: 'https://www.monpetitplacement.fr/fr/portefeuilles/volontaire',
          'Referrer-Policy': 'strict-origin-when-cross-origin',
        },
      },
      GetInvestProfileOutput
    ).catch((err) => {
      return err;
    });
  }

  public async getInitialConsultingAnalysis({
    token,
    userKycsId,
  }: z.infer<typeof GetConsultingAnalysisInput>): Promise<
    z.infer<typeof GetConsultingAnalaysisOutput>
  > {
    return this.#callApi(
      `v1/user_kycs/${userKycsId}/consulting_analysis/initial`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
      GetConsultingAnalaysisOutput
    );
  }

  public async getMonthlyConsultingAnalysis({
    token,
    userKycsId,
  }: z.infer<typeof GetConsultingAnalysisInput>): Promise<
    z.infer<typeof GetConsultingAnalaysisOutput>
  > {
    return this.#callApi(
      `v1/user_kycs/${userKycsId}/consulting_analysis/monthly`,
      {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }),
      },
      GetConsultingAnalaysisOutput
    );
  }

  static async #call<T>(
    facade: MPPFacade,
    path: string,
    options: RequestInit,
    type: z.ZodType<T>
  ): Promise<T> {
    const stringBody = JSON.stringify(options.body);
    const endpoint = baseURLForFacade(facade).concat(path);
    const res = await fetch(endpoint, {
      ...options,
      body: options.body instanceof URLSearchParams ? options.body : stringBody,
    });
    const body = await res.json();
    console.warn(endpoint, 'body !', body);

    try {
      const output = await type.parseAsync(body);

      return output;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  #callPublicApi<T>(url: string, options: RequestInit, type: z.ZodType<T>): Promise<T> {
    return Api.#call('public', url, options, type);
  }

  #callApi<T>(url: string, options: RequestInit, type: z.ZodType<T>): Promise<T> {
    return Api.#call('api', url, options, type);
  }

  #callSso<T>(url: string, options: RequestInit, type: z.ZodType<T>): Promise<T> {
    return Api.#call('sso', url, options, type);
  }
}
