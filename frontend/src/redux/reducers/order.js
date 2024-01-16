import { createReducer } from "@reduxjs/toolkit";
import { 
  getAllOrdersUserRequest, 
  getAllOrdersUserSuccess, 
  getAllOrdersUserFailed, 
  adminAllOrdersRequest, 
  adminAllOrdersSuccess, 
  adminAllOrdersFailed
} from "../actions/order";

const initialState = {
  isLoading: true,
};

export const orderReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getAllOrdersUserRequest, (state) => {
      state.isLoading = true;
    })
    .addCase(getAllOrdersUserSuccess, (state, action) => {
      state.isLoading = false;
      state.userOrders = action.payload;
    })
    .addCase(getAllOrdersUserFailed, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase(adminAllOrdersRequest, (state) => {
      state.isLoading = true;
    })
    .addCase(adminAllOrdersSuccess, (state, action) => {
      state.isLoading = false;
      state.adminOrders = action.payload;
    })
    .addCase(adminAllOrdersFailed, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
});