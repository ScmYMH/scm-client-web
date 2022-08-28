import * as actions from './actions';
import { ActionType } from 'typesafe-actions';
import { AsyncState } from '../../lib/reducerUtils';
import { CalculateInfo } from 'api/calculateAxios';

export type CalculateInfoAction = ActionType<typeof actions>;

export type CalculateInfoState = {
	calculateInfo: AsyncState<CalculateInfo, Error>;
};
