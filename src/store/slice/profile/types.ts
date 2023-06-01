export interface ProfileState {
  profile: Profile;
  calledProfile: boolean;

  response: {
    loading: boolean;
    message: string;
    error: number;
  };
}

interface Profile {
  avatar: string;
  create_time: number;
  name: string;
  phone_number: string;
  isUpdate: boolean;
}
