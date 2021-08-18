import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
//types
import { Code, Languages, InitialType } from '../types/translation.type';

const initialState: InitialType = {
  languages: [],
  translation: {},
  code: 'EN',
};

const translationSlice = createSlice({
  name: 'translation',
  initialState,
  reducers: {
    getAllTranslations(
      state: InitialType,
      action: PayloadAction<{ languages: Languages[]; code: Code }>
    ): InitialType {
      const selected = action.payload.languages.find(
        (tr: Languages) => tr.languageCode === action.payload.code
      )!;
      return {
        languages: action.payload.languages,
        translation: JSON.parse(selected.translation),
        code: action.payload.code || state.code,
      };
    },
    filterTranslations(state: InitialType, action: PayloadAction<Code>): InitialType {
      const selectedLangCode = action.payload.toUpperCase() as Code;
      const selected = state.languages.find(
        (tr: any) => tr.languageCode === selectedLangCode
      )!;
      return {
        languages: state.languages,
        translation: JSON.parse(selected.translation),
        code: selectedLangCode,
      };
    },
  },
});

export const { getAllTranslations, filterTranslations } = translationSlice.actions;
export default translationSlice.reducer;
