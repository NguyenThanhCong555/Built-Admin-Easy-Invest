import { formatPhoneFilterRequest } from 'utils/helpers/formatPhoneFilterRequest';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { apiGetV2, apiPostV2 } from 'utils/http/request';
import History from 'app/components/History/History';
import { requestActions } from '.';
import { AxiosResponse } from 'axios';
import { IGetDetailRequest } from './response';
import { RESPONSE_SUCCESS_ERROR } from 'constants/common';
import { BaseResponse, ErrorResponse } from 'utils/http/response';
import { IFilterRequest, RequestAcceptWithdraw, TRequestListWithdraw } from './types';

// lấy ra dữ liệu từng item của addition và Requirements
export function* getdataItemAddAndRequire(action: PayloadAction<any>) {
  try {
    const request_id = action.payload;
    console.log(request_id, 'saga');
    const url = `/ez/request/getinfo?request_id=${request_id}`;
    const res = yield call(apiGetV2, url);
    if (res.data.error === 0 && res.data.data) {
      yield put(requestActions.responseItemAddAndRequire(res.data));
    }
  } catch (err) {
    console.log('err');
  }
}

// get data addition
export function* getDataAddition(action: PayloadAction<any>) {
  try {
    const { request_id, role, requester_phone, service, page, begin_time, end_time, status } = action.payload;

    const requestId = request_id ? `&request_id=${request_id}` : '';
    const requesterPhone = requester_phone ? `&requester_phone=${formatPhoneFilterRequest(requester_phone)}` : '';
    const beginTime = begin_time ? `&begin_time=${begin_time}` : '';
    const endTime = end_time ? `&end_time=${end_time}` : '';
    const statusRequest = status ? `&status=${status}` : '';
    const setRole = role ? `&role=${role}` : '';

    const params = `?service=${service}&page=${page}${setRole}${endTime}${statusRequest}${beginTime}${requestId}${requesterPhone}`;

    const url = `/ez/request/getlist${params}`;

    const res = yield call(apiGetV2, url, null);
    if (res.data.error === RESPONSE_SUCCESS_ERROR) {
      yield put(requestActions.responseRequestDataAddition(res.data));
    }
  } catch (err) {
    const response = {
      error: 1,
      message: 'system_error',
      data: null,
    };

    yield put(requestActions.responseDeposit(response));
  }
}

// đồng ý duyệt yêu cầu cộng
export function* getAcceptAdditionRequest(action: PayloadAction<any>) {
  try {
    const url = `/ez/request/accept`;
    const payload = {
      request_id: action.payload.request_id,
      service: action.payload.service,
    };
    const res = yield call(apiPostV2, url, payload);
    if (res?.data.error === 0) {
      const payload = {
        res: res?.data.error,
        request_id: action.payload.request_id,
        service: action.payload.service,
      };
      yield put(requestActions.responseAcceptAdditionRequest(payload));
    }
  } catch (err) {
    const response = {
      error: 1,
      message: 'system_error',
      data: null,
    };

    // yield put(requestActions.responseAcceptAdditionRequest(response));
  }
}

// get data deposit
export function* getRequestDeposit(action: PayloadAction<any>) {
  try {
    const { service, page, role } = action.payload;
    const url = `/ez/request/getlist?service=${service}&page=${page}&role=${role}`;
    const res = yield call(apiGetV2, url, null);
    yield put(requestActions.responseDeposit(res.data));
    console.log(service, 'this is service');
    console.log(page, 'this is page');
    console.log(role, 'this is role');
    console.log(res, 'this is res ');
  } catch (err) {
    const response = {
      error: 1,
      message: 'system_error',
      data: null,
    };

    yield put(requestActions.responseDeposit(response));
  }
}
// từ chối
export function* setDepositRefuse(action: PayloadAction<any>) {
  try {
    const url = '/ez/request/decline';
    const payload = {
      request_id: action.payload.request_id,
    };

    const res = yield call(apiPostV2, url, payload);
    console.log(res, 'response');

    yield put(
      requestActions.responseDepositRefuse({
        ...res.data,
        service: action.payload.service,
        request_id: action.payload.request_id,
        isDetail: action.payload?.isDetail,
        curentTime: action.payload?.currenTime,
      }),
    );
  } catch (err) {
    const response = {
      error: 1,
      message: 'system_error',
      data: null,
    };

    yield put(
      requestActions.responseDepositRefuse({
        ...response,
        service: action.payload.service,
        request_id: action.payload.request_id,
        isDetail: action.payload?.isDetail,
        curentTime: action.payload?.currenTime,
      }),
    );
  }
}

