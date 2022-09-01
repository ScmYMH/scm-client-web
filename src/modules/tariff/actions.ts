import { AxiosError } from "axios";
import { createAsyncAction } from "typesafe-actions";
import {
  CodeDefinition,
  DestInfo,
  LccInfo,
  LccInfoParam,
  TariffCondH,
  TariffHeader,
  TariffParam,
} from "./types";

// 액션 정의

export const SAVE_TARIFF_PARAM = "tariff/SAVE_TARIFF_PARAM";
export const SAVE_TARIFF_PARAM_SUCCESS = "tariff/SAVE_TARIFF_PARAM_SUCCESS";
export const SAVE_TARIFF_PARAM_ERROR = "tariff/SAVE_TARIFF_PARAM_ERROR";

export const GET_TARIFF_HEADER = "tariff/GET_TARIFF_HEADER";
export const GET_TARIFF_HEADER_SUCCESS = "tariff/GET_TARIFF_HEADER_SUCCESS";
export const GET_TARIFF_HEADER_ERROR = "tariff/GET_TARIFF_HEADER_ERROR";

export const POST_TARIFF_HEADER = "tariff/POST_TARIFF_HEADER";
export const POST_TARIFF_HEADER_SUCCESS = "tariff/POST_TARIFF_HEADER_SUCCESS";
export const POST_TARIFF_HEADER_ERROR = "tariff/POST_TARIFF_HEADER_ERROR";

export const GET_TARIFF_COND_H = "tariff/GET_TARIFF_COND_H";
export const GET_TARIFF_COND_H_SUCCESS = "tariff/GET_TARIFF_COND_H_SUCCESS";
export const GET_TARIFF_COND_H_ERROR = "tariff/GET_TARIFF_COND_H_ERROR";

export const RESET_TARIFF_HEADER = "tariff/RESET_TARIFF_HEADER";
export const RESET_TARIFF_HEADER_SUCCESS = "tariff/RESET_TARIFF_HEADER_SUCCESS";
export const RESET_TARIFF_HEADER_ERROR = "tariff/RESET_TARIFF_HEADER_ERROR";

export const RESET_TARIFF_COND_H = "tariff/RESET_TARIFF_COND_H";
export const RESET_TARIFF_COND_H_SUCCESS = "tariff/RESET_TARIFF_COND_H_SUCCESS";
export const RESET_TARIFF_COND_H_ERROR = "tariff/RESET_TARIFF_COND_H_ERROR";

export const POST_TARIFF_COND_H = "tariff/POST_TARIFF_COND_H";
export const POST_TARIFF_COND_H_SUCCESS = "tariff/POST_TARIFF_COND_H_SUCCESS";
export const POST_TARIFF_COND_H_ERROR = "tariff/POST_TARIFF_COND_H_ERROR";

export const DELETE_TARIFF_COND_H = "tariff/DELETE_TARIFF_COND_H";
export const DELETE_TARIFF_COND_H_SUCCESS =
  "tariff/DELETE_TARIFF_COND_H_SUCCESS";
export const DELETE_TARIFF_COND_H_ERROR = "tariff/DELETE_TARIFF_COND_H_ERROR";

export const GET_DEST_INFO = "tariff/GET_DEST_INFO";
export const GET_DEST_INFO_SUCCESS = "tariff/GET_DEST_INFO_SUCCESS";
export const GET_DEST_INFO_ERROR = "tariff/GET_DEST_INFO_ERROR";

export const GET_LCC_INFO = "tariff/GET_LCC_INFO";
export const GET_LCC_INFO_SUCCESS = "tariff/GET_LCC_INFO_SUCCESS";
export const GET_LCC_INFO_ERROR = "tariff/GET_LCC_INFO_ERROR";

export const GET_CODE_DEFINITION = "tariff/GET_CODE_DEFINITION";
export const GET_CODE_DEFINITION_SUCCESS = "tariff/GET_CODE_DEFINITION_SUCCESS";
export const GET_CODE_DEFINITION_ERROR = "tariff/GET_CODE_DEFINITION_ERROR";

export const saveTariffParamAsync = createAsyncAction(
  SAVE_TARIFF_PARAM,
  SAVE_TARIFF_PARAM_SUCCESS,
  SAVE_TARIFF_PARAM_ERROR
)<TariffParam, TariffParam, AxiosError>();

export const getTariffHeaderAsync = createAsyncAction(
  GET_TARIFF_HEADER,
  GET_TARIFF_HEADER_SUCCESS,
  GET_TARIFF_HEADER_ERROR
)<any, TariffHeader, AxiosError>();

export const postTariffHeaderAsync = createAsyncAction(
  POST_TARIFF_HEADER,
  POST_TARIFF_HEADER_SUCCESS,
  POST_TARIFF_HEADER_ERROR
)<TariffHeader, TariffHeader, AxiosError>();

export const getTariffCondHAsync = createAsyncAction(
  GET_TARIFF_COND_H,
  GET_TARIFF_COND_H_SUCCESS,
  GET_TARIFF_COND_H_ERROR
)<any, Array<TariffCondH>, AxiosError>();

export const resetTariffHeaderAsync = createAsyncAction(
  RESET_TARIFF_HEADER,
  RESET_TARIFF_HEADER_SUCCESS,
  RESET_TARIFF_COND_H_ERROR
)<TariffHeader, TariffHeader, AxiosError>();

export const resetTariffCondHAsync = createAsyncAction(
  RESET_TARIFF_COND_H,
  RESET_TARIFF_COND_H_SUCCESS,
  RESET_TARIFF_COND_H_ERROR
)<undefined, any, any>();

export const postTariffCondHAsync = createAsyncAction(
  POST_TARIFF_COND_H,
  POST_TARIFF_COND_H_SUCCESS,
  POST_TARIFF_COND_H_ERROR
)<any, Array<TariffCondH>, AxiosError>();

export const deleteTariffCondHAsync = createAsyncAction(
  DELETE_TARIFF_COND_H,
  DELETE_TARIFF_COND_H_SUCCESS,
  DELETE_TARIFF_COND_H_ERROR
)<Array<number>, Array<TariffCondH>, AxiosError>();

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
