import { RootState } from 'types';
import { initialState } from '.';
import { createSelector } from '@reduxjs/toolkit';

const selectDomain = (state: RootState) => state?.search || initialState;

export const selectDataSearcher = createSelector([selectDomain], state => state.dataSearch);

export const selectDataInfoSearch = createSelector([selectDomain], state => state.dataInfoSearch);

export const selectResponseSearcher = createSelector([selectDomain], state => state.response);