// Withdraw - Rút tiền
function* fetchListWithdraw(action: PayloadAction<TRequestListWithdraw>) {
  try {
    const { service, page } = action.payload;
    const url = `/ez/request/getlist?service=${service}&page=${page}`;

    const response = yield call(apiGetV2, url, null);
    yield put(requestActions.responseGetListWithdraw(response.data));
  } catch (error) {
    const response = {
      error: 1,
      message: 'system_error',
      data: null,
    };

    yield put(requestActions.responseGetListWithdraw(response));
  }
}

// Filter - Rút và Nạp
function* fetchFilterListRequest(action: PayloadAction<IFilterRequest>) {
  try {
    const { request_id, role, requester_phone, service, page, begin_time, end_time, status } = action.payload;

    // Kiểm tra nếu object truyền vào có các trường filter thì mới thêm vào params
    const requestId = request_id ? `&request_id=${request_id}` : '';
    const requesterPhone = requester_phone ? `&requester_phone=${formatPhoneFilterRequest(requester_phone)}` : '';
    const beginTime = begin_time ? `&begin_time=${begin_time}` : '';
    const endTime = end_time ? `&end_time=${end_time}` : '';
    const statusRequest = status !== 2 ? `&status=${status}` : '';
    const setRole = role !== 2 ? `&role=${role}` : '';

    const params =
      `?service=${service}&page=${page}` + requestId + requesterPhone + beginTime + endTime + statusRequest + setRole;

    const url = `/ez/request/getlist${params}`;

    const response = yield call(apiGetV2, url, null);
    yield put(requestActions.responseFilterListRequests({ ...response.data, service, role }));
  } catch (error) {
    const { service, role } = action.payload;
    const response = {
      error: 1,
      message: 'system_error',
      data: null,
    };

    yield put(requestActions.responseFilterListRequests({ ...response, service, role }));
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
      yield put(requestActions.responseUpdateDetailRequest(res.data.data));
      yield put(requestActions.addRequestIdToCalledDetailRequest({ requestId }));
    }
    yield put(requestActions.resetLoadingRequest());
  } catch (error) {
    const response = {
      error: 1,
      message: 'system_error',
      data: null,
    };

    yield put(requestActions.responseFilterListRequests(response));
  }
}

// function* fetchListRequest(action: PayloadAction<any>) {
//   try {
//     const {
//       request_id,
//       requester_phone,
//       service,
//       page,
//       begin_time,
//       end_time,
//       status,
//     } = action.payload;

// Accept Withdraw

function* handleAcceptWithdraw(action: PayloadAction<RequestAcceptWithdraw>) {
  try {
    const { request_id, transfered_order_code, real_exchange, service, isDetail } = action.payload;
    const url = `/ez/request/accept`;

    const response = yield call(apiPostV2, url, {
      request_id,
      order_transferred_code: transfered_order_code,
      real_exchange,
    });

    console.log('r', action.payload);

    yield put(
      requestActions.responseAcceptRequest({
        ...response.data,
        request_id,
        service,
        isDetail,
        real_exchange: real_exchange,
      }),
    );
  } catch (error) {
    const { request_id, service, isDetail, real_exchange } = action.payload;
    const response = {
      error: 1,
      message: 'system_error',
      data: null,
    };
    yield put(requestActions.responseAcceptRequest({ ...response, request_id, service, isDetail, real_exchange }));
  }
}

export function* requestSaga() {
  yield takeLatest(requestActions.requestDeposit.type, getRequestDeposit);
  yield takeLatest(requestActions.requestDepositRefuse.type, setDepositRefuse);
  yield takeLatest(requestActions.requestGetListWithdraw.type, fetchListWithdraw);

  yield takeLatest(requestActions.requestFilterListRequests.type, fetchFilterListRequest);

  // get Detail request recharge
  yield takeLatest(requestActions.requestGetDetailRequest.type, fetchGetDetailRequestRecharge);

  yield takeLatest(requestActions.requestAcceptRequest.type, handleAcceptWithdraw);

  yield takeLatest(requestActions.requestRequestDataAddition.type, getDataAddition);
  yield takeLatest(requestActions.requestAcceptAdditionRequest.type, getAcceptAdditionRequest);
  // lấy ra dữ liệu từng item của addition và Requirements
  yield takeLatest(requestActions.requestItemAddAndRequire.type, getdataItemAddAndRequire);
}
