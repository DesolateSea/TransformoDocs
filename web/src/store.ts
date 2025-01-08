import { configureStore, combineReducers } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import storage from 'redux-persist/lib/storage';
import userReducer from './Store/userSlice';
import ModeReducer from './Store/darkLightSlice';
// Define the root state type based on the reducers
const rootReducer = combineReducers({
  user: userReducer,
  mode: ModeReducer,
});

// Define a type for the root state
export type RootState = ReturnType<typeof rootReducer>;

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

// Create a persisted reducer with the configuration
const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

// Configure the Redux store with the persisted reducer and middleware
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Export the persistor for Redux Persist
export const persistor = persistStore(store);

// Clear storage for development (optional, remove in production)
persistor.purge();

// Define a type for the App Dispatch to use in your app
export type AppDispatch = typeof store.dispatch;
