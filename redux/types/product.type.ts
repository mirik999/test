export type ProductType = {
  activ: boolean;
  articul: string;
  barCodeExists: boolean;
  barkod: string;
  brutto: number;
  buying: number;
  code: string;
  cost: number;
  count: number;
  countryOfManufacturerId: string;
  deleteStatus: boolean;
  groupId: string;
  id: string;
  imageUrl: string;
  info: string;
  limit: number;
  modelId: string;
  nameOfManufacturer: string;
  nameUnitOne: string | null;
  netto: number;
  note: string;
  productName: string;
  qrCode: string;
  qrCodeExists: boolean;
  quantity: number;
  rowNum: number;
  selling: number;
  size: string;
  unitOfMeasurementOneId: string;
  unitOfMeasurementTwoId: string;
  volume: number;
};

export type InvoiceProductType = {
  id: string;
  invoiceId: string;
  productId: string;
  productName: string;
  storeIdFirst: string;
  storeIdSecond: string;
  storeNameFirst: string;
  storeNameSecond: string;
  clientId: string;
  clientName: string;
  sellingAmount: number;
  buyingAmount: number;
  invoiceNum: number;
  quantity: number;
  selling: number;
  buying: number;
  cost: number;
  count: number;
  discount: number;
  discountPrice: number;
  amount: number;
  discountAmount: number;
  barkod: string;
  code: string;
  articul: string;
  note: string;
  size: string;
  benefit: number;
  deleteStatus: boolean;
  date: string;
  dateLimit: string;
  operation: string;
  operationEnum: number;
  correctStatus: string;
  selectedForRemoving: boolean;
  compared: boolean;
  version: string;
};

export type InvoiceType = {
  invoiceId: string;
  storeIdFirst: string;
  storeIdSecond: string;
  clientId: string;
  date: string;
  totalAmount: number;
  benefit: number;
  note: string;
  invoiceNumber: number;
  deleteStatus: boolean;
  dateLimit: string;
  operation: string;
  listProduct: InvoiceProductType[];
  imageUrl: string;
};