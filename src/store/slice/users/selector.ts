import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../types';
import { initialState } from './index';

const selectDomain = (state: RootState) => state.users || initialState;
export const selectUsers = createSelector([selectDomain], users => users);
export const selectUserInfo = createSelector([selectDomain], users => users.userInfo);
export const selectCoinUsdtOfUser = createSelector([selectDomain], users => users.coinUsdt);
export const selectListCoinUsdtOfUser = createSelector([selectDomain], users => users.coins);

export const selectHistoryPlus = createSelector([selectDomain], users => users.historyPlus);
export const selectHistorySubtract = createSelector([selectDomain], users => users.historySubtract);

export const selectTotalPageOfHistoryPlus = createSelector([selectDomain], widthdraw => widthdraw.totalPageOfHistoryPlus);
export const selectTotalPageLocalOfHistoryPlus = createSelector(
  [selectDomain],
  widthdraw => widthdraw.totalPageLocalOfHistoryPlus,
);
export const selectTotalPageOfHistorySubtract = createSelector([selectDomain], widthdraw => widthdraw.totalPageOfHistorySubtract);
export const selectTotalPageLocalOfHistorySubtract = createSelector(
  [selectDomain],
  widthdraw => widthdraw.totalPageLocalOfHistorySubtract,
);

export const selectDetailRequest = createSelector([selectDomain], state => state.detailRequest);
export const selectCalledDetailRequest = createSelector([selectDomain], state => state.calledDetailRequest);

export const selectLoadingOfUsers = createSelector([selectDomain], users => users.response.loading);
export const selectLoadingBlockAccountOfUsers = createSelector([selectDomain], users => users.response.loadingBlockAccount);
export const selectLoadingCreateRequest = createSelector([selectDomain], users => users.response.loadingCreateRequest);
export const selectLoadingCancelCreatedRequest = createSelector(
  [selectDomain],
  users => users.response.loadingCancelCreatedRequest,
);

export const selectErrorOfUsers = createSelector([selectDomain], users => users.response.error);
export const selectErrorBlockAccountOfUsers = createSelector([selectDomain], users => users.response.errorBlockAccount);
export const selectErrorCreateRequest = createSelector([selectDomain], users => users.response.errorCreateRequest);
export const selectErrorDeleteRequest = createSelector([selectDomain], users => users.response.errorDeleteRequest);
