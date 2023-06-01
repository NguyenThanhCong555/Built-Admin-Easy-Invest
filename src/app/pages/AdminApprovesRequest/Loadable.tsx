import { lazyLoad } from 'utils/loadable';

export const Recharge = lazyLoad(
  () => import('./recharge/recharge'),
  module => module.Recharge,
);
export const Withdraw = lazyLoad(
  () => import('./withdraw/withdraw'),
  module => module.Withdraw,
);

export const WithdrawGame = lazyLoad(
  () => import('./withdrawGame/withdrawGame'),
  module => module.WithdrawGame,
);

export const DetailRequestRecharge = lazyLoad(
  () => import('./recharge/DetailRequest'),
  module => module.DetailRequestRecharge,
);

export const DetailRequestWithdraw = lazyLoad(
  () => import('./withdraw/DetailRequest'),
  module => module.DetailRequestWithdraw,
);
export const DetailRequestPlusMoney = lazyLoad(
  () => import('./requestPlus/RPlus'),
  module => module.RPlus,
);
export const DetailRequestdeduction = lazyLoad(
  () => import('./requestDeduction/RDeduction'),
  module => module.RDeduction,
);
export const DetailRequestPlus = lazyLoad(
  () => import('./requestPlus/DetailRequest/index'),
  module => module.DetailRequestPlus,
);
export const DetailRequestDeduction = lazyLoad(
  () => import('./requestDeduction/DetailRequest/index'),
  module => module.DetailRequestDeduction,
);
