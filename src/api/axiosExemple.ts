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

export const api = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints(build) {
    return {
      getDataTotal: build.query<TPicture[], string>({
        query: () => ({ url: "/paintings", method: "get" }),
      }),
      getPage: build.query<TPicture[], number>({
        query: (pageNumber: number) => ({ url: '/paintings', method: 'get', params: {_limit: 6, _page: pageNumber}})
      })
    };
  },
});

export const { useGetDataTotalQuery, useGetPageQuery } = api;
