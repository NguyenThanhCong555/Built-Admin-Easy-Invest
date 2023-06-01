import { useEffect } from 'react';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { System } from './types';
import { INITIAL_VALUE } from 'constants/common';

export const initialState: System = {
  systemError: false,
  version: 1,
};

const slice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    // reset
    resetSystemError(state: System) {
      state.systemError = false;
    },
    resetFieldOfSytemAll(state: System) {
      return { ...initialState };
    },

    // set
    setSystemError(state: System) {
      state.systemError = true;
    },
    setVersion(state: System, action: PayloadAction<number>) {
      state.version = action.payload;
    },
  },
});

export const { actions: systemActions, reducer } = slice;

export const systemReducer = reducer;
