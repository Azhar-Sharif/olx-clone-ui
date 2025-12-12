export interface ILoginRequest {
  username: string;
  password: string;
}

export interface IRegisterRequest {
  username: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  phone_no?: string;
  address?: string;
  password: string;
}

export interface IUser {
  id: number;
  username: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  phone_no?: string;
  address?: string;
}

export interface IAuthResponse {
  user: IUser;
  message?: string;
}
