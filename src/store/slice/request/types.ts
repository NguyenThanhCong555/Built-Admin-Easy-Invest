export type TRequesterInfo = {
  name: string;
  avatar: string;
  phone_number: string;
};

export type TBankingInfo = {
  id: number;
  account_name: string;
  account_number: string;
  banking_logo: string;
  banking_name: string;
  qr_code: string;
  status: number;
  userid: number;
};

export type TDetailRequest = {
  id: number;
  requester_id: number;
  requester: string;
  coin_id: number;
  exchange: number;
  real_exchange: number;
  content: string;
  service: number;
  userid: number;
  role: number;
  create_time: number;
  update_time: number;
  status: number;
  receiver_info?: {
    avatar?: string;
    create_time?: string | number;
    name?: string;
    phone_number?: string | number;
  };
  banking_info: TBankingInfo;
  requester_info: TRequesterInfo;
  banking_account_id: number;
};

export interface RequestState {
  withdraw: Request[];
  calledWithdraw: boolean;

  withdrawGame: Request[];

  recharge: Request[];
  addition: TDetailRequest[];
  requirements: TDetailRequest[];

  itemAdditionRequirements: {
    banking_account_id: number | string;
    banking_info: {
      id: number;
      userid: number | string;
      banking_name: string;
      banking_logo: string;
      account_name: string;
      account_number: number | string;
      qr_code: string;
      status: number;
    };
    coin_id: number;
    content: number | string;
    create_time: number | string;
    exchange: number | string;
    id: number;
    real_exchange: number | string;
    receiver_info: {
      name: string;
      avatar: string;
      phone_number: number | string;
      create_time: number | string;
    };
    requester: number;
    requester_id: number;
    requester_info: {
      name: number | string;
      avatar: any;
      phone_number: number | string;
      create_time: number | string;
    };
    role: number;
    service: number | string;
    status: number;
    update_time: number | string;
    userid: number | string;
  };
  totalPage: number;

  detailRequest: TDetailRequest[];
  calledDetailRequest: number[];

  response: {
    loading: boolean;
    loadingGetDetailRequest: boolean;
    loadingAction: boolean;

    message: string;
    error: number;
  };

  responseActionRequest: {
    loading: boolean;
    message: string;
    error: number;
  };
}

export interface Request {
  id: number;
  requester_id: number;
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
  other: Other;
  requester_info: RequesterInfo;
  coin_name?: string;
  project_name?: string;
}

export interface Other {
  banking: string;
  banking_logo: string;
  account_number: string;
  account_name: string;
  ID?: string;
}

export interface RequesterInfo {
  name: string;
  avatar: string;
  phone_number: string;
  create_time: number;
  isUpdate: boolean;
}

export interface IFilterRequest {
  service: number;
  page: number;
  role?: any;
  request_id?: string;
  requester_phone?: string;
  begin_time?: number;
  end_time?: number;
  status?: number;
}

export type TRequestListWithdraw = Omit<IFilterRequest, 'request_id' | 'requester_phone' | 'begin_time' | 'end_time' | 'status'>;
export interface RequestAcceptWithdraw {
  request_id: number;
  transfered_order_code?: string;
  real_exchange?: string;
  service?: number;
  isDetail?: boolean | undefined;
}
