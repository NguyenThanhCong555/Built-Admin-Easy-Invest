import { ErrorResponse } from 'utils/http/response';
import { TUserInformation, TCoinInfo, THistory } from './types';

export const RESPONSE_ERROR_NOT_EXPIRES_ACCOUNT = 10;
export const RESPONSE_ERROR_INVALID_USER = 10;
export const RESPONSE_ENOUGH_REQUEST_WAITING = 11;
export const RESPONSE_INVALID_MIN_TRANSFER = 51;

export interface GetUserInformationResponse extends ErrorResponse {
  data: TUserInformation;
}

export interface GetWalletOfUserResponse extends ErrorResponse {
  data: {
    assets: TCoinInfo[];
  };
}

// get history
export interface HistoryResponse extends ErrorResponse {
  data: {
    requests: THistory[];
    total_page: number;
  };
}
