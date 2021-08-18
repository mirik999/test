import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = true;

const onboard = createSlice({
  name: 'onboard',
  initialState,
  reducers: {
    disable(state: boolean, action: PayloadAction<boolean>) {
      return action.payload;
    },
  },
});

export const { disable } = onboard.actions;
export default onboard.reducer;
