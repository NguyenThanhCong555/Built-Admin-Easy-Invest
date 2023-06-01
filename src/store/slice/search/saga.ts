import { call, put, takeLatest } from 'redux-saga/effects';
import { searchAction } from '.';
import { PayloadAction } from '@reduxjs/toolkit';
import { ISearchItems, IStateSearchData } from './type';
import { AxiosResponse } from 'axios';
import { IGetDataSeaerchRequest } from './response';
import { apiGetV2 } from 'utils/http/request';
// get data filter

export function* getDataFilter(action: PayloadAction<IStateSearchData>) {
  try {
    const { phone_numbe, begin_time, end_time, service, page } = action?.payload;

    const phone = phone_numbe ? `phone_numbe=${phone_numbe}` : ``;
    const beginTime = begin_time ? `&begin_time=${begin_time}` : ``;
    const endTime = end_time ? `&end_time=${end_time}` : ``;
    const serv = service || service !== '' ? `&service=${service}` : ``;
    const pa = page ? `&page=${page}` : ``;
    const url = `/ez/transaction/admin/filter?${phone}${serv}${beginTime}${endTime}${pa}`;

    const res: AxiosResponse<IGetDataSeaerchRequest> = yield call(apiGetV2, url, null);

    if (res.data.error == 0) {
      yield put(searchAction.responeGetDataFilter(res.data));
    }
  } catch (err) {}
}

// end get data filter

// Getinfo filter

export function* getInfoDataFilter(action: PayloadAction<any>) {
  try {
    const { transaction_id } = action?.payload;
    const id = transaction_id ? `?transaction_id=${transaction_id}` : '';
    const url = `/ez/transaction/admin/getinfo${id}`;
    const res: AxiosResponse<ISearchItems> = yield call(apiGetV2, url, null);
    if (res.data.error == 0) {
      yield put(searchAction.responseGetInfoFilter(res.data.data));
    } else {
      console.log('error get info data filter');
    }
  } catch (err) {
    console.log(err, 'error getInfoDataFilter');
  }
}

// end Getinfo filter

export function* searchSaga() {
  yield takeLatest(searchAction.requestGetDataFilter.type, getDataFilter);

  yield takeLatest(searchAction.requestGetInfoFilter.type, getInfoDataFilter);
}
