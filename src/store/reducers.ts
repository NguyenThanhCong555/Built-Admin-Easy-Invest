/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from '@reduxjs/toolkit';
import { InjectedReducersType } from 'utils/types/injector-typings';

import { authReducer } from './slice/auth';
import { projectsReducer } from './slice/projects';
import { stakeReducer } from './slice/stacke';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export function createReducer(injectedReducers: InjectedReducersType = {}) {
  const rootReducers = combineReducers({
    auth: authReducer,
    projects: projectsReducer,
    stake: stakeReducer,
  });
  return rootReducers;
}
