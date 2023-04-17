import { createSelector } from '@reduxjs/toolkit';
import { initialState } from '.';
import { RootState } from 'types/RootState';

const selectDomain = (state: RootState) => state.auth || initialState;
export const selectAuth = createSelector([selectDomain], auth => auth);

export const selectId = createSelector([selectDomain], auth => auth.id);
export const selectToken = createSelector([selectDomain], auth => auth.token);
export const selectIsLogin = createSelector(
  [selectDomain],
  auth => auth.isLogin,
);
export const selectErrorLoginTelegram = createSelector(
  [selectDomain],
  auth => auth.response?.errorLoginTelegram,
);
