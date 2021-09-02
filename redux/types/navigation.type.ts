import { ScannerRouteType } from './scanner.type';
import { InvoiceProductType, InvoiceType, ProductType } from './product.type';

export type RootStackParamList = {
  MainRoot: undefined;
  AuthRoot: undefined;
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
  Auth: undefined;
  ShopList: undefined;
  Scanner: ScannerRouteType;
  Products: {
    storeId: string;
    storeName: string;
    invoiceProducts: InvoiceProductType[];
    invoice: InvoiceType;
  };
};
