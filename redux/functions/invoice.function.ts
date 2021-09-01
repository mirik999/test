import { InvoiceProductType, ProductType } from "../types/product.type";
import { Platform } from "react-native";

export function convertProductToInvoiceProduct(
  product: ProductType,
  quantity: number,
  storeId: string,
  storeName: string
): InvoiceProductType {
  const sellingAmount = quantity * product.selling;
  const buyingAmount = quantity * product.buying;
  return {
    id: "00000000-0000-0000-0000-000000000000",
    invoiceId: "00000000-0000-0000-0000-000000000000",
    productId: product.id,
    productName: product.productName,
    storeIdFirst: storeId,
    storeNameFirst: storeName,
    storeIdSecond: "00000000-0000-0000-0000-000000000000",
    storeNameSecond: "string",
    clientId: "FB45ABC1-1517-4BC1-AEBB-BDE20063D9EF",
    clientName: "string",
    sellingAmount: sellingAmount,
    buyingAmount: buyingAmount,
    invoiceNum: 0, // sql-de increment
    quantity: quantity,
    selling: product.selling,
    buying: product.buying,
    cost: product.cost,
    count: product.count,
    discount: 0,
    discountPrice: product.selling,
    amount: sellingAmount,
    discountAmount: sellingAmount,
    barkod: product.barkod,
    code: product.code,
    articul: product.articul,
    note: "#",
    size: product.size,
    benefit: sellingAmount - product.cost * quantity,
    deleteStatus: false,
    date: new Date().toISOString(),
    dateLimit: new Date().toISOString(),
    operation: "selling",
    operationEnum: 0,
    correctStatus: "string",
    selectedForRemoving: false,
    compared: false,
    version: "",
  };
}

export function checkTypeofScannedData(
  scanType: string | number
): "qrcode" | "barcode" {
  const isIOS = Platform.OS === "ios";
  return isIOS
    ? String(scanType).toLowerCase().includes("qr")
      ? "qrcode"
      : "barcode"
    : scanType === 1
    ? "barcode"
    : "qrcode";
}
