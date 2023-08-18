
import { configureStore } from "@reduxjs/toolkit";
import customersReducer from "./Slices/customersSlice";

const store = configureStore({
  reducer: {
    customers: customersReducer,
  },
});

export default store;
