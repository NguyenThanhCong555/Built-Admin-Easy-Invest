export type ProjectsState = {
  projects: DataProject[];
  filterProjects: DataProject[];

  calledFirstProjects: boolean;

  project: ResponseProject;
  isProjectChange: boolean;
  response: {
    loading: boolean;
    updating: boolean;
    error: number;
    message: string;
  };
};

export interface DataProject {
  id: number;
  name: string;
  avatar: string;
  author: { name: string };
  state: number;
  total_invested: number;
}

export type ResponseProject = {
  id?: number;
  name?: string;
  avatar?: string;
  dataIsDuplicated: string[];
  cover_photo?: string[];
  coinInfo: {
    coin_avatar?: string;
    coin_name?: string;
    min_transfer?: number;
    rate_usdt_coin?: number;
  };
  author?: {
    name?: string;
  };
  intro: {
    ENG: string;
    VN: string;
  };
  website?: string;
  create_time?: number;
  update_time?: number;
  state?: 0 | 1;
  staking?: number;
};
