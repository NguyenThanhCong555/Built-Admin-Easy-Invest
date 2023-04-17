export interface LoginState {
  error?: number;
  message?: string;
}

export interface ProjectState {
  id: number;
  name: string;
  avatar: string;
  author: {
    name: string;
  };
  state: number | string;
  total_invested: number | string;
}
export interface AuthState {
  id: number;
  token: string;
  refreshToken: string;
  refreshToken_time: number;
  username: string;
  language: string;
  isLogin: boolean;
  isMobile: boolean;
  isAuthen: boolean;
  isError: boolean;
  isLoading: boolean;
  isChangeProjects: boolean;
  login: LoginState;
  projects: ProjectState[];

  response: {
    messageLoginTelegram: string;
    errorLoginTelegram: number;
  };
}
