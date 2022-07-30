import { ContractInfo, TariffInfo } from "api/contractCoaAxios";
import { AxiosError } from "axios";
import { createAsyncAction } from "typesafe-actions";

// 액션 정의
export const GET_CONTRACT_INFO_REQUEST = "contract/GET_CONTRACT_INFO_REQUEST";
export const GET_CONTRACT_INFO_REQUEST_SUCCESS =
  "contract/GET_CONTRACT_INFO_REQUEST_SUCCESS";
export const GET_CONTRACT_INFO_REQUEST_ERROR =
  "contract/GET_CONTRACT_INFO_REQUEST_ERROR";

export const GET_TARIFF_INFO_REQUEST = "contract/GET_TARIFF_INFO_REQUEST";
export const GET_TARIFF_INFO_REQUEST_SUCCESS =
  "contract/GET_TARIFF_INFO_REQUEST_SUCCESS";
export const GET_TARIFF_INFO_REQUEST_ERROR =
  "contract/GET_TARIFF_INFO_REQUEST_ERROR";

export const contractInfoAsync = createAsyncAction(
  GET_CONTRACT_INFO_REQUEST,
  GET_CONTRACT_INFO_REQUEST_SUCCESS,
  GET_CONTRACT_INFO_REQUEST_ERROR
)<any, ContractInfo, AxiosError>();

export const tariffInfoAsync = createAsyncAction(
  GET_TARIFF_INFO_REQUEST,
  GET_TARIFF_INFO_REQUEST_SUCCESS,
  GET_TARIFF_INFO_REQUEST_ERROR
)<any, TariffInfo, AxiosError>();
