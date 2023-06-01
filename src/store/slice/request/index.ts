import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestState, IFilterRequest, TRequestListWithdraw, RequestAcceptWithdraw, TDetailRequest } from './types';

export const initialState: RequestState = {
  withdraw: [],
  calledWithdraw: false,

  withdrawGame: [],
  recharge: [],

  addition: [],
  requirements: [],

  itemAdditionRequirements: {
    banking_account_id: 0,
    banking_info: {
      id: 0,
      userid: 0,
      banking_name: '',
      banking_logo: '',
      account_name: '',
      account_number: '',
      qr_code: '',
      status: 0,
    },
    coin_id: 0,
    content: '',
    create_time: '',
    exchange: '',
    id: 0,
    real_exchange: '',
    receiver_info: {
      name: '',
      avatar: '',
      phone_number: '',
      create_time: '',
    },
    requester: 0,
    requester_id: 0,
    requester_info: {
      name: '',
      avatar: '',
      phone_number: '',
      create_time: '',
    },
    role: 0,
    service: '',
    status: 2,
    update_time: '',
    userid: '',
  },

  totalPage: 0,

  detailRequest: [],
  calledDetailRequest: [],

  response: {
    loading: false,
    loadingGetDetailRequest: false,
    loadingAction: false,

    error: -1,
    message: '',
  },

  responseActionRequest: {
    loading: false,
    message: '',
    error: -1,
  },
};

