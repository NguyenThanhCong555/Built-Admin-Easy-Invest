import { createSelector } from '@reduxjs/toolkit';
import { initialState } from '.';

const selectDomain = state => state?.projects || initialState;
export const selectDataProjects = createSelector(
  [selectDomain],
  state => state.data,
);

export const selectProject = createSelector(
  [selectDomain],
  state => state.project,
);
export const selectResponse = createSelector(
  [selectDomain],
  state => state.response,
);

export const selectIsProjectChange = createSelector(
  [selectDomain],
  state => state.isProjectChange,
);
export const checkdataIsDuplicated = createSelector(
  [selectDomain],
  state => state.project.dataIsDuplicated,
);

export const selectCalledFirstProjects = createSelector(
  [selectDomain],
  state => state.calledFirstProjects,
);

export const selectListProject = createSelector(
  [selectDomain],
  state => state.projects,
);

export const selectFilterListProject = createSelector(
  [selectDomain],
  state => state.filterProjects,
);

// export const selectAuth = createSelector([selectDomain], auth => auth);
