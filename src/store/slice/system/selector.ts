import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../types';
import { initialState } from './index';

const selectDomain = (state: RootState) => state.system || initialState;
export const selectSystem = createSelector([selectDomain], system => system);
export const selectSystemError = createSelector([selectDomain], system => system.systemError);
