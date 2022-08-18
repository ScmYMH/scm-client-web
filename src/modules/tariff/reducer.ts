import { asyncState } from "lib/reducerUtils";
import { createReducer } from "typesafe-actions";
import {
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
  POST_TARIFF_HEADER,
  POST_TARIFF_HEADER_ERROR,
  POST_TARIFF_HEADER_SUCCESS,
} from "./actions";
import { TariffAction, TariffState } from "./types";

const initialState: TariffState = {
  tariffHeader: asyncState.initial(),
  destInfoList: asyncState.initial(),
  lccInfoList: asyncState.initial(),
  codeDefList: asyncState.initial(),
  tariffCondHList: asyncState.initial(),
};

const tariff = createReducer<TariffState, TariffAction>(initialState, {
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

export default tariff;
