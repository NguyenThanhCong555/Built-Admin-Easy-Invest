export type requestCreateNewRequestPlusOrSubtract = {
  coin_id: number;
  exchange: number;
  content: string;
  service?: number;
  userid: number;
};

export type getRequestHistory = {
  page: number;
  service?: number;
  beginTime: number;
  endTime: number;
  status?: number;
  userId?: number;
};
