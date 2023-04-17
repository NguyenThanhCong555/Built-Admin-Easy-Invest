/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const StackingPage = lazyLoad(
  () => import('./index'),
  module => module.StackingPage,
);
