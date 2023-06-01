import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProfileState } from './types';

export const initialState: ProfileState = {
  profile: {
    avatar: '',
    create_time: 0,
    name: '',
    phone_number: '',
    isUpdate: false,
  },
  calledProfile: false,

  response: {
    loading: false,
    error: -1,
    message: '',
  },
};

const slice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    requestGetProfile(state: ProfileState) {
      state.response.loading = true;
    },
    responseGetProfile(state: ProfileState, action: PayloadAction<any>) {
      state.response.loading = false;
      state.response.message = action.payload.message;
      state.response.error = action.payload.error;

      // Check
      if (action.payload.data) {
        state.profile = action.payload.data;
        state.calledProfile = true;
      }
    },
    requestUpdateProfile(state: ProfileState, action: PayloadAction<any>) {
      state.response.loading = true;
    },
    responseUpdateProfile(state: ProfileState, action: PayloadAction<any>) {
      state.response.loading = false;
      state.response.message = action.payload.message;
      state.response.error = action.payload.error;

      // Check
      if (action.payload.data) {
        state.profile.avatar = action.payload.data?.avatar;
        state.profile.name = action.payload.data?.name;
        state.profile.isUpdate = true;
      }
    },
    // Reset
    resetResponse(state: ProfileState) {
      state.response = {
        loading: false,
        error: -1,
        message: '',
      };
    },
    resetAllFieldOfProfile(state: ProfileState) {
      return {
        ...initialState,
      };
    },
  },
});

const { actions, reducer } = slice;
export const profileActions = actions;
export const profileReducer = reducer;
