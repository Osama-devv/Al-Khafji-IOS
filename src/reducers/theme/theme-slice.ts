// Move theme variant management into Redux
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ThemeState, Variant } from '@theme/types/config';

const initialState: ThemeState = {
  variant: 'default',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme: (state, action: PayloadAction<Variant>) => {
      state.variant = action.payload;
    },
  },
});

export default themeSlice.reducer;
export const { changeTheme } = themeSlice.actions;


