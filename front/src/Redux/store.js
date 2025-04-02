import { configureStore, createAction, createReducer } from "@reduxjs/toolkit";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const setUserData = createAction("user/login");
export const clearUserData = createAction("user/logout");

const persistConfig = {
  key: "auth",
  storage,
};

const initialState = {
  auth: {
    user: null,
    tokenAccess: null,
    tokenRefresh: null,
  },
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setUserData, (state, action) => {
      const { tokenAccess, tokenRefresh, user } = action.payload;
      return { auth: { tokenAccess, tokenRefresh, user } };
    })
    .addCase(clearUserData, () => initialState);
});

const store = configureStore({
  reducer: persistReducer(persistConfig, reducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
