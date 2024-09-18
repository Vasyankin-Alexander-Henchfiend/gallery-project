import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { TPicture } from "../components/types/types";


export const BASE_URL = "https://test-front.framework.team/";

function responseCheck(res: AxiosResponse) {
  if (res.status !== 200) {
    /*здесь ловим коды ошибок http*/
    throw new Error(`Код ошибки http = ${res.statusText}`);
  }
  return;
}


export const getPictures = async (pageNumber: number): Promise<TPicture[]> => {
  const requestConfig: AxiosRequestConfig = {
    params: {
      _limit: 6,
      _page: pageNumber,
    },
  };
  return await axios
    .get<TPicture[]>(BASE_URL + "paintings", requestConfig)
    .then((res) => {
      responseCheck(res);
      return res.data;
    })
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
};