import { createSelector } from '@reduxjs/toolkit';
import { initialState } from '.';

const selectDomain = state => state?.stake || initialState;
export const selectStake = createSelector([selectDomain], state => state);
