import { ScannerRouteType } from "./scanner.type";

export type RootStackParamList = {
  Root: undefined;
  Auth: undefined;
  NotFound: undefined;
};

export type AuthStackParamList = {
  AuthTypes: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Forgot: undefined;
  Exam: undefined;
};

export type MainStackParamList = {
  ShopList: undefined;
  Scanner: ScannerRouteType;
  Products: undefined;
};
