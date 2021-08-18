import { combineReducers, configureStore, Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { useDispatch } from 'react-redux';
//reducers
import userSlice from './slices/user.slice';
import translationSlice from './slices/translation.slice';
import onboardSlice from './slices/onboard.slice';
import loadingSlice from './slices/loading.slice';
import sidebarSlice from './slices/sidebar.slice';
import errorSlice from './slices/error.slice';
import examSlice from './slices/exam.slice';

export const rootReducer = combineReducers({
  user: userSlice,
  translation: translationSlice,
  onboard: onboardSlice,
  error: errorSlice,
  loading: loadingSlice,
  sidebar: sidebarSlice,
  exam: examSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export const useAsyncDispatch = (action: any, cb: Function) => {
  store.dispatch(action());
  cb();
};

export default store;
