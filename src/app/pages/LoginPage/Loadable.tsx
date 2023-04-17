/**
 * Asynchronously loads the component for HomePage
 */

import { lazy } from 'react';
import { lazyLoad } from 'utils/loadable';

export const LoginPage = lazyLoad(
  () => import('./index'),
  module => module.LoginPage,
);

export const Telephone = lazyLoad(
  () => import('./Screen/Telephone/Telephone'),
  module => module.Telephone,
);
