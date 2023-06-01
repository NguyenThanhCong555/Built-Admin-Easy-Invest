import { AxiosResponse } from 'axios';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, select, takeLatest, delay } from 'redux-saga/effects';

import { apiGet, apiGetV2, apiPost, apiPostV2 } from 'utils/http/request';
import { usersActions as actions } from '.';
import { RESPONSE_SUCCESS_ERROR } from 'constants/common';

import { selectAuth } from '../auth/selectors';
import { TUserInformation, TCoinInfo } from './types';
import {
  GetUserInformationResponse,
  GetWalletOfUserResponse,
  HistoryResponse,
  RESPONSE_ERROR_NOT_EXPIRES_ACCOUNT,
} from './response';
import { BaseResponse } from 'utils/http/response';
import { getRequestHistory, requestCreateNewRequestPlusOrSubtract } from './request';
import { systemActions } from '../system';
import { IGetDetailRequest } from '../request/response';

function* fetchUserInformation(action: PayloadAction<{ phoneNumber: string }>) {
  try {
    const url = `/ez/user/admin/finduser?phone_number=${action.payload.phoneNumber}`;

    const res: AxiosResponse<GetUserInformationResponse> = yield call(apiGetV2, url, null);
    console.log(res);

    if (res.data.error === RESPONSE_SUCCESS_ERROR) {
      yield put(actions.updateUserInformation(res.data.data));
    } else if (res.data.error === RESPONSE_ERROR_NOT_EXPIRES_ACCOUNT) {
      yield put(actions.resetUserInfo());
    }
    yield put(actions.setResponseErrorUsers({ error: res.data.error, message: res.data.message }));
    yield put(actions.resetLoading());
  } catch (error) {
    if (error) console.log(error);
  }
}

function* fetchWalletInformationOfUser(action: PayloadAction<{ userId: number }>) {
  try {
    const url = `/ez/wallet/admin/getinfo?userid=${action.payload.userId}`;

    const res: AxiosResponse<GetWalletOfUserResponse> = yield call(apiGetV2, url, null);
    console.log(res);

    if (res.data.error === RESPONSE_SUCCESS_ERROR) {
      const listcoin: TCoinInfo[] = res.data.data.assets;
      yield put(actions.updateCoinUSDT(listcoin));
      yield put(actions.updateListCoins(listcoin));
    }
  } catch (error) {
    if (error) console.log(error);
  }
}

function* fetchUnblockAccountOfUser(action: PayloadAction<{ userId: number; status: number }>) {
  try {
    const url = `/ez/user/block`;

    const body = {
      userid: action.payload.userId,
      status: action.payload.status,
    };

    const res: AxiosResponse<BaseResponse> = yield call(apiPostV2, url, body, null);
    console.log(res);

    if (res.data.error === RESPONSE_SUCCESS_ERROR) {
      yield put(actions.setStatusOfUserWhenLockAccount({ status: body.status }));
    }
    yield put(actions.setResponseErrorBlockAccount({ error: res.data.error }));
    yield put(actions.resetLoadingBlockAccount());
  } catch (error) {
    if (error) console.log(error);
  }
}

function* fetchCreateRequestPlusBalance(action: PayloadAction<requestCreateNewRequestPlusOrSubtract>) {
  try {
    const url = `/ez/request/admincreatedeposit`;
    const payload = action.payload;

    const res: AxiosResponse<BaseResponse> = yield call(apiPostV2, url, payload, null);
    console.log(res);

    yield put(actions.setErrorCreateRequest({ error: res.data.error }));
    yield put(actions.resetLoadingCreateRequest());
  } catch (error) {
    if (error) console.log(error);
  }
}

function* fetchCreateRequestSubtractBalance(action: PayloadAction<requestCreateNewRequestPlusOrSubtract>) {
  try {
    const url = `/ez/request/admincreatewithdraw`;
    const payload = action.payload;

    const res: AxiosResponse<BaseResponse> = yield call(apiPostV2, url, payload, null);
    console.log(res);

    yield put(actions.setErrorCreateRequest({ error: res.data.error }));
    yield put(actions.resetLoadingCreateRequest());
  } catch (error) {
    if (error) console.log(error);
  }
}

// plus
export function* fetchGetRequestHistoryPlug(action: PayloadAction<getRequestHistory>) {
  try {
    const payload = action.payload;
    let url = `/ez/request/admingetbyservice?page=${payload.page ? payload.page : 1}&service=${payload.service}`;
    if (payload.beginTime !== 0) url = `${url}&begin_time=${payload.beginTime}`;
    if (payload.endTime !== 0) url = `${url}&end_time=${payload.endTime}`;
    if (payload.status !== undefined && typeof payload.status === 'number') url = `${url}&status=${payload.status}`;
    if (payload.userId) url = `${url}&userid=${payload.userId}`;

    const res: AxiosResponse<HistoryResponse> = yield call(apiGetV2, url, null);

    if (res.data.error === RESPONSE_SUCCESS_ERROR) {
      yield put(actions.responseFilterHistoryPlus({ response: res.data, page: payload.page }));
    }
    yield put(actions.resetLoadingHistoryPlug());
  } catch (error) {
    throw new Error(error);
  }
}
export function* fetchRefreshHistoryPlug(action: PayloadAction<getRequestHistory>) {
  try {
    const payload = action.payload;
    let url = `/ez/request/admingetbyservice?page=${payload.page ? payload.page : 1}&service=${payload.service}`;
    if (payload.beginTime !== 0) url = `${url}&begin_time=${payload.beginTime}`;
    if (payload.endTime !== 0) url = `${url}&end_time=${payload.endTime}`;

    const res: AxiosResponse<HistoryResponse> = yield call(apiGetV2, url, null);

    if (res.data.error === RESPONSE_SUCCESS_ERROR) {
      yield put(actions.responseRefreshFilterHistoryPlus(res.data));
    }
    yield put(actions.resetLoadingHistoryPlug());
  } catch (error) {
    throw new Error(error);
  }
}

