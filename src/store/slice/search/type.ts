// data search
export interface ISearchState {
  dataSearch: IRootObject[];
  dataInfoSearch: IDataSearchItems;

  totalPage: number | string;

  response: {
    loading: boolean | undefined;
    loadingGetDetailRequest: boolean | undefined;
    loadingAction: boolean | undefined;
    error: number | undefined;
    message: string | undefined;
  };
}

export interface IStateSearchData {
  phone_numbe?: number | string;
  begin_time?: number | string;
  end_time?: number | string;
  service?: number | string;
  page?: number | string;
}

export type IRootObject = {
  id: number;
  user_id: number;
  coin_id: number;
  coin_name: string;
  coin_avatar: string;
  exchange: number;
  balance: number;
  service: number;
  create_time: number;
  status: number;
  user_info: IUser_info;
};

export type IUser_info = {
  name: string;
  avatar: string;
  phone_number: string;
  create_time: number;
};
// end data search

// data items search

export type ISearchItems = {
  error: number;
  message: string;
  data: IDataSearchItems;
};

export type IDataSearchItems = {
  id: number;
  user_id: number;
  coin_id: number;
  coin_name: string;
  coin_avatar: string;
  exchange: number;
  balance: number;
  service: number;
  create_time: number;
  status: number;
  detail: IDetailItemsSearch;
  user_info: IUser_infoSearchItems;
};
export type IDetailItemsSearch = {
  content: string;
  receiver_phone: string;
  receiver_nick_name: string;
  trans_content: string | number;
  purchase_fee: string | number;
  usdt_exchange: string | number;
  selling_fee: string | number;
  coin_exchange: string | number;
  project: {
    avatar: string;
    name: string;
  };
  stake: {
    interest_rate: number | string;
    timeframe: number | string;
  };
  sender_nick_name: string | number;
  sender_phone: string | number;
  account_name: string;
  account_number: string;
  banking: string;
  short_name: string;
  banking_logo: string;
};
export type IUser_infoSearchItems = {
  name: string;
  avatar: string;
  phone_number: string;
  create_time: number;
};
// end data items search
