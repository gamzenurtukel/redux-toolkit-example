import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import productsApi from "../services/productsApi";

const FALLBACK_URL = "https://6342e9393f83935a784c3ece.mockapi.io";

export const fetchAsyncProductsCategory = createAsyncThunk(
  "products/fetchAsyncProductsCategory",
  async () => {
    try {
      const response = await productsApi.get(`/categories`);
      return response.data;
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        return fetch(`${FALLBACK_URL}/products-categories`)
          .then((res) => res.json())
          .then((data) => data);
      }
    }
  }
);
export const fetchAsyncProducts = createAsyncThunk(
  "products/fetchAsyncProducts",
  async () => {
    try {
      const response = await productsApi.get(`/`);
      return response.data;
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        return fetch(`${FALLBACK_URL}/products`)
          .then((res) => res.json())
          .then((data) => data);
      }
    }
  }
);
const initialState = {
  productsList: [],
  category: [],
  selectedCategory: "",
};
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCategory(state, { payload }) {
      state.selectedCategory = payload;
    },
    resetCategory(state) {
      state.selectedCategory = "";
    },
  },
  extraReducers: {
    [fetchAsyncProducts.fulfilled]: (state, { payload }) => {
      state.productsList = payload;
    },
    [fetchAsyncProducts.rejected]: (state, action) => {
      message.error("Products app rejected");
    },

    [fetchAsyncProductsCategory.fulfilled]: (state, { payload }) => {
      state.category = payload;
    },
    [fetchAsyncProductsCategory.rejected]: (state) => {
      state.category = state.productsList.map((product) => product.categories);
    },
  },
});
export const getAllProducts = (state) => state.products.productsList;
export const getCategoryProducts = (state) => state.products.category;
export const getSelectedCategory = (state) => state?.products.selectedCategory;
export const { setCategory } = productsSlice.actions;
export default productsSlice.reducer;
