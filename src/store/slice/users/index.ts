import { useEffect } from 'react';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TCoinInfo, TUserInformation, Users } from './types';
import { INITIAL_VALUE } from 'constants/common';
import { getRequestHistory, requestCreateNewRequestPlusOrSubtract } from './request';
import { HistoryResponse } from './response';
import { TDetailRequest } from '../request/types';

export const initialState: Users = {
  userInfo: null,
  coinUsdt: null,
  coins: [],

  historyPlus: [],
  totalPageOfHistoryPlus: INITIAL_VALUE,
  totalPageLocalOfHistoryPlus: 1, // 1: initial one page

  historySubtract: [],
  totalPageOfHistorySubtract: INITIAL_VALUE,
  totalPageLocalOfHistorySubtract: 1, // 1: initial one page

  detailRequest: [],
  calledDetailRequest: [],

  response: {
    loading: false,
    loadingBlockAccount: false,
    loadingCreateRequest: false,
    loadingHistoryPlus: false,
    loadingHistorySubtract: false,
    loadingGetDetailRequest: false,
    loadingCancelCreatedRequest: false,

    error: INITIAL_VALUE,
    message: '',

    errorBlockAccount: INITIAL_VALUE,
    errorCreateRequest: INITIAL_VALUE,
    errorDeleteRequest: INITIAL_VALUE,
  },
};

