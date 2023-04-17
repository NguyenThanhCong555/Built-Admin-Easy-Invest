import { AuthState } from './type';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

export const initialState: AuthState = {
  id: -1,
  token: '',
  refreshToken: '',
  refreshToken_time: 0,
  username: '',
  language: 'en-US',
  isLogin: false,
  isMobile: false,
  isAuthen: false,
  isError: false,
  isLoading: false,
  isChangeProjects: false,
  projects: [],
  login: { error: -1, message: '' },

  response: {
    messageLoginTelegram: '',
    errorLoginTelegram: -1,
  },
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessDevice(state, action: PayloadAction<boolean>) {
      state.isMobile = action.payload;
    },

    requestLoginByTelegram(state) {
      state.isLoading = true;
    },
    loginByTelegram(state, action: PayloadAction<any>) {
      state.isLoading = false;
      state.login = action.payload.login;
    },

    requestGetOtp(state, action: PayloadAction<any>) {
      state.isLoading = true;
    },
    getOtp(state, action: PayloadAction<any>) {
      state.isLoading = false;
      state.login = action.payload.login;
    },

    requestLoginByOtp(state, action: PayloadAction<any>) {
      state.isLoading = true;
    },
    loginByOtp(state, action: PayloadAction<any>) {
      state.isLoading = false;
      state.isLogin = true;
      state.id = action.payload.id;
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.refreshToken = action.payload.refreshToken;
      state.refreshToken_time = action.payload.refreshToken_time;
    },
    loginByOtpFail(state, action: PayloadAction<any>) {
      state.isLoading = false;
      state.login = action.payload.login;
    },

    requestLogout(state) {
      state.isLoading = true;
    },
    logoutSuccess(state) {
      return {
        ...initialState,
        language: state.language,
      };
    },
    getAllProject(state, action: PayloadAction<any>) {
      state.projects = action.payload.projects;
    },

    requestChangeProjects(state) {
      state.isChangeProjects = true;
    },
    setLanguage(state, action: PayloadAction<any>) {
      state.language = action.payload.language;
    },

    setIsAuthen(state) {
      state.isAuthen = true;
    },
    resetIsAuthen(state) {
      state.isAuthen = false;
    },
    // Rest State
    resetLogin(state) {
      state.login = {
        error: -1,
        message: '',
      };
    },
    resetIsLoading(state) {
      state.isLoading = false;
    },

    resetIsChangeProjects(state) {
      state.isChangeProjects = false;
    },

    //login telegram
    resetResponseLoginTelegram(state: AuthState) {
      state.response.errorLoginTelegram = -1;
      state.response.messageLoginTelegram = '';
    },
    setResponseUser(
      state: AuthState,
      action: PayloadAction<{ error: number; message: string }>,
    ) {
      state.response.errorLoginTelegram = action.payload.error;
      state.response.messageLoginTelegram = action.payload.message;
    },
    requestLoginDirectlyTelegram(
      state: AuthState,
      action: PayloadAction<{ id: string; token: string }>,
    ) {},
  },
});

const { actions, reducer } = slice;
export const authActions = actions;
export const authReducer = reducer;
