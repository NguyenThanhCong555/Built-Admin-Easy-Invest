/**
 * Asynchronously loads the component for NotFoundPage
 */

import { lazyLoad } from 'utils/loadable';

export const PageProjectDetails = lazyLoad(
  () => import('./index'),
  module => module.ProjectDetails,
);
export const PageEditInfoCoin = lazyLoad(
  () => import('./HeadInfoCoinBasicEdit'),
  module => module.PageEditInfoCoin,
);
export const PageAddInfoCoin = lazyLoad(
  () => import('./HeadInfoCoinBasicAdd'),
  module => module.PageAddInfoCoin,
);
