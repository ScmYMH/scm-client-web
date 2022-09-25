import { AxiosError } from "axios";
import { createAsyncAction } from "typesafe-actions";
import { DashboardCalculateInfo } from "./types";

// 액션 정의
export const GET_CALCULATE_INFO = "dashboard/GET_CALCULATE_INFO";
export const GET_CALCULATE_INFO_SUCCESS =
  "dashboard/GET_CALCULATE_INFO_SUCCESS";
export const GET_CALCULATE_INFO_ERROR = "dashboard/GET_CALCULATE_INFO_ERROR";

export const getCalculateInfoAsync = createAsyncAction(
  GET_CALCULATE_INFO,
  GET_CALCULATE_INFO_SUCCESS,
  GET_CALCULATE_INFO_ERROR
)<undefined, DashboardCalculateInfo[], AxiosError>();
