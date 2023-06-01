import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../types';
import { initialState } from './index';

const selectDomain = (state: RootState) => state.profile || initialState;
export const selectProfile = createSelector(
  [selectDomain],
  state => state.profile,
);

export const selectCalledProfile = createSelector(
  [selectDomain],
  state => state.calledProfile,
);
export const selectResponseProfile = createSelector(
  [selectDomain],
  state => state.response,
);
