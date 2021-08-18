import { createSlice } from '@reduxjs/toolkit';
import { ErrorType } from '../types/common.type';

const initialState: ErrorType = {
  status: false,
  error: {},
};

const error = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError(state, action) {
      return {
        status: true,
        error: action.payload,
      };
    },
    cleanError() {
      return initialState;
    },
  },
});

export const { setError, cleanError } = error.actions;
export default error.reducer;
