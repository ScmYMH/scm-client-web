import { asyncState } from "lib/reducerUtils";
import { createReducer } from "typesafe-actions";
import {
  DELETE_TARIFF_COND_H,
  DELETE_TARIFF_COND_H_ERROR,
  DELETE_TARIFF_COND_H_SUCCESS,
  GET_ALL_TARIFF_INFO,
  GET_ALL_TARIFF_INFO_ERROR,
  GET_ALL_TARIFF_INFO_SUCCESS,
  GET_CODE_DEFINITION,
  GET_CODE_DEFINITION_ERROR,
  GET_CODE_DEFINITION_SUCCESS,
  GET_DEST_INFO,
  GET_DEST_INFO_ERROR,
  GET_DEST_INFO_SUCCESS,
  GET_LCC_INFO,
  GET_LCC_INFO_ERROR,
  GET_LCC_INFO_SUCCESS,
  GET_TARIFF_COND_H,
  GET_TARIFF_COND_H_ERROR,
  GET_TARIFF_COND_H_SUCCESS,
  GET_TARIFF_HEADER,
  GET_TARIFF_HEADER_ERROR,
  GET_TARIFF_HEADER_SUCCESS,
  POST_CONTRACT_COPY,
  POST_CONTRACT_COPY_ERROR,
  POST_CONTRACT_COPY_SUCCESS,
  POST_TARIFF_COND_H,
  POST_TARIFF_COND_H_ERROR,
  POST_TARIFF_COND_H_SUCCESS,
  POST_TARIFF_HEADER,
  POST_TARIFF_HEADER_ERROR,
  POST_TARIFF_HEADER_SUCCESS,
  PUT_TARIFF_HEADER,
  PUT_TARIFF_HEADER_ERROR,
  PUT_TARIFF_HEADER_SUCCESS,
  RESET_TARIFF_COND_H_SUCCESS,
  RESET_TARIFF_HEADER_SUCCESS,
  SAVE_TARIFF_PARAM,
  SAVE_TARIFF_PARAM_ERROR,
  SAVE_TARIFF_PARAM_SUCCESS,
} from "./actions";
import {
  ContractCopyAction,
  ContractCopyState,
  TariffAction,
  TariffState,
} from "./types";

const initialContractCopyState: ContractCopyState = {
  allTariffInfo: asyncState.initial(),
  contractCopyResult: asyncState.initial(),
};

export const contractCopyReducer = createReducer<
  ContractCopyState,
  ContractCopyAction
>(initialContractCopyState, {
  [GET_ALL_TARIFF_INFO]: (state) => ({
    ...state,
    allTariffInfo: asyncState.load(),
  }),
  [GET_ALL_TARIFF_INFO_SUCCESS]: (state, action) => ({
    ...state,
    allTariffInfo: asyncState.success(action.payload),
  }),
  [GET_ALL_TARIFF_INFO_ERROR]: (state, action) => ({
    ...state,
    allTariffInfo: asyncState.error(action.payload),
  }),
  [POST_CONTRACT_COPY]: (state) => ({
    ...state,
    contractCopyResult: asyncState.load(),
  }),
  [POST_CONTRACT_COPY_SUCCESS]: (state, action) => ({
    ...state,
    contractCopyResult: asyncState.success(action.payload),
  }),
  [POST_CONTRACT_COPY_ERROR]: (state, action) => ({
    ...state,
    contractCopyResult: asyncState.error(action.payload),
  }),
});

const initialState: TariffState = {
  tariffParam: asyncState.initial(),
  tariffHeader: asyncState.initial(),
  destInfoList: asyncState.initial(),
  lccInfoList: asyncState.initial(),
  codeDefList: asyncState.initial(),
  tariffCondHList: asyncState.initial(),
};

