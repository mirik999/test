export type GrantType = 'password' | 'sign_out';

export type SignUpStepOneProps = {
  phoneNumber: string;
  password: string;
  confirmPassword: string;
};

export type SignUpStepTwoProps = {
  displayName: string;
  email: string;
  city: string;
  birthDate: string;
  interested: string;
};

export type SignUpProps = SignUpStepOneProps & SignUpStepTwoProps;

export type SignInProps = {
  grant_type: string;
  provider_id: string;
  phone: string;
  password: string;
};

export type SignOutProps = {
  grant_type: GrantType;
  refresh_token: string;
};

export type RouteParams = {
  SignIn: {
    created: boolean;
    username: string;
    password: string;
  };
};

export type AuthResponseProps = {
  expiration: number;
  refresh_token: string;
  token: string;
  email: string;
  phoneNumber: string;
};
