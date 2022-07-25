import { combineReducers } from 'redux';
import { all } from '@redux-saga/core/effects';
import contractmember from './contractMember/reducer';
import { contractMemberSaga } from './contractMember/saga';

const rootReducer = combineReducers({
	contractmember,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

export function* rootSaga() {
	yield all([contractMemberSaga()]);
}
