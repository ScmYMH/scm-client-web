import { createReducer } from "typesafe-actions";
import { asyncState } from "../../lib/reducerUtils";
import {
  GET_CONTRACT_INFO_REQUEST,
  GET_CONTRACT_INFO_REQUEST_SUCCESS,
  GET_CONTRACT_INFO_REQUEST_ERROR,
  GET_TARIFF_INFO_REQUEST_ERROR,
  GET_TARIFF_INFO_REQUEST_SUCCESS,
  GET_TARIFF_INFO_REQUEST,
  GET_BASECODE_INFO_REQUEST,
  GET_BASECODE_INFO_REQUEST_SUCCESS,
  GET_BASECODE_INFO_REQUEST_ERROR,
  POST_CONTRACT_INFO_REQUEST,
  POST_CONTRACT_INFO_REQUEST_SUCCESS,
  POST_CONTRACT_INFO_REQUEST_ERROR,
  UPDATE_CONTRACT_INFO_REQUEST,
  UPDATE_CONTRACT_INFO_REQUEST_SUCCESS,
  UPDATE_CONTRACT_INFO_REQUEST_ERROR,
  DEL_CONTRACT_INFO_REQUEST,
  DEL_CONTRACT_INFO_REQUEST_SUCCESS,
  DEL_CONTRACT_INFO_REQUEST_ERROR,
} from "./action";
import {
  BaseCodeAction,
  BaseCodeState,
  ContractInfoAction,
  ContractInfoState,
  delContractInfoAction,
  delContractInfoState,
  insertContractInfoAction,
  insertContractInfoState,
  TariffInfoAction,
  TariffInfoState,
  updateContractInfoAction,
  updateContractInfoState,
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
const insertContractinitialState: insertContractInfoState = {
  insertContractInfo: asyncState.initial(),
};

const postContractInfo = createReducer<
  insertContractInfoState,
  insertContractInfoAction
>(insertContractinitialState, {
  [POST_CONTRACT_INFO_REQUEST]: (state) => ({
    ...state,
    insertContractInfo: asyncState.load(),
  }),
  [POST_CONTRACT_INFO_REQUEST_SUCCESS]: (state, action) => ({
    ...state,
    insertContractInfo: asyncState.success(action.payload),
  }),
  [POST_CONTRACT_INFO_REQUEST_ERROR]: (state, action) => ({
    ...state,
    insertContractInfo: asyncState.error(action.payload),
  }),
});

const updateContractinitialState: updateContractInfoState = {
  updateContractInfo: asyncState.initial(),
};

const updateContractInfo = createReducer<
  updateContractInfoState,
  updateContractInfoAction
>(updateContractinitialState, {
  [UPDATE_CONTRACT_INFO_REQUEST]: (state) => ({
    ...state,
    updateContractInfo: asyncState.load(),
  }),
  [UPDATE_CONTRACT_INFO_REQUEST_SUCCESS]: (state, action) => ({
    ...state,
    updateContractInfo: asyncState.success(action.payload),
  }),
  [UPDATE_CONTRACT_INFO_REQUEST_ERROR]: (state, action) => ({
    ...state,
    updateContractInfo: asyncState.error(action.payload),
  }),
});

const delContractinitialState: delContractInfoState = {
  delContractInfo: asyncState.initial(),
};

const delContractInfo = createReducer<
  delContractInfoState,
  delContractInfoAction
>(delContractinitialState, {
  [DEL_CONTRACT_INFO_REQUEST]: (state) => ({
    ...state,
    delContractInfo: asyncState.load(),
  }),
  [DEL_CONTRACT_INFO_REQUEST_SUCCESS]: (state, action) => ({
    ...state,
    delContractInfo: asyncState.success(action.payload),
  }),
  [DEL_CONTRACT_INFO_REQUEST_ERROR]: (state, action) => ({
    ...state,
    delContractInfo: asyncState.error(action.payload),
  }),
});

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

const baseCodeInitialState: BaseCodeState = {
  baseCode: asyncState.initial(),
};

const baseCode = createReducer<BaseCodeState, BaseCodeAction>(
  baseCodeInitialState,
  {
    [GET_BASECODE_INFO_REQUEST]: (state) => ({
      ...state,
      baseCode: asyncState.load(),
    }),
    [GET_BASECODE_INFO_REQUEST_SUCCESS]: (state, action) => ({
      ...state,
      baseCode: asyncState.success(action.payload),
    }),
    [GET_BASECODE_INFO_REQUEST_ERROR]: (state, action) => ({
      ...state,
      baseCode: asyncState.error(action.payload),
    }),
  }
);

export {
  contractInfo,
  tariffInfo,
  baseCode,
  postContractInfo,
  updateContractInfo,
  delContractInfo,
};
