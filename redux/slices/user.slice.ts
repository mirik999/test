import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//types
import { AuthResponse } from '../types/auth.type';
//utils
import {
  removeFromAsyncStorage,
  saveInAsyncStorage,
} from '../utils/async-storage.utility';

const initialState: AuthResponse = {
  expiration: 0,
  refresh_token: '',
  token: '',
  username: '',
};

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    load(state: AuthResponse, action: PayloadAction<AuthResponse>) {
      return action.payload;
    },
    save(state: AuthResponse, action: PayloadAction<AuthResponse>) {
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
