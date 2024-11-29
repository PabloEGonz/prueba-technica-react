import { configureStore } from "@reduxjs/toolkit";
import companyReducer from "./companySlice";

export const store = configureStore({
  reducer: {
    companies: companyReducer,
  },
});

// Types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
