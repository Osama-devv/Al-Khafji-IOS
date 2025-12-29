
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IPayload {
  payload: Record<string, unknown>;
}
const initialState: IPayload = {
  payload: {},
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    updateFiltersPayload: (state, action: PayloadAction<any>) => {
        console.log('Updating filters with payload:', action.payload);
      state.payload = action.payload;
    },
  },
});

export default filterSlice.reducer;
export const { updateFiltersPayload } = filterSlice.actions;


