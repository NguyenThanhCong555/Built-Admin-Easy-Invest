/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const CreateProject = lazyLoad(
  () => import('./index'),
  module => module.CreateProject,
);
