import { InvoiceProductType, ProductType } from "../types/product.type";

export function convertProductToInvoiceProduct(
  product: ProductType,
  count: number,
  storeId: string,
  storeName: string
): InvoiceProductType {
  const sellingAmount = count * product.selling;
  const buyingAmount = count * product.buying;
  return {
    id: "",
    invoiceId: "",
    productId: product.id,
    productName: product.productName,
    storeIdFirst: storeId,
    storeNameFirst: storeName,
    storeIdSecond: "string",
    storeNameSecond: "string",
    clientId: "",
    clientName: "string",
    sellingAmount: sellingAmount,
    buyingAmount: buyingAmount,
    invoiceNum: 0, // sql-de increment
    quantity: product.quantity,
    selling: product.selling,
    buying: product.buying,
    cost: product.cost,
    count: count,
    discount: 0,
    discountPrice: product.selling,
    amount: sellingAmount,
    discountAmount: sellingAmount,
    barkod: product.barkod,
    code: product.code,
    articul: product.articul,
    note: product.note,
    size: product.size,
    benefit: sellingAmount - product.cost * count,
    deleteStatus: false,
    date: new Date().toLocaleDateString(),
    dateLimit: new Date().toLocaleDateString(),
    operation: "selling",
    operationEnum: 0,
    correctStatus: "string",
    selectedForRemoving: false,
    compared: false,
    version: "string",
  };
}
