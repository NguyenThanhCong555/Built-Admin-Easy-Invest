/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const UpdateProject = lazyLoad(
  () => import('./index'),
  module => module.UpdateProject,
);
