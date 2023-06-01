import { PayloadAction } from '@reduxjs/toolkit';
import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { apiGetV2, apiPostV2 } from 'utils/http/request';
import History from 'app/components/History/History';
import { bankActions } from '.';

function* fetchListBank() {
  try {
    const url = `/ez/banking/getall`;
    const response = yield call(apiGetV2, url, null);

    console.log(response);

    yield put(bankActions.responseGetListBank(response.data));
  } catch (error) {
    const response = {
      error: 1,
      message: 'system_error',
      data: null,
    };

    yield put(bankActions.responseGetListBank(response));
  }
}

function* addNewBank(action: PayloadAction<any>) {
  try {
    const url = `/ez/banking/createaccount`;
    const response = yield call(apiPostV2, url, action.payload, null);

    // yield delay(1000);
    // const response = {
    //   data: {
    //     error: 0,
    //     message: 'success',

    //     data: {
    //       id: 12,
    //       banking_name: 'NgÃ¢n haÌ€ng TMCP NgoaÌ£i ThÆ°Æ¡ng ViÃªÌ£t Nam',
    //       banking_logo: 'https://api.vietqr.io/img/VCB.png',
    //       account_name: 'DUONG VIET THANG',
    //       account_number: '123',
    //       qr_code: 'https://i.ibb.co/b5GLf5X/qr.png',
    //       status: 1,
    //     },
    //   },
    // };

    yield put(bankActions.responseAddNewBank(response.data));
  } catch (error) {
    const response = {
      error: 1,
      message: 'system_error',
      data: null,
    };

    yield put(bankActions.responseAddNewBank(response));
  }
}

function* updateBank(action: PayloadAction<any>) {
  try {
    const url = `/ez/banking/updateaccount`;

    const response = yield call(apiPostV2, url, action.payload, null);

    // yield delay(1000);
    // const response = {
    //   data: {
    //     error: 0,
    //     message: 'success',

    //     data: {
    //       id: 12,
    //       banking_name: 'NgÃ¢n haÌ€ng TMCP NgoaÌ£i ThÆ°Æ¡ng ViÃªÌ£t Nam',
    //       banking_logo: 'https://api.vietqr.io/img/VCB.png',
    //       account_name: 'DUONG VIET THANG',
    //       account_number: '123',
    //       qr_code: 'https://i.ibb.co/b5GLf5X/qr.png',
    //       status: 1,
    //     },
    //   },
    // };

    yield put(bankActions.responseUpdateBank(response.data));
  } catch (error) {
    const response = {
      error: 1,
      message: 'system_error',
      data: null,
    };

    yield put(bankActions.responseUpdateBank(response));
  }
}

function* changeStatus(action: PayloadAction<any>) {
  try {
    const url = `/ez/banking/udpatestatus`;
    const { banking_account_id, status } = action.payload;

    const response = yield call(apiPostV2, url, action.payload, null);

    yield put(bankActions.responseChangeStatus({ ...response.data, id: banking_account_id, status }));
  } catch (error) {
    const response = {
      error: 1,
      message: 'system_error',
      data: null,
    };

    yield put(bankActions.responseChangeStatus(response));
  }
}

export function* bankSaga() {
  yield takeLatest(bankActions.requestGetListBank.type, fetchListBank);
  yield takeLatest(bankActions.requestAddNewBank.type, addNewBank);
  yield takeLatest(bankActions.requestUpdateBank.type, updateBank);
  yield takeLatest(bankActions.requestChangeStatus.type, changeStatus);
}
