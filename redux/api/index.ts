import axios from "axios";
import {
  SignInProps,
  SignOutProps,
  AuthResponseProps,
} from "../types/auth.type";
import { getFromAsyncStorage } from "../utils/async-storage.utility";
import { StoresResponseType } from "../types/stores.type";
import { InvoiceType, ProductType } from "../types/product.type";

async function injectToken() {
  // const asyncData = await getFromAsyncStorage("user");
  // const user = JSON.parse(asyncData);
  axios.defaults.headers[
    "Authorization"
  ] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwYjc1ODQ5Zi1hMGFhLTQwMDMtODQyNy05NjNhNjgyNTUxNjYiLCJnaXZlbl9uYW1lIjoiU3VwZXIgQWRtaW4iLCJqdGkiOiI2Y2I1ODk5OS1iZDExLTRjZjQtOGU0Zi01ZDUxMTg1MmQyYTYiLCJpYXQiOiIxNjMwNDk1OTEyIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjpbIlJlZ2lzdGVyZWRVc2VyIiwiU3VwZXJBZG1pbiIsIkFkbWluUGFuZWwiLCJCaWdBZG1pbiIsIkNMX1JFQUQiLCJTVE9SRV9SRUFEIiwiUlBfUkVBRCIsIkZTX1JFQUQiLCJDQVNIX1JFQUQiLCJFTVBfUkVBRCIsIk9SRF9SRUFEIiwiTEFfUkVBRCIsIlJFX1JFQUQiXSwibmJmIjoxNjMwNDk1OTEyLCJleHAiOjE2MzA1MzE5MTIsImlzcyI6Imh0dHA6Ly93d3cudGVzdC5jb20vIiwiYXVkIjoiaHR0cDovL3d3dy50ZXN0LmNvbS8ifQ.jmC7Oxu05Sc0HbFwj_R7XVWTimxkvqlYLIj-h7AZ9lY`;
}

// masked url
axios.defaults.baseURL = "http://172.105.73.213/api";

const api = {
  account: {
    signIn: (data: SignInProps) => {
      return axios
        .post(`/Account/Auth`, data)
        .then<AuthResponseProps>((res) => res.data);
    },
    signOut: (data: SignOutProps) => {
      return axios.post("/account/signOut", data).then((res) => res.data);
    },
  },
  stores: {
    getStores: async () => {
      await injectToken();
      return axios
        .get("/stores/getPagination?offset=0&limit=200")
        .then<{ list: StoresResponseType[]; totalCount: number }>(
          (res) => res.data
        );
    },
  },
  products: {
    getProductByScanData: async (type: "qrcode" | "barcode", data: string) => {
      await injectToken();
      return axios
        .get(`/Product/GetByQrCodeOrBarCode?Type=${type}&Value=${data}`)
        .then<ProductType>((res) => res.data);
    },
  },
  invoices: {
    addInvoice: async (data: InvoiceType) => {
      await injectToken();
      return axios.post(`/invoice`, data).then((res) => res.data);
    },
  },
};

export default api;
