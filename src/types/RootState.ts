// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

import { AuthState } from 'store/slice/auth/type';
import { BankState } from 'store/slice/bank/types';
import { ProfileState } from 'store/slice/profile/types';
import { ProjectsState } from 'store/slice/projects/type';
import { RequestState } from 'store/slice/request/types';
import { StakeState } from 'store/slice/stacke/type';
import { System } from 'store/slice/system/types';
import { Users } from 'store/slice/users/types';
import { ISearchState } from 'store/slice/search/type';

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  auth?: AuthState;
  projects?: ProjectsState;
  stake?: StakeState;
  profile?: ProfileState;
  search?: ISearchState;
  request?: RequestState;
  system?: System;
  users?: Users;
  bank?: BankState;
}
