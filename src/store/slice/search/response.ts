import { ErrorResponse } from 'utils/http/response';
import { IRootObject } from './type';

export interface IGetDataSeaerchRequest extends ErrorResponse {
  data: IRootObject;
}

// AxiosResponse<IGetDataSeaerchRequest>
