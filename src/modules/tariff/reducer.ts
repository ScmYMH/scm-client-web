import { asyncState } from "lib/reducerUtils";
import { createReducer } from "typesafe-actions";
import {
  GET_DEST_INFO,
  GET_DEST_INFO_ERROR,
  GET_DEST_INFO_SUCCESS,
  GET_LCC_INFO,
  GET_LCC_INFO_ERROR,
  GET_LCC_INFO_SUCCESS,
  GET_TARIFF_HEADER_COND,
  GET_TARIFF_HEADER_COND_ERROR,
  GET_TARIFF_HEADER_COND_SUCCESS,
  POST_TARIFF_INFO,
  POST_TARIFF_INFO_ERROR,
  POST_TARIFF_INFO_SUCCESS,
} from "./actions";
import { TariffAction, TariffState } from "./types";

const initialState: TariffState = {
  tariffHeaderCond: asyncState.initial(),
  tariffInfo: asyncState.initial(),
  destInfoList: asyncState.initial(),
  lccInfoList: asyncState.initial(),
};

const tariff = createReducer<TariffState, TariffAction>(initialState, {
  [GET_TARIFF_HEADER_COND]: (state) => ({
    ...state,
    tariffHeaderCond: asyncState.load(),
  }),
  [GET_TARIFF_HEADER_COND_SUCCESS]: (state, action) => ({
    ...state,
    tariffHeaderCond: asyncState.success(action.payload),
  }),
  [GET_TARIFF_HEADER_COND_ERROR]: (state, action) => ({
    ...state,
    tariffHeaderCond: asyncState.error(action.payload),
  }),
  [POST_TARIFF_INFO]: (state) => ({
    ...state,
    tariffInfo: asyncState.load(),
  }),
  [POST_TARIFF_INFO_SUCCESS]: (state, action) => ({
    ...state,
    tariffInfo: asyncState.success(action.payload),
  }),
  [POST_TARIFF_INFO_ERROR]: (state, action) => ({
    ...state,
    tariffInfo: asyncState.error(action.payload),
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
});

export default tariff;
