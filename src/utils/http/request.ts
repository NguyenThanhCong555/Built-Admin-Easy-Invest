import axios from 'axios';
import { BaseResponse } from './response';
import { store } from 'store/configureStore';
import { authActions } from 'store/slice/auth';

export const baseDomain = 'https://ttvnapi.com';

export async function apiPost(url: string, payload: any, header: any) {
  try {
    url = baseDomain + url;
    const { data } = await axios.post<BaseResponse>(url, payload, {
      headers: header,
    });
    console.log(data);
    if (data.error === 2) {
      store.dispatch(authActions.resetIsLoading());
      store.dispatch(authActions.setIsAuthen());
    }
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error: ', error.message);
    } else {
      console.log('error: ', 'undefined');
    }
    const response: BaseResponse = {
      data: undefined,
      error: 1,
      message: 'system_error',
    };
    return response;
  }
}

export async function apiGet(url: string, header: any) {
  try {
    url = baseDomain + url;
    const { data } = await axios.get<BaseResponse>(url, {
      headers: header,
    });
    console.log(data);
    if (data.error === 2) {
      store.dispatch(authActions.resetIsLoading());
      store.dispatch(authActions.setIsAuthen());
    }
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error: ', error.message);
    } else {
      console.log('error: ', 'undefined');
    }
    const response: BaseResponse = {
      data: undefined,
      error: 1,
      message: 'system_error',
    };
    return response;
  }
}
