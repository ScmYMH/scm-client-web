import * as actions from './actions';
import { ActionType } from 'typesafe-actions';
import { CommonInfo } from 'api/changeManagerAxios';
import { AsyncState } from 'lib/reducerUtils';

export type ChangeManagerAction = ActionType<typeof actions>;

export type ChangeManagerState = {
	commonInfoList: AsyncState<Array<CommonInfo>, Error>;
};
