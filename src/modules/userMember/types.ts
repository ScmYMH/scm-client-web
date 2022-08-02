import { UserMemberInfo } from 'api/userMember';
import { AsyncState } from 'lib/reducerUtils';
import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type UserMemberAction = ActionType<typeof actions>;

export type UserMemberState = {
	userMemberList: AsyncState<Array<UserMemberInfo>, Error>;
};
