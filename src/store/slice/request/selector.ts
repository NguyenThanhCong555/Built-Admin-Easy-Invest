import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../types';
import { initialState } from './index';

const selectDomain = (state: RootState) => state.request || initialState;
export const selectRecharge = createSelector([selectDomain], state => state.recharge);

export const selectWithdraw = createSelector([selectDomain], state => state.withdraw);

export const selectWithdrawGame = createSelector([selectDomain], state => state.withdrawGame);

export const selectTotalPageRequest = createSelector([selectDomain], state => state.totalPage);

export const selectDetailRequest = createSelector([selectDomain], state => state.detailRequest);

export const selectCalledDetailRequest = createSelector([selectDomain], state => state.calledDetailRequest);

export const selectResponseRequest = createSelector([selectDomain], state => state.response);
export const selectDataAddition = createSelector([selectDomain], state => state.addition);

export const selectResponseActionRequest = createSelector([selectDomain], state => state.responseActionRequest);

export const selectResponseItemAddRequire = createSelector([selectDomain], state => state.itemAdditionRequirements);

export const selectCalledWithdraw = createSelector([selectDomain], state => state.calledWithdraw);

export const selectRequirements = createSelector([selectDomain], state => state.requirements);
