import { InvoiceProductType } from "./product.type";

export type ScannerRouteType = {
  storeId: string;
  storeName: string;
  invoiceProducts: InvoiceProductType[];
};