export const tariff = createReducer<TariffState, TariffAction>(initialState, {
  [SAVE_TARIFF_PARAM]: (state) => ({
    ...state,
    tariffParam: asyncState.load(),
  }),
  [SAVE_TARIFF_PARAM_SUCCESS]: (state, action) => ({
    ...state,
    tariffParam: asyncState.success(action.payload),
  }),
  [SAVE_TARIFF_PARAM_ERROR]: (state, action) => ({
    ...state,
    tariffParam: asyncState.error(action.payload),
  }),
  [GET_TARIFF_HEADER]: (state) => ({
    ...state,
    tariffHeader: asyncState.load(),
  }),
  [GET_TARIFF_HEADER_SUCCESS]: (state, action) => ({
    ...state,
    tariffHeader: asyncState.success(action.payload),
  }),
  [GET_TARIFF_HEADER_ERROR]: (state, action) => ({
    ...state,
    tariffHeader: asyncState.error(action.payload),
  }),
  [POST_TARIFF_HEADER]: (state) => ({
    ...state,
    tariffHeader: asyncState.load(),
  }),
  [POST_TARIFF_HEADER_SUCCESS]: (state, action) => ({
    ...state,
    tariffHeader: asyncState.success(action.payload),
  }),
  [POST_TARIFF_HEADER_ERROR]: (state, action) => ({
    ...state,
    tariffHeader: asyncState.error(action.payload),
  }),
  [PUT_TARIFF_HEADER]: (state) => ({
    ...state,
    tariffHeader: asyncState.load(),
  }),
  [PUT_TARIFF_HEADER_SUCCESS]: (state, action) => ({
    ...state,
    tariffHeader: asyncState.success(action.payload),
  }),
  [PUT_TARIFF_HEADER_ERROR]: (state, action) => ({
    ...state,
    tariffHeader: asyncState.error(action.payload),
  }),
  [GET_TARIFF_COND_H]: (state) => ({
    ...state,
    tariffCondHList: asyncState.load(),
  }),
  [GET_TARIFF_COND_H_SUCCESS]: (state, action) => ({
    ...state,
    tariffCondHList: asyncState.success(action.payload),
  }),
  [GET_TARIFF_COND_H_ERROR]: (state, action) => ({
    ...state,
    tariffCondHList: asyncState.error(action.payload),
  }),
  [RESET_TARIFF_HEADER_SUCCESS]: (state, action) => ({
    ...state,
    tariffHeader: asyncState.success(action.payload),
  }),
  [RESET_TARIFF_COND_H_SUCCESS]: (state, action) => ({
    ...state,
    tariffCondHList: asyncState.success(action.payload),
  }),
  [POST_TARIFF_COND_H]: (state) => ({
    ...state,
    tariffCondHList: asyncState.load(),
  }),
  [POST_TARIFF_COND_H_SUCCESS]: (state, action) => ({
    ...state,
    tariffCondHList: asyncState.success(action.payload),
  }),
  [POST_TARIFF_COND_H_ERROR]: (state, action) => ({
    ...state,
    tariffCondHList: asyncState.error(action.payload),
  }),
  [DELETE_TARIFF_COND_H]: (state) => ({
    ...state,
    tariffCondHList: asyncState.load(),
  }),
  [DELETE_TARIFF_COND_H_SUCCESS]: (state, action) => ({
    ...state,
    tariffCondHList: asyncState.success(action.payload),
  }),
  [DELETE_TARIFF_COND_H_ERROR]: (state, action) => ({
    ...state,
    tariffCondHList: asyncState.error(action.payload),
  }),
  [GET_DEST_INFO]: (state) => ({
    ...state,
    destInfoList: asyncState.load(),
  }),
  [GET_DEST_INFO_SUCCESS]: (state, action) => ({
    ...state,
    destInfoList: asyncState.success(action.payload),
  }),
  [GET_DEST_INFO_ERROR]: (state, action) => ({
    ...state,
    destInfoList: asyncState.error(action.payload),
  }),
  [GET_LCC_INFO]: (state) => ({
    ...state,
    lccInfoList: asyncState.load(),
  }),
  [GET_LCC_INFO_SUCCESS]: (state, action) => ({
    ...state,
    lccInfoList: asyncState.success(action.payload),
  }),
  [GET_LCC_INFO_ERROR]: (state, action) => ({
    ...state,
    lccInfoList: asyncState.error(action.payload),
  }),
  [GET_CODE_DEFINITION]: (state) => ({
    ...state,
    codeDefList: asyncState.load(),
  }),
  [GET_CODE_DEFINITION_SUCCESS]: (state, action) => ({
    ...state,
    codeDefList: asyncState.success(action.payload),
  }),
  [GET_CODE_DEFINITION_ERROR]: (state, action) => ({
    ...state,
    codeDefList: asyncState.error(action.payload),
  }),
});
