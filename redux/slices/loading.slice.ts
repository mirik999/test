import { createSlice } from '@reduxjs/toolkit';

const initialState = false;

const loading = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    show() {
      return true;
    },
    hide() {
      return false;
    },
  },
});

export const { show, hide } = loading.actions;
export default loading.reducer;
