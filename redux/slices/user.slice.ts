import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//types
import { AuthResponseProps } from '../types/auth.type';
//utils
import {
  removeFromAsyncStorage,
  saveInAsyncStorage,
} from '../utils/async-storage.utility';

const initialState: AuthResponseProps = {
  expiration: 0,
  refresh_token: '',
  token: '',
  phoneNumber: '',
  email: '',
};

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    load(state: AuthResponseProps, action: PayloadAction<AuthResponseProps>) {
      return action.payload;
    },
    save(state: AuthResponseProps, action: PayloadAction<AuthResponseProps>) {
      const strPayload = JSON.stringify(action.payload);
      saveInAsyncStorage('user', strPayload);
      return action.payload;
    },
    remove() {
      removeFromAsyncStorage('user');
      return initialState;
    },
  },
});

export const { save, remove, load } = user.actions;
export default user.reducer;
