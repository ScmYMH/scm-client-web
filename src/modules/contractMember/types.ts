import { ContractMemberInfo } from 'api/contractMemberAxios';
import { AsyncState } from 'lib/reducerUtils';
import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type ContractMemberAction = ActionType<typeof actions>;

export type ContractMemberState = {
	contractMemberList: AsyncState<Array<ContractMemberInfo>, Error>;
	contractMemberPostList: AsyncState<Array<ContractMemberInfo>, Error>;
	contractMemberDelete: AsyncState<String, Error>;
};
