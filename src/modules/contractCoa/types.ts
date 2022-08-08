import { ActionType } from "typesafe-actions";
import { AsyncState } from "../../lib/reducerUtils";
import {
  ContractInfo,
  ContractInfoDefinition,
  TariffInfo,
} from "api/contractCoaAxios";
import * as actions from "./action";

export type ContractInfoAction = ActionType<typeof actions>;

export type ContractInfoState = {
  contractInfo: AsyncState<ContractInfo, Error>;
};

export type insertContractInfoAction = ActionType<typeof actions>;

export type insertContractInfoState = {
  insertContractInfo: AsyncState<ContractInfo, Error>;
};
export type TariffInfoAction = ActionType<typeof actions>;

export type TariffInfoState = {
  tariffInfo: AsyncState<TariffInfo, Error>;
};

export type BaseCodeAction = ActionType<typeof actions>;

export type BaseCodeState = {
  baseCode: AsyncState<ContractInfoDefinition, Error>;
};
