import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const customersSlice = createSlice({
  name: "customers",
  initialState: {
    page: null,
    per_page: null,
    total: null,
    total_pages: null,
    data: [],
  },
  reducers: {
    fetchCustomer: (state, action) => {
      state.page = action.payload.page;
      state.per_page = action.payload.per_page;
      state.total = action.payload.total;
      state.total_pages = Math.ceil(
        action.payload.total / action.payload.per_page
      );

      const customers = action.payload.data.map((item) => {
        const newItem = { ...item };
        newItem.id = uuidv4().slice(0, 5);
        return newItem;
      });

      state.data = customers;
      localStorage.setItem(
        "customersList",
        JSON.stringify(action.payload.customers)
      );
    },
    addCustomer: (state, action) => {
      console.log(action.payload);

      action.payload.id = uuidv4().slice(0, 5);
      state.data.push(action.payload);
      state.total += 1;
      state.total_pages = Math.ceil(state.total / state.per_page);
      localStorage.setItem("customersList", JSON.stringify(state.data));
    },
    updateCustomer: (state, action) => {
      const index = state.data.findIndex(
        (item) => item.id === action.payload.id
      );
      state.data[index] = action.payload;
      localStorage.setItem("customersList", JSON.stringify(state.data));
    },
    deleteCustomer: (state, action) => {
      const index = state.data.findIndex(
        (item) => item.id === action.payload.id
      );
      state.data.splice(index, 1);
      state.total -= 1;
      state.total_pages = Math.ceil(state.total / state.per_page);
      localStorage.setItem("customersList", JSON.stringify(state.data));
    },
  },
});

export const { fetchCustomer, addCustomer, updateCustomer, deleteCustomer } =
  customersSlice.actions;

export default customersSlice.reducer;