const slice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // reset
    resetLoading(state: Users) {
      state.response.loading = false;
    },
    resetLoadingCreateRequest(state: Users) {
      state.response.loadingCreateRequest = false;
    },
    resetUserInfo(state: Users) {
      state.userInfo = null;
    },
    resetLoadingBlockAccount(state: Users) {
      state.response.loadingBlockAccount = false;
    },
    resetResponseErrorOfUsers(state: Users) {
      state.response.error = INITIAL_VALUE;
      state.response.message = '';
    },
    resetResponseErrorBlockAccount(state: Users) {
      state.response.errorBlockAccount = INITIAL_VALUE;
    },
    resetErrorCreateRequest(state: Users) {
      state.response.errorCreateRequest = INITIAL_VALUE;
    },
    resetErrorDeleteRequest(state: Users) {
      state.response.errorDeleteRequest = INITIAL_VALUE;
    },
    resetLoadingHistoryPlug(state: Users) {
      state.response.loadingHistoryPlus = false;
    },
    resetLoadingHistorySubtract(state: Users) {
      state.response.loadingHistorySubtract = false;
    },
    resetLoadingGetDetailRequest(state: Users) {
      state.response.loadingGetDetailRequest = false;
    },
    resetLoadingCancelCreatedRequest(state: Users) {
      state.response.loadingCancelCreatedRequest = false;
    },
    resetFieldOfUsersAll(state: Users) {
      return { ...initialState };
    },

    //set
    setResponseErrorUsers(state: Users, action: PayloadAction<{ error: number; message: string }>) {
      state.response.error = action.payload.error;
      state.response.message = action.payload.message;
    },
    setLoadingBlockAccount(state: Users) {
      state.response.loadingBlockAccount = true;
    },
    setResponseErrorBlockAccount(state: Users, action: PayloadAction<{ error: number }>) {
      state.response.errorBlockAccount = action.payload.error;
    },
    setErrorCreateRequest(state: Users, action: PayloadAction<{ error: number }>) {
      state.response.errorCreateRequest = action.payload.error;
    },
    setErrorDeleteRequest(state: Users, action: PayloadAction<{ error: number }>) {
      state.response.errorDeleteRequest = action.payload.error;
    },

    // get user information
    requestGetUserInformation(state: Users, action: PayloadAction<{ phoneNumber: string }>) {
      state.response.loading = true;
    },
    updateUserInformation(state: Users, action: PayloadAction<TUserInformation>) {
      state.userInfo = action.payload;
    },

    // get wallet info of User
    requestGetWalletInfoOfUser(state: Users, action: PayloadAction<{ userId: number }>) {},

    updateCoinUSDT(state: Users, action: PayloadAction<TCoinInfo[]>) {
      const listCoins = action.payload;

      const COIN_ID_OF_USDT = 1;
      const indexCoinUsdt = listCoins.map(coin => coin.coin_id).indexOf(COIN_ID_OF_USDT);

      if (indexCoinUsdt !== -1) state.coinUsdt = listCoins[indexCoinUsdt];
    },
    updateListCoins(state: Users, action: PayloadAction<TCoinInfo[]>) {
      const deleteCount = 1;
      const COIN_ID_OF_USDT = 1;
      const listCoins = action.payload;

      const indexCoinUsdt = listCoins.map(coin => coin.coin_id).indexOf(COIN_ID_OF_USDT);
      if (indexCoinUsdt !== -1) listCoins.splice(indexCoinUsdt, deleteCount);
      state.coins = listCoins;
    },

    // block account
    requestBlockAccount(state: Users, action: PayloadAction<{ userId: number; status: number }>) {
      state.response.loadingBlockAccount = true;
    },
    setStatusOfUserWhenLockAccount(state: Users, action: PayloadAction<{ status: number }>) {
      if (state.userInfo) state.userInfo.status = action.payload.status;
    },

    // create request plus/subtract balance
    requestCreateRequestPlusBalance(state: Users, action: PayloadAction<requestCreateNewRequestPlusOrSubtract>) {
      state.response.loadingCreateRequest = true;
    },
    requestCreateRequestSubtractBalance(state: Users, action: PayloadAction<requestCreateNewRequestPlusOrSubtract>) {
      state.response.loadingCreateRequest = true;
    },

    // get history plug
    increaseTotalPageLocalHistoryPlus(state: Users) {
      state.totalPageLocalOfHistoryPlus += 1;
    },
    requestGetRequestHistoryPlus(state: Users, action: PayloadAction<getRequestHistory>) {
      state.response.loadingHistoryPlus = true;
    },
    requestRefreshHistoryPlus(state: Users, action: PayloadAction<getRequestHistory>) {
      state.response.loadingHistoryPlus = true;
    },
    responseFilterHistoryPlus(state: Users, action: PayloadAction<{ response: HistoryResponse; page: number }>) {
      const payload = action.payload.response;
      //reset data
      // if (!state.calledTransferHistory) state.transferHistory = [];
      if (action.payload.page === 1) {
        state.historyPlus = [];
        state.totalPageLocalOfHistoryPlus = 2;
      } else {
        state.totalPageLocalOfHistoryPlus += 1;
      }

      if (payload.data && payload.data.requests.length !== 0) {
        if (payload.data.total_page) state.totalPageOfHistoryPlus = payload.data.total_page;
        state.historyPlus = [...state.historyPlus, ...payload.data.requests];
      } else {
        state.totalPageOfHistoryPlus = 1;
        state.historyPlus = [];
      }
    },
    responseRefreshFilterHistoryPlus(state: Users, action: PayloadAction<HistoryResponse>) {
      if (action.payload.data && action.payload.data.requests) {
        const payload = action.payload.data;
        if (payload.requests.length === 0) {
          state.totalPageOfHistoryPlus = 0;
          state.totalPageLocalOfHistoryPlus = 1;
          state.historyPlus = [];
        }

        if (action.payload.data.total_page) state.totalPageOfHistoryPlus = action.payload.data.total_page;
        state.totalPageLocalOfHistoryPlus = 2;
        state.historyPlus = [...action.payload.data.requests];
      } else {
        state.totalPageOfHistoryPlus = 0;
        state.totalPageLocalOfHistoryPlus = 1;
        state.historyPlus = [];
      }
    },
    // get history subtract
    increaseTotalPageLocalHistorySubtract(state: Users) {
      state.totalPageLocalOfHistorySubtract += 1;
    },
    requestGetRequestHistorySubtract(state: Users, action: PayloadAction<getRequestHistory>) {
      state.response.loadingHistorySubtract = true;
    },
    requestRefreshHistorySubtract(state: Users, action: PayloadAction<getRequestHistory>) {
      state.response.loadingHistorySubtract = true;
    },
    responseFilterHistorySubtract(state: Users, action: PayloadAction<{ response: HistoryResponse; page: number }>) {
      const payload = action.payload.response;
      //reset data
      // if (!state.calledTransferHistory) state.transferHistory = [];
      if (action.payload.page === 1) {
        state.historySubtract = [];
        state.totalPageLocalOfHistorySubtract = 2;
      } else {
        state.totalPageLocalOfHistorySubtract += 1;
      }

      if (payload.data && payload.data.requests.length !== 0) {
        if (payload.data.total_page) state.totalPageOfHistorySubtract = payload.data.total_page;
        state.historySubtract = [...state.historySubtract, ...payload.data.requests];
      } else {
        state.totalPageOfHistorySubtract = 1;
        state.historySubtract = [];
      }
    },
    responseRefreshFilterHistorySubtract(state: Users, action: PayloadAction<HistoryResponse>) {
      if (action.payload.data && action.payload.data.requests) {
        const payload = action.payload.data;
        if (payload.requests.length === 0) {
          state.totalPageOfHistorySubtract = 0;
          state.totalPageLocalOfHistorySubtract = 1;
          state.historySubtract = [];
        }

        if (action.payload.data.total_page) state.totalPageOfHistorySubtract = action.payload.data.total_page;
        state.totalPageLocalOfHistorySubtract = 2;
        state.historySubtract = [...action.payload.data.requests];
      } else {
        state.totalPageOfHistorySubtract = 0;
        state.totalPageLocalOfHistorySubtract = 1;
        state.historySubtract = [];
      }
    },

    // get detail request recharge
    requestGetDetailRequest(state: Users, action: PayloadAction<{ requestId: number }>) {
      state.response.loadingGetDetailRequest = true;
    },

    addRequestIdToCalledDetailRequest(state: Users, action: PayloadAction<{ requestId: number }>) {
      const requestId = action.payload.requestId;

      state.calledDetailRequest.push(requestId);
    },

    responseUpdateDetailRequest(state: Users, action: PayloadAction<TDetailRequest>) {
      const payload = action.payload;

      const indexOfListRequestDetail = state.detailRequest.map(request => request.id).indexOf(payload.id);

      if (indexOfListRequestDetail !== -1) {
        state.detailRequest[indexOfListRequestDetail] = payload;
        return;
      }

      state.detailRequest.unshift(payload);
    },
    removeRequestIdInCalledDetailRequest(state: Users, action: PayloadAction<{ requestId: number }>) {
      const requestId = action.payload.requestId;

      let indexOfTarge = state.calledDetailRequest.indexOf(requestId);

      if (indexOfTarge === -1) {
        return;
      }
      state.calledDetailRequest[indexOfTarge] = state.calledDetailRequest[state.calledDetailRequest.length - 1];
      state.calledDetailRequest.pop();
    },

    // delete request created
    requestCancelRequest(state: Users, action: PayloadAction<{ requestId: number }>) {
      state.response.loadingCancelCreatedRequest = true;
    },
    deleteRequestInDetailRequest(state: Users, action: PayloadAction<{ requestId: number }>) {
      const deleteCount = 1;
      const requestId = action.payload.requestId;

      const indexOfListDetail = state.detailRequest.map(request => request.id).indexOf(requestId);
      state.detailRequest.splice(indexOfListDetail, deleteCount);
    },
  },
});

export const { actions: usersActions, reducer } = slice;

export const usersReducer = reducer;
