import { createSlice } from "@reduxjs/toolkit";

interface IinitialState {
  collapsed: boolean;
}

export const initialState: IinitialState = {
  collapsed: false,
};

export const ThemeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setCollapsed: (state, action) => {
      state.collapsed = action.payload;
    },
  },
});

export const { setCollapsed } = ThemeSlice.actions;

export default ThemeSlice.reducer;
