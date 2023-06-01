/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const EntrySearchUser = lazyLoad(
  () => import('./EntrySearchUser'),
  module => module.EntrySearchUser,
);

export const SimpleUserInformation = lazyLoad(
  () => import('./SimpleUserInformation'),
  module => module.SimpleUserInformation,
);

export const VolatilityBalance = lazyLoad(
  () => import('./VolatilityBalance'),
  module => module.VolatilityBalance,
);

export const HistoryRequestUserManagement = lazyLoad(
  () => import('./History'),
  module => module.HistoryRequest,
);

export const DetailHistoryRequestUserManagement = lazyLoad(
  () => import('./History/DetailRequest'),
  module => module.DetailRequestRecharge,
);
