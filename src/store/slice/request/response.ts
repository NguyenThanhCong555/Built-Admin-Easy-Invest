import { ErrorResponse } from 'utils/http/response';
import { TDetailRequest } from './types';

export interface IGetDetailRequest extends ErrorResponse {
  data: TDetailRequest;
}
