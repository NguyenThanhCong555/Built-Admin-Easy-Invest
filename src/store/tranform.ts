import { createTransform } from 'redux-persist';
import { ProjectsState } from './slice/projects/type';
import { ProfileState } from './slice/profile/types';
import { RequestState } from './slice/request/types';
import { INITIAL_VALUE } from 'constants/common';
import { BankState } from './slice/bank/types';
import { ISearchState } from './slice/search/type';

export const projectTransform = createTransform(
  (inboundState: any, key) => {
    return {
      ...inboundState,
    };
  },
  (outboundState: any, key): {} => {
    return {
      ...(outboundState as ProjectsState),
      type: 0,
      project: {
        id: -1,
        name: '',
        avatar: '',
        coinInfo: {
          coin_avatar: '',
          coin_name: '',
          min_transfer: 0,
          rate_usdt_coin: 0,
          purchase_fee: 0,
          selling_fee: 0,
        },
        cover_photo: [],
        author: { name: '' },
        intro: {
          ENG: '',
          VN: '',
        },
        dataIsDuplicated: [],
        website: '',
        create_time: 0,
        update_time: 0,
        state: 0,
        staking: -1,
      },
      calledFirstProjects: false,
      response: {
        loading: false,
        error: -1,
        message: '',
        updating: false,
      },
    };
  },
  { whitelist: ['projects'] },
);

export const profileTransform = createTransform(
  (inboundState: any, key) => {
    return {
      ...inboundState,
    };
  },
  (outboundState: any, key): {} => {
    return {
      ...(outboundState as ProfileState),
      calledProfile: false,

      response: {
        error: -1,
        message: '',
        loading: false,
      },
    };
  },
  { whitelist: ['profile'] },
);

export const requestsTransform = createTransform(
  (inboundState: any, key) => {
    return {
      ...inboundState,
    };
  },
  (outboundState: any, key): {} => {
    return {
      ...(outboundState as RequestState),
      withdraw: [],
      calledWithdraw: false,

      withdrawGame: [],

      recharge: [],
      totalPage: 0,

      detailRequest: [],
      calledDetailRequest: [],

      addition: [],
      requirements: [],

      response: {
        error: -1,
        message: '',
        loading: false,
        loadingGetDetailRequest: false,
        loadingAction: false,
      },

      responseActionRequest: {
        loading: false,
        message: '',
        error: -1,
      },
    };
  },
  { whitelist: ['request'] },
);

export const usersTransform = createTransform(
  (inboundState: any, key) => {
    return {
      ...inboundState,
    };
  },
  (outboundState: any, key): {} => {
    return {
      ...(outboundState as RequestState),
      historyPlus: [],
      totalPageOfHistoryPlus: INITIAL_VALUE,
      totalPageLocalOfHistoryPlus: 1, // 1: initial one page

      historySubtract: [],
      totalPageOfHistorySubtract: INITIAL_VALUE,
      totalPageLocalOfHistorySubtract: 1, // 1: initial one page

      calledDetailRequest: [],

      response: {
        loading: false,
        loadingBlockAccount: false,
        loadingCreateRequest: false,
        loadingHistoryPlus: false,
        loadingHistorySubtract: false,
        loadingGetDetailRequest: false,
        loadingCancelCreatedRequest: false,

        error: INITIAL_VALUE,
        message: '',

        errorBlockAccount: INITIAL_VALUE,
        errorCreateRequest: INITIAL_VALUE,
        errorDeleteRequest: INITIAL_VALUE,
      },
    };
  },
  { whitelist: ['users'] },
);

export const systemTransform = createTransform(
  (inboundState: any, key) => {
    return {
      ...inboundState,
    };
  },
  (outboundState: any, key): {} => {
    return {
      ...(outboundState as RequestState),
      systemError: false,
    };
  },
  { whitelist: ['system'] },
);

export const bankTransform = createTransform(
  (inboundState: any, key) => {
    return {
      ...inboundState,
    };
  },
  (outboundState: any, key): {} => {
    return {
      ...(outboundState as BankState),
      list: [],
      calledListBank: false,

      response: {
        error: -1,
        message: '',
        loading: false,
      },

      responseAction: {
        loading: false,
        error: -1,
        message: '',
      },
    };
  },
  { whitelist: ['bank'] },
);
export const searchTransform = createTransform(
  (inboundState: any, key) => {
    return {
      ...inboundState,
    };
  },
  (outboundState: any, key): {} => {
    return {
      ...(outboundState as ISearchState),
      dataSearch: [],
      totalPage: 1,

      response: {
        loading: false,
        loadingGetDetailRequest: false,
        loadingAction: false,

        error: -1,
        message: '',
      },
    };
  },
  { whitelist: ['searh'] },
);
