import { createReducer } from "typesafe-actions";
import { asyncState } from "../../lib/reducerUtils";
import {
  GET_CONTRACT_INFO_REQUEST,
  GET_CONTRACT_INFO_REQUEST_SUCCESS,
  GET_CONTRACT_INFO_REQUEST_ERROR,
  GET_TARIFF_INFO_REQUEST_ERROR,
  GET_TARIFF_INFO_REQUEST_SUCCESS,
  GET_TARIFF_INFO_REQUEST,
} from "./action";
import {
  ContractInfoAction,
  ContractInfoState,
  TariffInfoAction,
  TariffInfoState,
} from "./types";

const initialState: ContractInfoState = {
  contractInfo: asyncState.initial(),
};

const contractInfo = createReducer<ContractInfoState, ContractInfoAction>(
  initialState,
  {
    [GET_CONTRACT_INFO_REQUEST]: (state) => ({
      ...state,
      contractInfo: asyncState.load(),
    }),
    [GET_CONTRACT_INFO_REQUEST_SUCCESS]: (state, action) => ({
      ...state,
      contractInfo: asyncState.success(action.payload),
    }),
    [GET_CONTRACT_INFO_REQUEST_ERROR]: (state, action) => ({
      ...state,
      contractInfo: asyncState.error(action.payload),
    }),
  }
);

const tariffInitialState: TariffInfoState = {
  tariffInfo: asyncState.initial(),
};

const tariffInfo = createReducer<TariffInfoState, TariffInfoAction>(
  tariffInitialState,
  {
    [GET_TARIFF_INFO_REQUEST]: (state) => ({
      ...state,
      tariffInfo: asyncState.load(),
    }),
    [GET_TARIFF_INFO_REQUEST_SUCCESS]: (state, action) => ({
      ...state,
      tariffInfo: asyncState.success(action.payload),
    }),
    [GET_TARIFF_INFO_REQUEST_ERROR]: (state, action) => ({
      ...state,
      tariffInfo: asyncState.error(action.payload),
    }),
  }
);

export { contractInfo, tariffInfo };
