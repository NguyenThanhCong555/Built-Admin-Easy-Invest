import { TDetailRequest } from '../request/types';

export type TUserInformation = {
  userid: number;
  telegram_info: string;
  create_time: number;
  status: number;
  profile: {
    name: string;
    avatar: string;
    phone_number: string;
    create_time: number;
  };
};

export type TCoinInfo = {
  userid: number;
  coin_id: number;
  coin_name: string;
  balance: number;
  coin_avatar: string;
};

export type THistory = {
  id: number;
  requester: string;
  coin_id: number;
  exchange: number;
  real_exchange: number;
  content: string;
  service: number;
  userid: number;
  create_time: number;
  update_time: number;
  status: number;
  other: { banking: string; account_number: string; account_name: string; banking_logo: string };
  coin_name: 'USDT';
  coin_avatar: string;
};

export interface Users {
  userInfo: TUserInformation | null;
  coinUsdt: TCoinInfo | null;
  coins: TCoinInfo[];

  historyPlus: THistory[];
  totalPageOfHistoryPlus: number;
  totalPageLocalOfHistoryPlus: number;

  detailRequest: TDetailRequest[];
  calledDetailRequest: number[];

  historySubtract: THistory[];
  totalPageOfHistorySubtract: number;
  totalPageLocalOfHistorySubtract: number;

  response: {
    loading: boolean;
    loadingBlockAccount: boolean;
    loadingCreateRequest: boolean;
    loadingHistoryPlus: boolean;
    loadingHistorySubtract: boolean;
    loadingGetDetailRequest: boolean;
    loadingCancelCreatedRequest: boolean;

    error: number;
    message: string;

    errorBlockAccount: number;
    errorCreateRequest: number;
    errorDeleteRequest: number;
  };
}
