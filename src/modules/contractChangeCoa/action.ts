import { ContractChangeInfo } from "api/contractCoaChangeAxios";
import { AxiosError } from "axios";
import { createAsyncAction } from "typesafe-actions";

export const GET_COA_CHANGE_INFO = "contractChangeCoa/GET_COA_CHANGE_INFO";
export const GET_COA_CHANGE_INFO_SUCCESS =
  "contractChangeCoa/GET_COA_CHANGE_INFO_SUCCESS";
export const GET_COA_CHANGE_INFO_ERROR =
  "contractChangeCoa/GET_COA_CHANGE_INFO_ERROR";

export const contractChangeInfoAsync = createAsyncAction(
  GET_COA_CHANGE_INFO,
  GET_COA_CHANGE_INFO_SUCCESS,
  GET_COA_CHANGE_INFO_ERROR
)<any, ContractChangeInfo, AxiosError>();
