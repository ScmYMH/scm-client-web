import { AxiosError } from "axios";
import { createAsyncAction } from "typesafe-actions";
import {
  DestInfo,
  DestInfoParam,
  LccInfo,
  LccInfoParam,
  TariffHeaderCond,
  TariffInfo,
  TariffInfoParam,
} from "./types";

// 액션 정의
export const GET_TARIFF_HEADER_COND = "tariff/GET_TARIFF_HEADER_COND";
export const GET_TARIFF_HEADER_COND_SUCCESS =
  "tariff/GET_TARIFF_HEADER_COND_SUCCESS";
export const GET_TARIFF_HEADER_COND_ERROR =
  "tariff/GET_TARIFF_HEADER_COND_ERROR";

export const POST_TARIFF_INFO = "tariff/POST_TARIFF_INFO";
export const POST_TARIFF_INFO_SUCCESS = "tariff/POST_TARIFF_INFO_SUCCESS";
export const POST_TARIFF_INFO_ERROR = "tariff/POST_TARIFF_INFO_ERROR";

export const GET_DEST_INFO = "tariff/GET_DEST_INFO";
export const GET_DEST_INFO_SUCCESS = "tariff/GET_DEST_INFO_SUCCESS";
export const GET_DEST_INFO_ERROR = "tariff/GET_DEST_INFO_ERROR";

export const GET_LCC_INFO = "tariff/GET_LCC_INFO";
export const GET_LCC_INFO_SUCCESS = "tariff/GET_LCC_INFO_SUCCESS";
export const GET_LCC_INFO_ERROR = "tariff/GET_LCC_INFO_ERROR";

export const getTariffHeaderCondAsync = createAsyncAction(
  GET_TARIFF_HEADER_COND,
  GET_TARIFF_HEADER_COND_SUCCESS,
  GET_TARIFF_HEADER_COND_ERROR
)<undefined, TariffHeaderCond, AxiosError>();

export const postTariffInfoAsync = createAsyncAction(
  POST_TARIFF_INFO,
  POST_TARIFF_INFO_SUCCESS,
  POST_TARIFF_INFO_ERROR
)<TariffInfoParam, TariffInfo, AxiosError>();

export const getDestInfoAsync = createAsyncAction(
  GET_DEST_INFO,
  GET_DEST_INFO_SUCCESS,
  GET_DEST_INFO_ERROR
)<DestInfoParam, Array<DestInfo>, AxiosError>();

export const getLccInfoAsync = createAsyncAction(
  GET_LCC_INFO,
  GET_LCC_INFO_SUCCESS,
  GET_LCC_INFO_ERROR
)<LccInfoParam, Array<LccInfo>, AxiosError>();
