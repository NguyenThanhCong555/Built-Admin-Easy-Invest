import History from 'app/components/History/History';
import { authActions } from '.';
import { call, put, takeLatest } from 'redux-saga/effects';
import { apiGet, apiPost } from 'utils/http/request';
import { getLocalStorage } from 'utils/storage/local';
import { checkDeviceId } from 'utils/helpers/checkDeviceId';
import { getCookie } from 'utils/helpers/getCookie';
import { stakeActions } from '../stacke';
import { projectsActions } from '../projects';
import { RESPONSE_SUCCESS_ERROR } from 'constants/common';
import { PayloadAction } from '@reduxjs/toolkit';

export function* handleGetOtp(action) {
  try {
    const res = yield call(apiGet, '/ez/getotp', {
      numberphone: action.payload,
    });
    const { error, message } = res;
    yield put(
      authActions.getOtp({
        login: {
          error: error,
          message: message,
        },
      }),
    );
  } catch {}
}

export function* handleLoginByTelegram() {
  try {
    const header = {};
    const res = yield call(apiGet, '/ez/getlinklogin', header);
    const { link } = res.data;
    window.open(link, '_blank');
  } catch {}
}

export function* loginDirectlyByTelegram(
  action: PayloadAction<{ id: string; token: string }>,
) {
  checkDeviceId();
  const body = action.payload;
  const deviceId = getCookie('device_id_iz');
  const sessionInfo = window.navigator.userAgent;

  const url = `/ez/loginbylink?device_id=${deviceId}&session_info=${sessionInfo}`;

  const data = yield call(apiPost, url, body, null);

  console.log(data);
  if (data.error === RESPONSE_SUCCESS_ERROR) {
    yield put(
      authActions.loginByOtp({
        id: data.data.id,
        token: data.data.token,
        username: data.data.username,
        refreshToken: data.data.refresh_token,
        refreshToken_time: data.data.token_exp_time,
      }),
    );
  }
  yield put(
    authActions.setResponseUser({ error: data.error, message: data.message }),
  );
}

export function* handleLoginByOtp(action) {
  try {
    checkDeviceId();
    const deviceId = getCookie('device_id_iz');
    const sessionInfo = window.navigator.userAgent;
    console.log(deviceId);
    console.log(sessionInfo);
    const header = {};
    const { numberphone, otp } = action.payload;
    const body = {
      otp: otp,
      numberphone: numberphone,
    };
    const res = yield call(
      apiPost,
      `/ez/loginbyotp?device_id=${deviceId}&session_info=${sessionInfo}`,
      body,
      header,
    );
    const { error, data, message } = res;
    if (error === 0 && data.role === 1) {
      yield put(
        authActions.loginByOtp({
          id: data.id,
          token: data.token,
          username: data.username,
          refreshToken: data.refresh_token,
          refreshToken_time: data.token_exp_time,
        }),
      );
      yield History.push('/home');
    } else if (error === 12 || error === 10) {
      yield put(
        authActions.loginByOtpFail({
          login: {
            error: error,
            message: message,
          },
        }),
      );
    }
  } catch {}
}

export function* handleLogout() {
  try {
    const { id, token } = getLocalStorage('persist:admin', 'auth');
    const res = yield call(
      apiPost,
      '/ez/logout',
      {},
      {
        userid: id,
        token: token,
      },
    );
    const { error } = res;
    if (error === 0) {
      yield put(authActions.logoutSuccess());
      yield put(stakeActions.resetStakeAll());
      yield put(projectsActions.resetProjectsAll());
      yield History.push('/');
    }
  } catch {}
}
export function* authSaga() {
  yield takeLatest(authActions.requestGetOtp.type, handleGetOtp);
  yield takeLatest(
    authActions.requestLoginByTelegram.type,
    handleLoginByTelegram,
  );
  yield takeLatest(authActions.requestLoginByOtp.type, handleLoginByOtp);
  yield takeLatest(authActions.requestLogout.type, handleLogout);

  // login by telegram
  yield takeLatest(
    authActions.requestLoginDirectlyTelegram.type,
    loginDirectlyByTelegram,
  );
}
