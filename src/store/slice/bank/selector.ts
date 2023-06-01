import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../types';
import { initialState } from './index';

const selectDomain = (state: RootState) => state.bank || initialState;

export const selectListBank = createSelector([selectDomain], state => state.list);

export const selectResponseBank = createSelector([selectDomain], state => state.response);

export const selectResponseActionBank = createSelector([selectDomain], state => state.responseAction);

export const selectCalledListBank = createSelector([selectDomain], state => state.calledListBank);
