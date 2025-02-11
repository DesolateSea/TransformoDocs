import { configureStore, combineReducers } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import userReducer from "./Store/userSlice";
import ModeReducer from "./Store/darkLightSlice";
import { ThunkAction } from "redux-thunk";
import { Action } from "redux";

// Persist configuration for the user slice
const userPersistConfig = {
  key: "user",
  storage,
  version: 1,
};

// Combine reducers
const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer), // Persist only the user slice
  mode: ModeReducer, // Do not persist mode
});

// Define a type for the root state
export type RootState = ReturnType<typeof rootReducer>;

// Configure the store with persisted reducer
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable checks for Redux Persist
    }),
});

// Persistor for Redux Persist
export const persistor = persistStore(store);

// Typed dispatch and thunk
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
