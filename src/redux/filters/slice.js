import { createSlice } from '@reduxjs/toolkit';
const slice = createSlice({
  name: 'filters',
  initialState: {
    name: '',
    isFavourite: 'all',
    contactType: 'all',
  },
  reducers: {
    changeFilter(state, action) {
      state.name = action.payload.name;
      state.isFavourite = action.payload.isFavourite;
      state.contactType = action.payload.contactType;
    },
  },
});

export const { changeFilter } = slice.actions;
export default slice.reducer;
