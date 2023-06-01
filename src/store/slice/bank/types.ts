export interface BankState {
  list: any[];
  calledListBank: boolean;

  response: {
    loading: boolean;
    message: string;
    error: number;
  };

  responseAction: {
    loading: boolean;
    message: string;
    error: number;
  };
}
