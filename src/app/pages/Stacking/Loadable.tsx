/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const StackingPage = lazyLoad(
  () => import('./index'),
  module => module.StackingPage,
);

export const StakingCoinPage = lazyLoad(
  () => import('./StakingCoinPage'),
  module => module.StakingCoinPage,
);
