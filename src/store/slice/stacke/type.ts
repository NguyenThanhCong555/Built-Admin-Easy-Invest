export interface StakeState {
  stakeChangeId?: string | number;
  products?: ProductListState[];
}

export interface ProductListState {
  project_id: number | string;
  data: ProductState[];
}

export interface ProductState {
  id: number | string;
  project_id: number | string;
  interest_rate: number | string;
  interest_rate_before: number | string;
  min_stake: number | string;
  max_stake: number | string;
  timeframe: number | string;
  description: {};
  status: number | string;
}
