import { configureStore, combineReducers } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import userReducer from "./Store/userSlice";
import ModeReducer from "./Store/darkLightSlice";
import { ThunkAction } from "redux-thunk";
import { Action } from "redux";

// Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  mode: ModeReducer,
});

// Define a type for the root state
export type RootState = ReturnType<typeof rootReducer>;

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

// Persist the root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for redux-persist
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
