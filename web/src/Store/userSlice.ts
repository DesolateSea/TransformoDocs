// src/features/userSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { UserVerify } from '../scripts/UserAuth'; // Adjust the import path

// Define the structure of the user state
interface UserState {
  isAuthenticated: boolean;
  userInfo: UserInfo | null;
  loading: boolean;
  error: string | null;
}

// Define the structure of user info
interface UserInfo {
  id: string;
  name: string;
  email: string;
  // Add other fields as per the user information you expect
}

// Define initial state
const initialState: UserState = {
  isAuthenticated: false,
  userInfo: null,
  loading: false,
  error: null,
};

// Create an async thunk for user verification
export const verifyUser = createAsyncThunk<UserInfo | null>(
  'user/verifyUser',
  async () => {
    const info: UserInfo | null = await UserVerify();
    return info;
  }
);

// Create a slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<UserInfo>) => {
      state.isAuthenticated = true;
      state.userInfo = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userInfo = null;
    },
    ProfileUpdate: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyUser.fulfilled, (state, action: PayloadAction<UserInfo | null>) => {
        if (action.payload) {
          state.isAuthenticated = true;
          state.userInfo = action.payload;
        } else {
          state.isAuthenticated = false;
          state.userInfo = null;
        }
        state.loading = false;
      })
      .addCase(verifyUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error occurred';
      });
  },
});

// Export actions
export const { logout, loginSuccess, ProfileUpdate } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
