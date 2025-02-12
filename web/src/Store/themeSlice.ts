import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
  isDarkMode: boolean;
  systemPreference: boolean;
}

const initialState: ThemeState = {
  isDarkMode: false,
  systemPreference: true,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
      state.systemPreference = false;
    },
    setTheme: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
      state.systemPreference = false;
    },
    useSystemPreference: (state) => {
      state.systemPreference = true;
      state.isDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
    },
  },
});

export const { toggleTheme, setTheme, useSystemPreference } =
  themeSlice.actions;
export default themeSlice.reducer;
