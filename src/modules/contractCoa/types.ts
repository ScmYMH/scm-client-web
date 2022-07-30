import { ActionType } from "typesafe-actions";
import { AsyncState } from "../../lib/reducerUtils";
import { ContractInfo, TariffInfo } from "api/contractCoaAxios";
import * as actions from "./action";

export type ContractInfoAction = ActionType<typeof actions>;

export type ContractInfoState = {
  contractInfo: AsyncState<ContractInfo, Error>;
};

export type TariffInfoAction = ActionType<typeof actions>;

export type TariffInfoState = {
  tariffInfo: AsyncState<TariffInfo, Error>;
};
