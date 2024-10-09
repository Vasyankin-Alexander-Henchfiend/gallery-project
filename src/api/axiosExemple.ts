import { createApi } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import axios from "axios";
import type { AxiosRequestConfig, AxiosError } from "axios";
import { TPicture } from "../components/types/types";

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

const BASE_URL = "https://test-front.framework.team";

export type TQuery = {
  q?: string;
  authorId?: string;
};

export type TPageLimit = TQuery&{
  _page: number;
  _limit: number;
};


export const api = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints(build) {
    return {
      getDataTotal: build.query<TPicture[], TQuery>({
        query: (query: TQuery) => ({ url: "/paintings", method: "get", params: {q: query.q, authorId: query.authorId} }),
      }),
      getPage: build.query<TPicture[], TPageLimit>({
        query: (query: TPageLimit) => ({ url: '/paintings', method: 'get', params: query})
      })
    };
  },
});

export const { useGetDataTotalQuery, useGetPageQuery } = api;