import { PayloadAction } from '@reduxjs/toolkit';
import { ProjectsState } from './type';
import { createSlice } from 'utils/@reduxjs/toolkit';

export const initialState: ProjectsState = {
  projects: [],
  filterProjects: [],
  calledFirstProjects: false,

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
    filterProject(state: ProjectsState, action: PayloadAction<any>) {
      switch (Number(action.payload.select)) {
        case 0:
          const filterDataUnlock = state.projects.filter(
            (item, _) => item.state === 0,
          );
          state.filterProjects = filterDataUnlock;
          break;
        case 1:
          const filterDataLock = state.projects.filter(
            (item, _) => item.state === 1,
          );
          state.filterProjects = filterDataLock;
          break;
        default:
          state.filterProjects = state.projects;
          break;
      }
    },
    requestGetAllProjects(state: ProjectsState) {
      state.response.loading = true;
    },
    responseGetAllProjects(state: ProjectsState, action: PayloadAction<any>) {
      state.projects = action.payload.data.projects;
      state.filterProjects = action.payload.data.projects;

      //
      state.calledFirstProjects = false;
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
    },

    requestAddInfoCoin(state: ProjectsState, action: PayloadAction<any>) {
      // console.log(action.payload.project_id, 'this is form add in redux');
    },
    responseAddInfoCoin(state: ProjectsState, action: PayloadAction<any>) {
      // console.log(action.payload.project_id, 'this is form add in redux');
    },

    requestEditInfoCoin(state: ProjectsState, action: PayloadAction<any>) {
      console.log('hi');
    },

    ifdataisduplicated(state: ProjectsState, action: PayloadAction<any>) {},

    responseDublicated(state: ProjectsState, action: PayloadAction<any>) {
      console.log(action.payload, 'form redux');
      state.project.dataIsDuplicated = action.payload;
    },

    responseEditInfoCoin(state: ProjectsState, action: PayloadAction<any>) {},

    requestChangeInfoCoin(state: ProjectsState, action: PayloadAction<any>) {
      // state.response.loading = true;
      // console.log(action.payload, 'this is form update in redux');
    },

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

    // Rest
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
