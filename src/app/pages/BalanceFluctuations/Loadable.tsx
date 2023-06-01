import { lazyLoad } from 'utils/loadable';

export const BalanceFunctuations = lazyLoad(
  () => import('./BalanceFluctuatios'),
  module => module.BalanceFluctuations,
);
export const TransactionDetails = lazyLoad(
  () => import('./TransactionDetails'),
  module => module.default,
);
