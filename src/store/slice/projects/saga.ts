import { PayloadAction } from '@reduxjs/toolkit';
import { call, delay, put, select, takeLatest } from 'redux-saga/effects';
import { apiGet, apiPost } from 'utils/http/request';
import { projectsActions } from '.';
import { authActions } from '../auth';
import { selectAuth } from '../auth/selectors';
import { store } from 'store/configureStore';

export function* FetchListProject() {
  try {
    const { id, token } = yield select(selectAuth);
    const url = '/ez/project/getall';

    const res = yield call(apiGet, url, { userid: id, token: token });

    console.log(res);
    yield put(projectsActions.responseGetAllProjects(res));
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
    const { id, token } = yield select(selectAuth);
    const projectId = action.payload.userid;
    const header = { userid: id, token: token };
    const response = yield call(
      apiGet,
      `/ez/project/getinfo?projectId=${projectId}`,
      header,
    );
    if (response.error === 0) {
      const data = response.data;
      yield put(projectsActions.getProjectInfo(data));
      // console.log(response.error);
    } else {
      console.log('connected error');
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
    const { id, token } = yield select(selectAuth);
    const header = { userid: id, token: token };
    const payload = {
      project_id: action.payload.project_id,
      coin_name: action.payload.coin_name,
      coin_avatar: action.payload.coin_avatar,
      rate_usdt_coin: action.payload.rate_usdt_coin,
      min_transfer: action.payload.min_transfer,
    };
    const res = yield call(apiPost, url, payload, header);
    if (res.error === 0) {
      yield put(projectsActions.responseAddInfoCoin(res));
      console.log(res, 'success');
    } else {
      console.log(res, 'error');
    }
  } catch {}
}

export function* editInfoCoin(action: PayloadAction<any>) {
  try {
    const url = '/ez/coin/update';
    const { id, token } = yield select(selectAuth);
    const header = { userId: id, token };
    const payload = {
      id: action.payload.id,
      project_id: action.payload.project_id,
      coin_name: action.payload.coin_name,
      coin_avatar: action.payload.coin_avatar,
      rate_usdt_coin: action.payload.rate_usdt_coin,
      min_transfer: action.payload.min_transfer,
    };
    const res = yield call(apiPost, url, payload, header);
    if (res.error === 0) {
      console.log(res, 'success');
    } else {
      console.log(res, 'error');
    }
  } catch {
    console.log('error');
  }
}

export function* CheckDuplicated(action: PayloadAction<any>) {
  try {
    const url = '/ez/coin/getlist';

    const { id, token } = yield select(selectAuth);
    const header = { userId: id, token };
    const res2 = yield call(apiGet, url, header);
    const res = yield call(apiGet, url, header);
    if (res.error === 0) {
      console.log(action.payload, 'this is res 27');
      const dataDuplicated = res2.data.coins.map(obj => obj.coin_name);
      yield put(projectsActions.responseDublicated(dataDuplicated));
    } else {
      console.log('false');
    }
  } catch {}
}

export function* lockProjectInfo(action: PayloadAction<any>) {
  try {
    const { id, token } = yield select(selectAuth);
    const url = '/ez/project/changestate';
    const payload = {
      projectId: action.payload.projectId,
      state: action.payload.isLock,
    };
    const header = {
      userid: id,
      token,
    };
    const res = yield call(apiPost, url, payload, header);
    store.dispatch(authActions.requestChangeProjects());
    console.log(payload, 'id Lock');
    // console.log(res, 'res');
  } catch {}
}

export function* handleCreateProject(action: PayloadAction<any>) {
  try {
    const { id, token } = yield select(selectAuth);
    const response = yield call(apiPost, '/ez/project/create', action.payload, {
      userid: id,
      token,
    });
    if (response.error === 0) {
      yield put(store.dispatch(authActions.requestChangeProjects()));
    }
    yield put(projectsActions.responseCreateProject(response));
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
    const { id, token } = yield select(selectAuth);
    const response = yield call(apiPost, '/ez/project/update', action.payload, {
      userid: id,
      token,
    });
    if (response.error === 0) {
      yield put(store.dispatch(authActions.requestChangeProjects()));
    }
    yield put(projectsActions.responseUpdateProject(response));
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
  yield takeLatest(
    projectsActions.requestCreateProject.type,
    handleCreateProject,
  );
  yield takeLatest(
    projectsActions.requestUpdateProject.type,
    handleUpdateProject,
  );
  yield takeLatest(projectsActions.requestProjectInfo.type, getInfoProject);
  yield takeLatest(projectsActions.requestLockproject.type, lockProjectInfo);
  yield takeLatest(projectsActions.requestAddInfoCoin.type, createInfoCoin);
  yield takeLatest(projectsActions.requestEditInfoCoin.type, editInfoCoin);
  yield takeLatest(projectsActions.ifdataisduplicated.type, CheckDuplicated);
  yield takeLatest(
    projectsActions.requestGetAllProjects.type,
    FetchListProject,
  );
}
