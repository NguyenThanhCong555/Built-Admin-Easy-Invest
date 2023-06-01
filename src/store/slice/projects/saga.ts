import { PayloadAction } from '@reduxjs/toolkit';
import { call, delay, put, select, takeLatest } from 'redux-saga/effects';
import { apiGet, apiGetV2, apiPost, apiPostV2 } from 'utils/http/request';
import { projectsActions } from '.';
import { authActions } from '../auth';
import { selectAuth } from '../auth/selectors';
import { store } from 'store/configureStore';

export function* FetchListProject(action: PayloadAction<any>) {
  try {
    const url = '/ez/project/getall';
    const res = yield call(apiGetV2, url, null);
    yield put(
      projectsActions.responseGetAllProjects({
        ...res.data,
      }),
    );
    // if (res.data.error === 0 && res.data.data) {
    //   yield put(projectsActions.responseGetAllProjects(res.data.data.projects));
    //   yield put(projectsActions.setCalledFirstProjects(true));
    //   yield put(projectsActions.resetLoading());
    // } else {
    //   yield put(projectsActions.setCalledFirstProjects(true));
    //   yield put(projectsActions.resetLoading());
    // }
  } catch (error) {
    const response = {
      error: 1,
      message: 'system_error',
      data: null,
    };
    yield put(projectsActions.responseGetAllProjects(response));
  }
}

export function* getInfoProject(action: PayloadAction<any>) {
  try {
    const projectId = action.payload.userid;
    const response = yield call(apiGetV2, `/ez/project/getinfo?projectId=${projectId}`, null);

    if (response.data.error === 0) {
      const data = response.data.data;
      yield put(projectsActions.getProjectInfo(data));
    } else {
      // Reset response
      yield put(projectsActions.resetResponse());
    }
  } catch {
    console.log('err');
  }
}

export function* createInfoCoin(action: PayloadAction<any>) {
  try {
    const url = '/ez/coin/create';
    const payload = {
      project_id: action.payload.project_id,
      coin_name: action.payload.coin_name,
      coin_avatar: action.payload.coin_avatar,
      rate_usdt_coin: action.payload.rate_usdt_coin,
      min_transfer: action.payload.min_transfer,
      selling_fee: action.payload.selling_fee,
      purchase_fee: action.payload.purchase_fee,
    };
    const res = yield call(apiPostV2, url, payload, null);
    if (res.error === 0) {
      yield put(projectsActions.responseAddInfoCoin(res.data));
    } else {
    }
  } catch {}
}

export function* editInfoCoin(action: PayloadAction<any>) {
  try {
    const url = '/ez/coin/update';
    const payload = {
      id: action.payload.id,
      project_id: action.payload.project_id,
      coin_name: action.payload.coin_name,
      coin_avatar: action.payload.coin_avatar,
      rate_usdt_coin: action.payload.rate_usdt_coin,
      min_transfer: action.payload.min_transfer,
      selling_fee: action.payload.selling_fee,
      purchase_fee: action.payload.purchase_fee,
    };
    const res = yield call(apiPostV2, url, payload, null);
    if (res.data.error === 0) {
      yield put(projectsActions.responseEditInfoCoin(res.data));
    } else {
    }
  } catch {
    console.log('error');
  }
}

export function* CheckDuplicated(action: PayloadAction<any>) {
  try {
    const url = 'ez/coin/getall';
    const res2 = yield call(apiGetV2, url, null);
    const res = yield call(apiGetV2, url, null);
    if (res.data.error === 0) {
      const dataDuplicated = res2.data.data.coins.map(obj => obj.coin_name);
      yield put(projectsActions.responseDublicated(dataDuplicated));
    } else {
      console.log('false');
    }
  } catch {}
}

export function* lockProjectInfo(action: PayloadAction<any>) {
  try {
    const url = '/ez/project/changestate';
    const payload = {
      projectId: action.payload.projectId,
      state: action.payload.isLock,
    };
    const res = yield call(apiPostV2, url, payload, null);

    yield put(
      projectsActions.responseLockProject({
        ...res.data,
        state: action.payload.isLock,
      }),
    );
  } catch {
    const response = {
      error: 1,
      message: 'system_error',
      data: null,
    };
    yield put(
      projectsActions.responseLockProject({
        ...response,
        state: action.payload.isLock,
      }),
    );
  }
}

export function* handleCreateProject(action: PayloadAction<any>) {
  try {
    const response = yield call(apiPostV2, '/ez/project/create', action.payload, null);
    if (response.data.error === 0) {
      yield put(store.dispatch(authActions.requestChangeProjects()));
    }
    yield put(projectsActions.responseCreateProject(response.data));
  } catch (error) {
    const response = {
      error: 1,
      message: 'system_error',
      data: null,
    };
    yield put(projectsActions.responseCreateProject(response));
  }
}

export function* handleUpdateProject(action: PayloadAction<any>) {
  try {
    const response = yield call(apiPostV2, '/ez/project/update', action.payload, null);
    if (response.data.error === 0) {
      yield put(store.dispatch(authActions.requestChangeProjects()));
    }
    yield put(projectsActions.responseUpdateProject(response.data));
  } catch (error) {
    const response = {
      error: 1,
      message: 'system_error',
      data: null,
    };
    yield put(projectsActions.responseUpdateProject(response));
  }
}

export function* projectsSaga() {
  yield takeLatest(projectsActions.requestCreateProject.type, handleCreateProject);
  yield takeLatest(projectsActions.requestUpdateProject.type, handleUpdateProject);
  yield takeLatest(projectsActions.requestProjectInfo.type, getInfoProject);
  yield takeLatest(projectsActions.requestLockproject.type, lockProjectInfo);
  yield takeLatest(projectsActions.requestAddInfoCoin.type, createInfoCoin);
  yield takeLatest(projectsActions.requestEditInfoCoin.type, editInfoCoin);
  yield takeLatest(projectsActions.ifdataisduplicated.type, CheckDuplicated);
  yield takeLatest(projectsActions.requestGetAllProjects.type, FetchListProject);
}
