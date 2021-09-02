export type GrantType = 'password' | 'sign_out';

export type SignInProps = {
  username: string;
  grant_type: string;
  provider_id: string;
  password: string;
};

export type AuthResponse = {
  expiration: number;
  refresh_token: string;
  token: string;
  username: string;
};
