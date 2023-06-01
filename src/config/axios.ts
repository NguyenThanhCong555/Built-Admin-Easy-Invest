import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { store } from 'store/configureStore';
import { authActions } from 'store/slice/auth';
import { bankActions } from 'store/slice/bank';
import { profileActions } from 'store/slice/profile';
import { projectsActions } from 'store/slice/projects';
import { requestActions } from 'store/slice/request';
import { stakeActions } from 'store/slice/stacke';
import { systemActions } from 'store/slice/system';

// import Storage from 'utils/Storage';
import { BaseResponse } from 'utils/http/response';

const BASEURL = 'https://ttvnapi.com';

// Set config defaults when creating the instance
export const authAxios = axios.create({
  baseURL: BASEURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
authAxios.interceptors.request.use(
  config => {
    // const token = Storage.getFieldOfUser('token');
    const stateStore = store.getState().auth;
    const id = stateStore.id;
    const token = stateStore.token;
    if (!token || !id) return config;

    if (token && config.headers) {
      // config.headers['Authorization'] = 'Bearer ' + token;
      if (['/ez/getlinklogin', '/ez/getotp', '/ez/loginbyotp', '/ez/loginbylink'].includes(config?.url as string)) return config;

      config.headers['token'] = token;
      config.headers['userid'] = id;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  },
);

// Add a response interceptor
authAxios.interceptors.response.use(
  async (res: AxiosResponse) => {
    try {
      handleAuthorized(res);
      handleSystemError(res);
      return res;
    } catch (error) {
      throw new Error(error);
    }
  },
  function (error: AxiosError) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);

function handleAuthorized(res: AxiosResponse): AxiosResponse {
  const originalConfig = res.config;
  const originalData = res.data as BaseResponse;
  const RESPONSE_ERROR_AUTHORIZED = 2;
  const RESPONSE_MESSAGE_AUTHORIZED = 'unauthorized';

  if (
    !['/ez/getlinklogin', '/ez/getotp', '/ez/loginbyotp', '/ez/loginbylink', '/ez/refreshtoken'].includes(
      originalConfig?.url as string,
    ) &&
    originalData.error === RESPONSE_ERROR_AUTHORIZED &&
    originalData.message === RESPONSE_MESSAGE_AUTHORIZED
  ) {
    store.dispatch(authActions.logoutSuccess());
    store.dispatch(stakeActions.resetStakeAll());
    store.dispatch(projectsActions.resetProjectsAll());
    store.dispatch(profileActions.resetAllFieldOfProfile());
    store.dispatch(requestActions.resetAllFieldRequest());
    store.dispatch(bankActions.resetAllOfFieldBank());
    return res;
  }
  return res;
}

function handleSystemError(res: AxiosResponse): AxiosResponse {
  const originalData = res.data as BaseResponse;
  const RESPONSE_ERROR_SYSTEM_ERROR = 1;
  const RESPONSE_MESSAGE_SYSTEM_ERROR = 'system_error';

  if (originalData.error === RESPONSE_ERROR_SYSTEM_ERROR && originalData.message === RESPONSE_MESSAGE_SYSTEM_ERROR) {
    store.dispatch(systemActions.setSystemError());
    // throw new Error('system error');
  }
  return res;
}

// function fetchRetry(url, options = {}, retries = 3, backoff = 300) {
//   /* 1 */
//   const retryCodes = [408, 500, 502, 503, 504, 522, 524];
//   return fetch(url, options)
//     .then(res => {
//       if (res.ok) return res.json();

//       if (retries > 0 && retryCodes.includes(res.status)) {
//         setTimeout(() => {
//           /* 2 */
//           return fetchRetry(url, options, retries - 1, backoff * 2); /* 3 */
//         }, backoff); /* 2 */
//       } else {
//         throw new Error(res);
//       }
//     })
//     .catch(console.error);
// }
