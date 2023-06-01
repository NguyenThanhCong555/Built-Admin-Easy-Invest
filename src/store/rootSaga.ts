import { all } from 'redux-saga/effects';
import { authSaga } from './slice/auth/saga';
import { projectsSaga } from './slice/projects/saga';
import { profileSaga } from './slice/profile/saga';
import { requestSaga } from './slice/request/saga';
import { systemSaga } from './slice/system/saga';
import { usersSaga } from './slice/users/saga';
import { bankSaga } from './slice/bank/saga';
import { searchSaga } from './slice/search/saga';

export default function* rootSaga() {
  yield all([authSaga(), projectsSaga(), profileSaga(), requestSaga(), systemSaga(), usersSaga(), bankSaga(), searchSaga()]);
}
