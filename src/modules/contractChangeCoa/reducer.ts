import { createReducer } from "typesafe-actions";
import { asyncState } from "../../lib/reducerUtils";
import {
  GET_COA_CHANGE_INFO,
  GET_COA_CHANGE_INFO_ERROR,
  GET_COA_CHANGE_INFO_SUCCESS,
} from "./action";
import { ContractChangeInfoAction, ContractChangeInfoState } from "./types";

const initialState: ContractChangeInfoState = {
  contractChangeInfo: asyncState.initial(),
};

const contractInfo = createReducer<
  ContractChangeInfoState,
  ContractChangeInfoAction
>(initialState, {
  [GET_COA_CHANGE_INFO]: (state) => ({
    ...state,
    contractChangeInfo: asyncState.load(),
  }),
  [GET_COA_CHANGE_INFO_SUCCESS]: (state, action) => ({
    ...state,
    contractChangeInfo: asyncState.success(action.payload),
  }),
  [GET_COA_CHANGE_INFO_ERROR]: (state, action) => ({
    ...state,
    contractChangeInfo: asyncState.error(action.payload),
  }),
});

export { contractInfo };
