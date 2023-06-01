import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDataSearchItems, ISearchState, IStateSearchData } from './type';

export const initialState: ISearchState = {
  dataSearch: [],
  dataInfoSearch: {
    id: 0,
    user_id: 0,
    coin_id: 0,
    coin_name: '',
    coin_avatar: '',
    exchange: 0,
    balance: 0,
    service: 0,
    create_time: 0,
    status: 0,
    detail: {
      content: '',
      receiver_phone: '',
      receiver_nick_name: '',
      sender_nick_name: '',
      sender_phone: '',
      trans_content: '',
      usdt_exchange: '',
      account_name: '',
      account_number: '',
      banking: '',
      banking_logo: '',
      short_name: '',
      purchase_fee: '',
      selling_fee: '',
      coin_exchange: '',
      project: {
        avatar: '',
        name: '',
      },
      stake: {
        interest_rate: 0,
        timeframe: 0,
      },
    },
    user_info: {
      name: '',
      avatar: '',
      phone_number: '',
      create_time: 0,
    },
  },
  totalPage: 0,

  response: {
    loading: false,
    loadingGetDetailRequest: false,
    loadingAction: false,

    error: -1,
    message: '',
  },
};

const slice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    // get data filter
    requestGetDataFilter(state, action: PayloadAction<IStateSearchData>) {
      state.response.loading = true;
    },
    responeGetDataFilter(state, action: PayloadAction<any>) {
      state.response.loading = false;
      state.dataSearch = action?.payload?.data?.transactions;
    },
    // end get data filter

    // Getinfo filter
    requestGetInfoFilter(state, action: PayloadAction<any>) {
      state.response.loading = true;
      console.log(action?.payload, 'this is action');
    },
    responseGetInfoFilter(state, action: PayloadAction<any>) {
      state.response.loading = false;
      console.log(action.payload, 'this is data');
      state.dataInfoSearch = action.payload;
      state.dataSearch = [action.payload];
    },
    // end Getinfo filter
  },
});

const { actions, reducer } = slice;
export const searchAction = actions;
export const searchReducer = reducer;