// subtract
export function* fetchGetRequestHistorySubtract(action: PayloadAction<getRequestHistory>) {
  try {
    const payload = action.payload;

    let url = `/ez/request/admingetbyservice?page=${payload.page ? payload.page : 1}&service=${payload.service}`;
    if (payload.beginTime !== 0) url = `${url}&begin_time=${payload.beginTime}`;
    if (payload.endTime !== 0) url = `${url}&end_time=${payload.endTime}`;
    if (payload.status !== undefined && typeof payload.status === 'number') url = `${url}&status=${payload.status}`;
    if (payload.userId) url = `${url}&userid=${payload.userId}`;

    const res: AxiosResponse<HistoryResponse> = yield call(apiGetV2, url, null);

    if (res.data.error === RESPONSE_SUCCESS_ERROR) {
      yield put(actions.responseFilterHistorySubtract({ response: res.data, page: payload.page }));
    }
    yield put(actions.resetLoadingHistorySubtract());
  } catch (error) {
    throw new Error(error);
  }
}
export function* fetchRefreshHistorySubtract(action: PayloadAction<getRequestHistory>) {
  try {
    const payload = action.payload;
    let url = `/ez/request/admingetbyservice?page=${payload.page ? payload.page : 1}&service=${payload.service}`;
    if (payload.beginTime !== 0) url = `${url}&begin_time=${payload.beginTime}`;
    if (payload.endTime !== 0) url = `${url}&end_time=${payload.endTime}`;

    const res: AxiosResponse<HistoryResponse> = yield call(apiGetV2, url, null);

    if (res.data.error === RESPONSE_SUCCESS_ERROR) {
      yield put(actions.responseRefreshFilterHistorySubtract(res.data));
    }
    yield put(actions.resetLoadingHistorySubtract());
  } catch (error) {
    throw new Error(error);
  }
}

// get detail request recharge
function* fetchGetDetailRequestRecharge(action: PayloadAction<{ requestId: number }>) {
  try {
    const requestId = action.payload.requestId;
    const url = `/ez/request/getinfo?request_id=${requestId}`;

    const res: AxiosResponse<IGetDetailRequest> = yield call(apiGetV2, url, null);

    console.log(res.data);
    if (res.data.error === RESPONSE_SUCCESS_ERROR) {
      yield put(actions.responseUpdateDetailRequest(res.data.data));
      yield put(actions.addRequestIdToCalledDetailRequest({ requestId }));
    }
    yield put(actions.resetLoadingGetDetailRequest());
  } catch (error) {
    const response = {
      error: 1,
      message: 'system_error',
      data: null,
    };
    if (error) console.log(error);
  }
}

// delete request
function* fetchDeleteRequestCreated(action: PayloadAction<{ requestId: number }>) {
  try {
    const requestId = action.payload.requestId;
    const url = `/ez/request/revoke`;

    const res: AxiosResponse<IGetDetailRequest> = yield call(apiPostV2, url, { request_id: requestId }, null);

    console.log(res.data);
    if (res.data.error === RESPONSE_SUCCESS_ERROR) {
      yield put(actions.deleteRequestInDetailRequest({ requestId }));
    }
    yield put(actions.resetLoadingCancelCreatedRequest());
    yield put(actions.setErrorDeleteRequest({ error: res.data.error }));
  } catch (error) {
    const response = {
      error: 1,
      message: 'system_error',
      data: null,
    };
    if (error) console.log(error);
  }
}

export function* usersSaga() {
  //request user info
  yield takeLatest(actions.requestGetUserInformation.type, fetchUserInformation);
  //request wallet info
  yield takeLatest(actions.requestGetWalletInfoOfUser.type, fetchWalletInformationOfUser);
  // block account
  yield takeLatest(actions.requestBlockAccount.type, fetchUnblockAccountOfUser);
  // plus balance
  yield takeLatest(actions.requestCreateRequestPlusBalance.type, fetchCreateRequestPlusBalance);
  // subtract balance
  yield takeLatest(actions.requestCreateRequestSubtractBalance.type, fetchCreateRequestSubtractBalance);
  // get list history Plug
  yield takeLatest(actions.requestGetRequestHistoryPlus.type, fetchGetRequestHistoryPlug);
  yield takeLatest(actions.requestRefreshHistoryPlus.type, fetchRefreshHistoryPlug);
  // get list history subtract
  yield takeLatest(actions.requestGetRequestHistorySubtract.type, fetchGetRequestHistorySubtract);
  yield takeLatest(actions.requestRefreshHistorySubtract.type, fetchRefreshHistorySubtract);

  // get Detail request recharge
  yield takeLatest(actions.requestGetDetailRequest.type, fetchGetDetailRequestRecharge);

  // delete request
  yield takeLatest(actions.requestCancelRequest.type, fetchDeleteRequestCreated);
}
