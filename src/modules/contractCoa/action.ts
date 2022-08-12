import {
  ContractInfo,
  ContractInfoDefinition,
  TariffInfo,
} from "api/contractCoaAxios";
import { AxiosError } from "axios";
import { createAsyncAction } from "typesafe-actions";

// 액션 정의
export const GET_CONTRACT_INFO_REQUEST = "contract/GET_CONTRACT_INFO_REQUEST";
export const GET_CONTRACT_INFO_REQUEST_SUCCESS =
  "contract/GET_CONTRACT_INFO_REQUEST_SUCCESS";
export const GET_CONTRACT_INFO_REQUEST_ERROR =
  "contract/GET_CONTRACT_INFO_REQUEST_ERROR";

// 계약 정보 입력
export const POST_CONTRACT_INFO_REQUEST = "contract/POST_CONTRACT_INFO_REQUEST";
export const POST_CONTRACT_INFO_REQUEST_SUCCESS =
  "contract/POST_CONTRACT_INFO_REQUEST_SUCCESS";
export const POST_CONTRACT_INFO_REQUEST_ERROR =
  "contract/POST_CONTRACT_INFO_REQUEST_ERROR";

// 계약 정보 수정
export const UPDATE_CONTRACT_INFO_REQUEST =
  "contract/UPDATE_CONTRACT_INFO_REQUEST";
export const UPDATE_CONTRACT_INFO_REQUEST_SUCCESS =
  "contract/UPDATE_CONTRACT_INFO_REQUEST_SUCCESS";
export const UPDATE_CONTRACT_INFO_REQUEST_ERROR =
  "contract/UPDATE_CONTRACT_INFO_REQUEST_ERROR";

// 타리프 조회
export const GET_TARIFF_INFO_REQUEST = "contract/GET_TARIFF_INFO_REQUEST";
export const GET_TARIFF_INFO_REQUEST_SUCCESS =
  "contract/GET_TARIFF_INFO_REQUEST_SUCCESS";
export const GET_TARIFF_INFO_REQUEST_ERROR =
  "contract/GET_TARIFF_INFO_REQUEST_ERROR";

// 기준 코드 조회
export const GET_BASECODE_INFO_REQUEST = "contract/GET_BASECODE_INFO_REQUEST";
export const GET_BASECODE_INFO_REQUEST_SUCCESS =
  "contract/GET_BASECODE_INFO_REQUEST_SUCCESS";
export const GET_BASECODE_INFO_REQUEST_ERROR =
  "contract/GET_BASECODE_INFO_REQUEST_ERROR";

export const baseCodeAsync = createAsyncAction(
  GET_BASECODE_INFO_REQUEST,
  GET_BASECODE_INFO_REQUEST_SUCCESS,
  GET_BASECODE_INFO_REQUEST_ERROR
)<any, ContractInfoDefinition, AxiosError>();

export const insertContractCodeAsync = createAsyncAction(
  POST_CONTRACT_INFO_REQUEST,
  POST_CONTRACT_INFO_REQUEST_SUCCESS,
  POST_CONTRACT_INFO_REQUEST_ERROR
)<any, ContractInfo, AxiosError>();

export const updateContractCodeAsync = createAsyncAction(
  UPDATE_CONTRACT_INFO_REQUEST,
  UPDATE_CONTRACT_INFO_REQUEST_SUCCESS,
  UPDATE_CONTRACT_INFO_REQUEST_ERROR
)<any, ContractInfo, AxiosError>();

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
