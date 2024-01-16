import { createReducer } from "@reduxjs/toolkit";
import { 
  productCreateRequest, 
  productCreateSuccess, 
  productCreateFail, 
  getAllProductsRequest, 
  getAllProductsSuccess, 
  getAllProductsFailed, 
  deleteProductRequest, 
  deleteProductSuccess, 
  deleteProductFailed, 
  productUpdateRequest, 
  productUpdateSuccess, 
  productUpdateFail 
} from "../actions/product";

const initialState = {
  isLoading: true,
};

export const productReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(productCreateRequest, (state) => {
      state.isLoading = true;
    })
    .addCase(productCreateSuccess, (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
      state.success = true;
    })
    .addCase(productCreateFail, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })
    .addCase(getAllProductsRequest, (state) => {
      state.isLoading = true;
    })
    .addCase(getAllProductsSuccess, (state, action) => {
      state.isLoading = false;
      state.allProducts = action.payload;
    })
    .addCase(getAllProductsFailed, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase(deleteProductRequest, (state) => {
      state.isLoading = true;
    })
    .addCase(deleteProductSuccess, (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    })
    .addCase(deleteProductFailed, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase(productUpdateRequest, (state) => {
      state.isLoading = true;
    })
    .addCase(productUpdateSuccess, (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
      state.success = true;
    })
    .addCase(productUpdateFail, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    });
});