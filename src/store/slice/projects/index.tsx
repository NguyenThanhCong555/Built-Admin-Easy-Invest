import { PayloadAction } from '@reduxjs/toolkit';
import { ProjectsState } from './type';
import { createSlice } from 'utils/@reduxjs/toolkit';

export const initialState: ProjectsState = {
  projects: [],
  calledFirstProjects: false,
  type: 0,

  project: {
    id: -1,
    name: '',
    avatar: '',
    coinInfo: {
      coin_avatar: '',
      coin_name: '',
      min_transfer: 0,
      rate_usdt_coin: 0,
    },
    cover_photo: [],
    author: { name: '' },
    intro: {
      ENG: '',
      VN: '',
    },
    dataIsDuplicated: [],
    website: '',
    create_time: 0,
    update_time: 0,
    state: 0,
    staking: -1,
  },

  isProjectChange: false,
  response: { loading: false, error: -1, message: '', updating: false },
};

const slice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    requestGetAllProjects(state: ProjectsState) {
      state.response.loading = true;
    },
    responseGetAllProjects(state: ProjectsState, action: PayloadAction<any>) {
      state.projects = action.payload?.data?.projects;

      if (action.payload?.data?.projects) state.calledFirstProjects = true;
      state.response.loading = false;
      state.response.message = action.payload.message;
      state.response.error = action.payload.error;
    },

    requestProjectInfo(state: ProjectsState, action: PayloadAction<any>) {
      state.response.loading = true;
    },
    getProjectInfo(state: ProjectsState, action: PayloadAction<any>) {
      state.project = action.payload;
      state.response.loading = false;
    },

    requestLockproject(state: ProjectsState, action: PayloadAction<any>) {
      state.isProjectChange = false;
      state.response.loading = true;
    },

    responseLockProject(state: ProjectsState, action: PayloadAction<any>) {
      state.response.error = action.payload.error;
      state.response.message = action.payload.message;
      state.response.loading = false;

      if (action.payload.error === 0) {
        if (Number(action.payload.state) === 0) {
          state.project.state = 0;
        } else {
          state.project.state = 1;
        }
      }
    },

    requestAddInfoCoin(state: ProjectsState, action: PayloadAction<any>) {},
    responseAddInfoCoin(state: ProjectsState, action: PayloadAction<any>) {},

    requestEditInfoCoin(state: ProjectsState, action: PayloadAction<any>) {
      // state.response.loading = true;
    },

    responseEditInfoCoin(state: ProjectsState, action: PayloadAction<any>) {
      // state.response.loading = false;
    },
    ifdataisduplicated(state: ProjectsState, action: PayloadAction<any>) {},

    responseDublicated(state: ProjectsState, action: PayloadAction<any>) {
      state.project.dataIsDuplicated = action.payload;
    },

    requestChangeInfoCoin(state: ProjectsState, action: PayloadAction<any>) {},

    requestCreateProject(state: ProjectsState, action: PayloadAction<any>) {
      state.response.loading = true;
    },

    responseCreateProject(state: ProjectsState, action: PayloadAction<any>) {
      state.response.loading = false;
      state.response.message = action.payload.message;
      state.response.error = action.payload.error;
    },

    requestUpdateProject(state: ProjectsState, action: PayloadAction<any>) {
      state.response.updating = true;
    },
    responseUpdateProject(state: ProjectsState, action: PayloadAction<any>) {
      state.response.updating = false;
      state.response.message = action.payload.message;
      state.response.error = action.payload.error;
    },

    changeStatus(state: ProjectsState, action: PayloadAction<any>) {
      state.type = Number(action.payload.type);
    },

    // Reset
    resetCalledFirstProjects(state: ProjectsState) {
      state.calledFirstProjects = false;
    },
    resetIsProjectChange(state: ProjectsState) {
      state.isProjectChange = false;
    },
    resetResponse(state: ProjectsState) {
      state.response = {
        loading: false,
        updating: false,
        error: -1,
        message: '',
      };
    },

    resetProjectsAll() {
      return {
        ...initialState,
      };
    },
  },
});

const { actions, reducer } = slice;
export const projectsActions = actions;
export const projectsReducer = reducer;
