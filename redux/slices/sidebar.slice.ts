import { createSlice } from '@reduxjs/toolkit';

const initialState = false;

const sidebar = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    showMenu() {
      return true;
    },
    hideMenu() {
      return false;
    },
  },
});

export const { showMenu, hideMenu } = sidebar.actions;
export default sidebar.reducer;
