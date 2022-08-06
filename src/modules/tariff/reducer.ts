import { asyncState } from "lib/reducerUtils";
import { createReducer } from "typesafe-actions";
import {
  GET_TARIFF_HEADER_COND,
  GET_TARIFF_HEADER_COND_ERROR,
  GET_TARIFF_HEADER_COND_SUCCESS,
} from "./actions";
import { TariffAction, TariffState } from "./types";

const initialState: TariffState = {
  tariffHeaderCond: asyncState.initial(),
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
});

export default tariff;
