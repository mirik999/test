import axios from 'axios';
import { SignInProps, AuthResponse } from '../types/auth.type';
import { getFromAsyncStorage } from '../utils/async-storage.utility';
import { StoresResponseType } from '../types/stores.type';
import { InvoiceType, ProductType } from '../types/product.type';

async function injectToken() {
  const asyncData = await getFromAsyncStorage('user');
  const user = JSON.parse(asyncData);
  axios.defaults.headers['Authorization'] = `Bearer ${user.token}`;
}

// masked url
axios.defaults.baseURL = 'http://172.105.73.213/api';

const api = {
  account: {
    signIn: (data: SignInProps) => {
      return axios.post(`/Account/Auth`, data).then<AuthResponse>((res) => res.data);
    },
    signOut: (data: any) => {
      return axios.post('/account/signOut', data).then((res) => res.data);
    },
  },
  stores: {
    getStores: async () => {
      await injectToken();
      return axios
        .get('/stores/getPagination?offset=0&limit=200')
        .then<{ list: StoresResponseType[]; totalCount: number }>((res) => res.data);
    },
  },
  products: {
    getProductByScanData: async (type: 'qrcode' | 'barcode', data: string) => {
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
