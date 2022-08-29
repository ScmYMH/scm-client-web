import * as actions from './actions';
import { ActionType } from 'typesafe-actions';
import { AsyncState } from '../../lib/reducerUtils';
import { CalculateInfo, VslCdInfo } from 'api/calculateAxios';

export type CalculateInfoAction = ActionType<typeof actions>;

export type CalculateInfoState = {
	calculateInfo: AsyncState<CalculateInfo, Error>;
};


export type CalculateDetailInfoAction = ActionType<typeof actions>;

export type CalculateDetailInfoState = {
	calculateDetailInfo: AsyncState<CalculateInfo, Error>;
};


export type VslCdAction = ActionType<typeof actions>;

export type VslCdState = {
	vslCdInfo: AsyncState<VslCdInfo, Error>;
};
