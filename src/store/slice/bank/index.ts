import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BankState } from './types';

export const initialState: BankState = {
  list: [],
  calledListBank: false,

  response: {
    loading: false,
    error: -1,
    message: '',
  },

  responseAction: {
    loading: false,
    error: -1,
    message: '',
  },
};

const slice = createSlice({
  name: 'bank',
  initialState,
  reducers: {
    // GET
    requestGetListBank(state: BankState) {
      state.response.loading = true;
    },

    responseGetListBank(state: BankState, action: PayloadAction<any>) {
      if (action.payload.data) {
        state.list = action.payload?.data?.banking_accounts;
        if (!state.calledListBank) state.calledListBank = true;
      }
      state.response.loading = false;
      state.response.error = action.payload.error;
      state.response.message = action.payload.message;
    },

    // ADD
    requestAddNewBank(state: BankState, action: PayloadAction<any>) {
      state.responseAction.loading = true;
    },
    responseAddNewBank(state: BankState, action: PayloadAction<any>) {
      if (action.payload.error === 0 && action.payload.message === 'success') {
        // Tạo thành công
        if (action.payload.data) {
          state.list.push(action.payload.data);
        }
      }

      state.responseAction.loading = false;
      state.responseAction.error = action.payload.error;
      state.responseAction.message = action.payload.message;
    },

    //UPDATE
    requestUpdateBank(state: BankState, action: PayloadAction<any>) {
      state.responseAction.loading = true;
    },

    responseUpdateBank(state: BankState, action: PayloadAction<any>) {
      if (action.payload.error === 0 && action.payload.message === 'success') {
        // Update data in redux - not reload
        const { id } = action.payload.data;
        // const { id, data } = action.payload;

        const list = state.list.map((item, _) => {
          if (item.id === id) {
            item.banking_name = action.payload.data.banking_name;
            item.account_name = action.payload.data.account_name;
            item.account_number = action.payload.data.account_number;
            item.qr_code = action.payload.data.qr_code;

            return item;
          }

          return item;
        });

        state.list = list;
      }
      state.responseAction.loading = false;
      state.responseAction.error = action.payload.error;
      state.responseAction.message = action.payload.message;
    },

    // LOCK - UNLOCK
    requestChangeStatus(state: BankState, action: PayloadAction<any>) {
      state.responseAction.loading = true;
    },

    responseChangeStatus(state: BankState, action: PayloadAction<any>) {
      if (action.payload.error === 0 && action.payload.message === 'success') {
        const { id, status } = action.payload;
        /*
          Luồng: 
          ->  Fetching lại toàn bộ list (do list bank ko nhiều)
           Option: Nếu Khóa thì tìm item rùi đổi status
            Nếu Mở khóa thì fetching lại list - (hoặc tìm các ngân hàng cùng tên set lại trạng thái ??)
        */
        state.calledListBank = false;
      }
      state.responseAction.loading = false;
      state.responseAction.error = action.payload.error;
      state.responseAction.message = action.payload.message;
    },

    //Reset
    resetResponse(state: BankState) {
      state.response = {
        loading: false,
        error: -1,
        message: '',
      };
    },

    resetResponseAction(state: BankState) {
      state.responseAction = {
        loading: false,
        error: -1,
        message: '',
      };
    },

    resetCalledListBank(state: BankState) {
      state.calledListBank = false;
    },

    resetAllOfFieldBank(state: BankState) {
      return {
        ...initialState,
      };
    },
  },
});

const { actions, reducer } = slice;
export const bankActions = actions;
export const bankReducer = reducer;
