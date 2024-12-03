import { createApi } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import axios from "axios";
import type { AxiosRequestConfig, AxiosError } from "axios";
import {
  TAuthor,
  TLocation,
  TPageLimit,
  TPicture,
  TQuery,
} from "../components/types/types";
import { BASE_URL } from "../const/consts";

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

export const api = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints(build) {
    return {
      //Получаем данные, не постранично, для динамической отрисовки пагинатора
      getDataTotal: build.query<TPicture[], TPageLimit>({
        query: (query: TQuery) => ({
          url: "/paintings",
          method: "get",
          params: { q: query.q, authorId: query.authorId },
        }),
      }),

      //Получаем данные постранично для отрисовки карточек
      getPage: build.query<TPicture[], TQuery>({
        query: (query: TPageLimit) => ({
          url: "/paintings",
          method: "get",
          params: query,
        }),
      }),

      //Получаем массив всех авторов
      getAuthors: build.query<TAuthor[], void>({
        query: () => ({ url: "/authors", method: "get" }),
      }),

      //Получаем массив всех музеев
      getLocations: build.query<TLocation[], void>({
        query: () => ({ url: "/locations", method: "get" }),
      }),
    };
  },
});

export const {
  useGetDataTotalQuery,
  useGetPageQuery,
  useGetAuthorsQuery,
  useGetLocationsQuery,
} = api;
