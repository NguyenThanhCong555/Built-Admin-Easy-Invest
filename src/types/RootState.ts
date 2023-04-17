// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

import { AuthState } from 'store/slice/auth/type';
import { ProjectsState } from 'store/slice/projects/type';
import { StakeState } from 'store/slice/stacke/type';

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  auth?: AuthState;
  projects?: ProjectsState;
  stake?: StakeState;
}
