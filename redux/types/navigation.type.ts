import { ScannerRouteType } from "./scanner.type";
import { InvoiceProductType, InvoiceType, ProductType } from "./product.type";

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
  Products: {
    storeId: string;
    storeName: string;
    invoiceProducts: InvoiceProductType[];
    invoice: InvoiceType;
  };
};
