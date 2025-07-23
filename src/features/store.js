import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/auth-slice";
import dailyLogsReducer from "./daily-logs/daily-logs-slice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage

// 1. Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
  dailyLogs: dailyLogsReducer,
});

// 2. Create a persist config for the root
const persistConfig = {
  key: "root",
  storage,
  // Optional: blacklist or whitelist reducers
  // blacklist: ['someTransientReducer'],
};

// 3. Wrap rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4. Create store with persisted reducer
export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// 5. Export persistor
export const persistor = persistStore(store);