const slice = createSlice({
  name: 'request',
  initialState,
  reducers: {
    // reset
    resetLoadingRequest(state: RequestState) {
      state.response.loadingGetDetailRequest = false;
    },

    // set
    setLoadingRequest(state: RequestState) {
      state.response.loadingGetDetailRequest = true;
    },

    requestDeposit(state, action: PayloadAction<any>) {
      state.response.loading = true;
    },
    responseDeposit(state, action: PayloadAction<any>) {
      if (action.payload?.data) {
        if (action.payload.data?.total_page) state.totalPage = action.payload.data?.total_page;
        state.recharge = [...state.recharge, ...action.payload.data?.requests];
        state.addition = [...state.addition, ...action.payload.data?.requests];
        state.requirements = [...state.requirements, ...action.payload.data?.requests];
        console.log(action.payload, 'this is total pages in redux');
      } else {
        state.totalPage = 0;
        state.recharge = [];
        state.addition = [];
        state.requirements = [];
      }
      state.response.loading = false;
      state.response.message = action.payload.message;
      state.response.error = action.payload.error;
    },

    // từ chối
    requestDepositRefuse(state, action: PayloadAction<any>) {
      state.responseActionRequest.loading = true;
    },
    responseDepositRefuse(state, action: PayloadAction<any>) {
      const { request_id, service } = action.payload;
      state.itemAdditionRequirements.status = -1;

      if (action.payload.error === 0 && action.payload.message === 'success') {
        let item: undefined | any = {};
        let itemDetail: undefined | any = {};
        let itemAddition: undefined | any = {};
        let itemRequirements: undefined | any = {};

        // Nếu action thực hiện ở trang chi tiết thì find ở state detailRequest

        itemDetail = state.detailRequest.find((item, _) => item.id === request_id);
        if (itemDetail) {
          itemDetail.status = -1;
          itemDetail.update_time = action.payload.curentTime;
        }

        itemAddition = state.addition.find((item, _) => item.id === request_id);
        if (itemAddition) {
          itemAddition.status = -1;
        }

        itemRequirements = state.requirements.find((item, _) => item.id === request_id);
        if (itemRequirements) {
          itemRequirements.status = -1;
        }

        if (service === 1) {
          item = state.recharge.find((item, _) => item.id === request_id);
        } else if (service === 2) {
          item = state.withdraw.find((item, _) => item.id === request_id);
        } else if (service === 3) {
          item = state.withdrawGame.find((item, _) => item.id === request_id);
        }
        if (item) item.status = -1;

        // service === 1
        //   ? (item = state.addition.find((item, _) => item.id === request_id))
        //   : (item = state.requirements.find((item, _) => item.id === request_id));

        // if (!action.payload.isDetail) {
        //   // Loại bỏ item đã từ chối thành công ra khỏi list
        //   if (service === 1) {
        //     const list = state.recharge.filter((item, _) => item.id !== request_id);
        //     state.recharge = list;
        //   } else {
        //     const list = state.withdraw.filter((item, _) => item.id !== request_id);
        //     state.withdraw = list;
        //   }
        // }
      }

      if (action.payload.error === 0 && action.payload.message === 'success') {
        let item: undefined | any = {};

        item = state.detailRequest.find((item, _) => item.id === request_id);
        if (item) {
          item.status = -1;
          item.update_time = action.payload.curentTime;
        }
      } else {
      }
      // Yêu cầu đã được xử lý
      if (action.payload.error === 25) {
        const { request_id, service } = action.payload;
        if (!action.payload.isDetail) {
          // Loại bỏ item đã xác nhận thành công ra khỏi list
          if (service === 1) {
            const list = state.recharge.filter((item, _) => item.id !== request_id);
            state.recharge = list;
          } else if (service === 2) {
            const list = state.withdraw.filter((item, _) => item.id !== request_id);
            state.withdraw = list;
          } else if (service === 3) {
            const list = state.withdrawGame.filter((item, _) => item.id !== request_id);
            state.withdrawGame = list;
          }
        }
      }
      state.responseActionRequest.loading = false;
      state.responseActionRequest.message = action.payload.message;
      state.responseActionRequest.error = action.payload.error;
    },

    // lấy ra dữ liệu từng item của addition và Requirements
    requestItemAddAndRequire(state, action: PayloadAction<any>) {
      state.response.loading = true;
    },
    responseItemAddAndRequire(state, action: PayloadAction<any>) {
      state.response.loading = false;
      if (action.payload.data) {
        state.itemAdditionRequirements = action.payload.data;
      } else {
        state.totalPage = 0;
      }
    },

    // lấy ra data của yêu cầu cộng và trừ
    requestRequestDataAddition(state, action: PayloadAction<any>) {
      state.response.loading = true;
      // console.log(action.payload, 'this is payload action');
    },

    responseRequestDataAddition(state, action: PayloadAction<any>) {
      if (action.payload?.data) {
        if (action.payload.data?.total_page) state.totalPage = action.payload.data?.total_page;
        state.addition = action.payload.data.requests;
        state.requirements = action.payload.data.requests;
      } else {
        state.totalPage = 0;
        state.addition = [];
        state.requirements = [];
      }
      state.response.loading = false;
      state.response.message = action.payload.message;
      state.response.error = action.payload.error;
    },

    // xử lý yêu cầu đồng ý cộng tiền
    requestAcceptAdditionRequest(state, action: PayloadAction<any>) {
      state.responseActionRequest.loading = true;
    },

    responseAcceptAdditionRequest(state, action: PayloadAction<any>) {
      state.responseActionRequest.loading = false;
      if (action.payload.res === 0) {
        let acceptPlus: undefined | any = {};

        action.payload.service === 1
          ? (acceptPlus = state.addition.find((item, _) => item.id === action.payload.request_id))
          : (acceptPlus = state.requirements.find((item, _) => item.id === action.payload.request_id));

        if (acceptPlus) acceptPlus.status = 1;

        state.itemAdditionRequirements.status = 1;
      } else {
        state.totalPage = 0;
        state.addition = [];
        state.requirements = [];
      }
    },

    // Withdraw - Rút tiền
    requestGetListWithdraw(state: RequestState, action: PayloadAction<TRequestListWithdraw>) {
      state.response.loading = true;
    },

    responseGetListWithdraw(state: RequestState, action: PayloadAction<any>) {
      if (action.payload?.data) {
        if (action.payload.data?.total_page) state.totalPage = action.payload.data?.total_page;
        state.withdraw = [...state.withdraw, ...action.payload.data?.requests];
      } else {
        state.totalPage = 0;
        state.withdraw = [];
      }

      state.calledWithdraw = true;
      state.response.loading = false;
      state.response.message = action.payload.message;
      state.response.error = action.payload.error;
    },

    /*
      Filter request (dùng cho cả rút - nạp)
      service và page, role là bắt buộc phải truyền, cái field khác tùy ý
    */
    requestFilterListRequests(state: RequestState, action: PayloadAction<IFilterRequest>) {
      state.response.loading = true;
    },

    responseFilterListRequests(state: RequestState, action: PayloadAction<any>) {
      // service = 1 (Nạp)
      // service = 2 (Rút)
      if (action.payload?.data) {
        if (action.payload.data?.total_page) state.totalPage = action.payload.data?.total_page;

        // Check service type
        if (action.payload.role === 0) {
          if (action.payload.service === 1) {
            state.recharge = [...state.recharge, ...action.payload.data?.requests];
          } else if (action.payload.service === 2) {
            state.withdraw = [...state.withdraw, ...action.payload.data?.requests];
          } else if (action.payload.service === 3) {
            state.withdrawGame = [...state.withdrawGame, ...action.payload.data?.requests];
          }
        }

        if (action.payload.role === 1) {
          action.payload.service === 1
            ? (state.addition = [...state.addition, ...action.payload.data?.requests])
            : (state.requirements = [...state.requirements, ...action.payload.data?.requests]);
        }
      } else {
        state.totalPage = 0;
        state.recharge = [];
        state.withdraw = [];
        state.withdrawGame = [];
        state.addition = [];
        state.requirements = [];
      }

      state.calledWithdraw = true;
      state.response.loading = false;
      state.response.message = action.payload.message;
      state.response.error = action.payload.error;
    },

    // Accept Withdraw
    requestAcceptRequest(state: RequestState, action: PayloadAction<RequestAcceptWithdraw>) {
      state.responseActionRequest.loading = true;
    },

    responseAcceptRequest(state: RequestState, action: PayloadAction<any>) {
      if (action.payload.error === 0 && action.payload.message === 'success') {
        const { request_id, service } = action.payload;
        let item: undefined | any = {};
        let itemDetail: undefined | any = {};

        // Nếu action thực hiện ở trang chi tiết thì find ở state detailRequest
        itemDetail = state.detailRequest.find((item, _) => item.id === request_id);
        if (itemDetail) {
          itemDetail.status = 1;
          itemDetail.real_exchange = action.payload?.real_exchange;
        }

        if (service === 1) {
          item = state.recharge.find((item, _) => item.id === request_id);
        } else if (service === 2) {
          item = state.withdraw.find((item, _) => item.id === request_id);
        } else if (service === 3) {
          item = state.withdrawGame.find((item, _) => item.id === request_id);
        }
        if (item) {
          item.status = 1;
          if (service === 1) {
            item.real_exchange = action.payload?.real_exchange;
          }
        }

        // if (!action.payload.isDetail) {
        //   // Loại bỏ item đã xác nhận thành công ra khỏi list
        //   if (service === 1) {
        //     const list = state.recharge.filter((item, _) => item.id !== request_id);
        //     state.recharge = list;
        //   } else {
        //     const list = state.withdraw.filter((item, _) => item.id !== request_id);
        //     state.withdraw = list;
        //   }
        // }
      }
      // Yêu cầu đã được xử lý
      if (action.payload.error === 25) {
        const { request_id, service } = action.payload;
        if (!action.payload.isDetail) {
          // Loại bỏ item đã xác nhận thành công ra khỏi list
          if (service === 1) {
            const list = state.recharge.filter((item, _) => item.id !== request_id);
            state.recharge = list;
          } else if (service === 2) {
            const list = state.withdraw.filter((item, _) => item.id !== request_id);
            state.withdraw = list;
          } else if (service === 3) {
            const list = state.withdrawGame.filter((item, _) => item.id !== request_id);
            state.withdrawGame = list;
          }
        }
      }

      state.responseActionRequest.loading = false;
      state.responseActionRequest.message = action.payload.message;
      state.responseActionRequest.error = action.payload.error;
    },

    // Reset
    resetResponse(state: RequestState) {
      state.response = {
        loading: false,
        loadingGetDetailRequest: false,
        loadingAction: false,

        error: -1,
        message: '',
      };
    },

    resetCalledWithdraw(state: RequestState) {
      state.calledWithdraw = false;
    },

    resetResponseActionRequest(state: RequestState) {
      state.responseActionRequest = {
        loading: false,
        error: -1,
        message: '',
      };
    },

    resetDataWithdraw(state: RequestState) {
      state.withdraw = [];
    },

    resetDataWithdrawGame(state: RequestState) {
      state.withdrawGame = [];
    },

    resetDataRecharge(state: RequestState) {
      state.recharge = [];
      state.addition = [];
      state.requirements = [];
    },

    resetTotalPage(state: RequestState) {
      state.totalPage = 0;
    },
    resetPageLoaded(state: RequestState) {},

    resetAllFieldRequest(state: RequestState) {
      return {
        ...initialState,
      };
    },

    // get detail request recharge
    requestGetDetailRequest(state: RequestState, action: PayloadAction<{ requestId: number }>) {
      state.response.loadingGetDetailRequest = true;
    },

    addRequestIdToCalledDetailRequest(state: RequestState, action: PayloadAction<{ requestId: number }>) {
      const requestId = action.payload.requestId;

      state.calledDetailRequest.push(requestId);
    },

    responseUpdateDetailRequest(state: RequestState, action: PayloadAction<TDetailRequest>) {
      const payload = action.payload;

      const indexOfListRequestDetail = state.detailRequest.map(request => request.id).indexOf(payload.id);

      if (indexOfListRequestDetail !== -1) {
        state.detailRequest[indexOfListRequestDetail] = payload;
        return;
      }

      state.detailRequest.unshift(payload);
    },
    removeRequestIdInCalledDetailRequest(state: RequestState, action: PayloadAction<{ requestId: number }>) {
      const requestId = action.payload.requestId;

      let indexOfTarge = state.calledDetailRequest.indexOf(requestId);

      if (indexOfTarge === -1) {
        return;
      }
      state.calledDetailRequest[indexOfTarge] = state.calledDetailRequest[state.calledDetailRequest.length - 1];
      state.calledDetailRequest.pop();
    },
  },
});

const { actions, reducer } = slice;
export const requestActions = actions;
export const requestReducer = reducer;
