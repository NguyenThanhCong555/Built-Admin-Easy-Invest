import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import rootSaga from './rootSaga';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createReducer } from './reducers';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import {
  bankTransform,
  profileTransform,
  projectTransform,
  requestsTransform,
  searchTransform,
  systemTransform,
  usersTransform,
} from './tranform';
import { authActions } from './slice/auth';
import { systemActions } from './slice/system';

export function configureAppStore() {
  const persistConfig: any = {
    key: 'admin',
    version: 2,
    storage: storage,
    transforms: [
      projectTransform,
      profileTransform,
      requestsTransform,
      systemTransform,
      usersTransform,
      bankTransform,
      searchTransform,
    ],
    migrate: (state, version) => {
      if (state && state.system.version < version && state.auth.isLogin) {
        store.dispatch(authActions.requestLogout());
      }
      return Promise.resolve(state);
    },
    stateReconciler: autoMergeLevel2,
  };

  const persistedReducer = persistReducer(persistConfig, createReducer());
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const store = configureStore({
    reducer: persistedReducer,
    middleware: defaultMiddleware => [
      ...defaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
      ...middlewares,
    ],
    devTools: process.env.NODE_ENV !== 'production' || process.env.PUBLIC_URL.length > 0,
  });

  sagaMiddleware.run(rootSaga);
  return store;
}
export const store = configureAppStore();
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
