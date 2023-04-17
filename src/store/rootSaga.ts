import { all } from 'redux-saga/effects';
import { authSaga } from './slice/auth/saga';
import { projectsSaga } from './slice/projects/saga';

export default function* rootSaga() {
  yield all([authSaga(), projectsSaga()]);
}
