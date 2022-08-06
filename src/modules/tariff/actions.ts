import { AxiosError } from "axios";
import { createAsyncAction } from "typesafe-actions";
import { TariffHeaderCond } from "./types";

// 액션 정의
export const GET_TARIFF_HEADER_COND = "tariff/GET_TARIFF_HEADER_COND";
export const GET_TARIFF_HEADER_COND_SUCCESS =
  "tariff/GET_TARIFF_HEADER_COND_SUCCESS";
export const GET_TARIFF_HEADER_COND_ERROR =
  "tariff/GET_TARIFF_HEADER_COND_ERROR";

export const getTariffHeaderCondAsync = createAsyncAction(
  GET_TARIFF_HEADER_COND,
  GET_TARIFF_HEADER_COND_SUCCESS,
  GET_TARIFF_HEADER_COND_ERROR
)<undefined, TariffHeaderCond, AxiosError>();
