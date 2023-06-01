import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { profileActions } from '.';
import { apiGetV2, apiPostV2 } from 'utils/http/request';
import History from 'app/components/History/History';

function* handleGetProfile(action: PayloadAction<any>) {
  try {
    const url = `/ez/profile/getinfo`;
    const response = yield call(apiGetV2, url, null);

    // not_exist_profile
    if (response.data.error === 11) {
      History.push('/404');
    }
    yield put(profileActions.responseGetProfile(response.data));
  } catch (error) {
    const response = {
      error: 1,
      message: 'system_error',
      data: null,
    };

    yield put(profileActions.responseGetProfile(response.data));
  }
}

function* handleUpdateProfile(action: PayloadAction<any>) {
  try {
    const url = `/ez/profile/update`;
    const payload = action.payload;
    const response = yield call(apiPostV2, url, payload, null);

    yield put(profileActions.responseUpdateProfile(response.data));
  } catch (error) {
    const response = {
      error: 1,
      message: 'system_error',
      data: null,
    };

    yield put(profileActions.responseUpdateProfile(response.data));
  }
}

export function* profileSaga() {
  yield takeLatest(profileActions.requestGetProfile.type, handleGetProfile);
  yield takeLatest(
    profileActions.requestUpdateProfile.type,
    handleUpdateProfile,
  );
}
