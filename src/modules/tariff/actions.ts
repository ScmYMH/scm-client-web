import { AxiosError } from "axios";
import { createAsyncAction } from "typesafe-actions";
import {
  CodeDefinition,
  DestInfo,
  LccInfo,
  LccInfoParam,
  TariffCondH,
  TariffHeader,
  TariffHeaderParam,
} from "./types";

// 액션 정의

export const POST_TARIFF_HEADER = "tariff/POST_TARIFF_HEADER";
export const POST_TARIFF_HEADER_SUCCESS = "tariff/POST_TARIFF_HEADER_SUCCESS";
export const POST_TARIFF_HEADER_ERROR = "tariff/POST_TARIFF_HEADER_ERROR";

export const GET_TARIFF_COND_H = "tariff/GET_TARIFF_COND_H";
export const GET_TARIFF_COND_H_SUCCESS = "tariff/GET_TARIFF_COND_H_SUCCESS";
export const GET_TARIFF_COND_H_ERROR = "tariff/GET_TARIFF_COND_H_ERROR";

export const GET_DEST_INFO = "tariff/GET_DEST_INFO";
export const GET_DEST_INFO_SUCCESS = "tariff/GET_DEST_INFO_SUCCESS";
export const GET_DEST_INFO_ERROR = "tariff/GET_DEST_INFO_ERROR";

export const GET_LCC_INFO = "tariff/GET_LCC_INFO";
export const GET_LCC_INFO_SUCCESS = "tariff/GET_LCC_INFO_SUCCESS";
export const GET_LCC_INFO_ERROR = "tariff/GET_LCC_INFO_ERROR";

export const GET_CODE_DEFINITION = "tariff/GET_CODE_DEFINITION";
export const GET_CODE_DEFINITION_SUCCESS = "tariff/GET_CODE_DEFINITION_SUCCESS";
export const GET_CODE_DEFINITION_ERROR = "tariff/GET_CODE_DEFINITION_ERROR";

export const postTariffHeaderAsync = createAsyncAction(
  POST_TARIFF_HEADER,
  POST_TARIFF_HEADER_SUCCESS,
  POST_TARIFF_HEADER_ERROR
)<TariffHeaderParam, TariffHeader, AxiosError>();

export const getTariffCondHAsync = createAsyncAction(
  GET_TARIFF_COND_H,
  GET_TARIFF_COND_H_SUCCESS,
  GET_TARIFF_COND_H_ERROR
)<any, Array<TariffCondH>, AxiosError>();

export const getDestInfoAsync = createAsyncAction(
  GET_DEST_INFO,
  GET_DEST_INFO_SUCCESS,
  GET_DEST_INFO_ERROR
)<undefined, Array<DestInfo>, AxiosError>();

export const getLccInfoAsync = createAsyncAction(
  GET_LCC_INFO,
  GET_LCC_INFO_SUCCESS,
  GET_LCC_INFO_ERROR
)<LccInfoParam, Array<LccInfo>, AxiosError>();

export const getCodeDefAsync = createAsyncAction(
  GET_CODE_DEFINITION,
  GET_CODE_DEFINITION_SUCCESS,
  GET_CODE_DEFINITION_ERROR
)<any, Array<CodeDefinition>, AxiosError>();
