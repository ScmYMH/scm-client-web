import * as actions from './actions';
import { ActionType } from 'typesafe-actions';
import { LoginInfo } from '../../api/loginApi';
import { AsyncState } from '../../lib/reducerUtils';

export type LoginAction = ActionType<typeof actions>;

export type LoginState = {
	loginInfo: AsyncState<LoginInfo, Error>;
};
