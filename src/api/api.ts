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
import { createEntityAdapter, EntityState } from "@reduxjs/toolkit";

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

const authorAdapter = createEntityAdapter<TAuthor>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const locationAdapter = createEntityAdapter<TLocation>({
  sortComparer: (a, b) => a.location.localeCompare(b.location),
});

export const api = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints(build) {
    return {
      getDataTotal: build.query<TPicture[], TQuery>({
        query: (query: TQuery) => ({
          url: "/paintings",
          method: "get",
          params: { q: query.q, authorId: query.authorId },
        }),
      }),
      getPage: build.query<TPicture[], TPageLimit>({
        query: (query: TPageLimit) => ({
          url: "/paintings",
          method: "get",
          params: query,
        }),
      }),
      getAuthors: build.query<EntityState<TAuthor, number>, void>({
        query: () => ({ url: "/authors", method: "get" }),
        transformResponse(response: TAuthor[]) {
          return authorAdapter.addMany(
            authorAdapter.getInitialState(),
            response
          );
        },
      }),
      getLocations: build.query<EntityState<TLocation, number>, void>({
        query: () => ({ url: "/locations", method: "get" }),
        transformResponse(response: TLocation[]) {
          return locationAdapter.addMany(
            locationAdapter.getInitialState(),
            response
          );
        },
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
