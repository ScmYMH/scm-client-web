import { ActionType } from "typesafe-actions";
import { AsyncState } from "../../lib/reducerUtils";
import * as actions from "./action";
import { ContractChangeInfo } from "api/contractCoaChangeAxios";

export type ContractInfoAction = ActionType<typeof actions>;

export type ContractChangeInfoState = {
  contractChangeInfo: AsyncState<ContractChangeInfo, Error>;
};

export type ContractChangeInfoAction = ActionType<typeof actions>;
