import { createReducer } from "@reduxjs/toolkit";
import { 
  loadUserRequest, 
  loadUserSuccess, 
  loadUserFail, 
  updateUserInfoRequest, 
  updateUserInfoSuccess, 
  updateUserInfoFailed, 
  updateUserAddressRequest, 
  updateUserAddressSuccess, 
  updateUserAddressFailed, 
  deleteUserAddressRequest, 
  deleteUserAddressSuccess, 
  deleteUserAddressFailed, 
  getAllUsersRequest, 
  getAllUsersSuccess, 
  getAllUsersFailed 
} from "../actions/user";

const initialState = {
  isAuthenticated: false,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadUserRequest, (state) => {
      state.loading = true;
    })
    .addCase(loadUserSuccess, (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    })
    .addCase(loadUserFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })
    .addCase(updateUserInfoRequest, (state) => {
      state.loading = true;
    })
    .addCase(updateUserInfoSuccess, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    })
    .addCase(updateUserInfoFailed, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(updateUserAddressRequest, (state) => {
      state.addressloading = true;
    })
    .addCase(updateUserAddressSuccess, (state, action) => {
      state.addressloading = false;
      state.successMessage = action.payload.successMessage;
      state.user = action.payload.user;
    })
    .addCase(updateUserAddressFailed, (state, action) => {
      state.addressloading = false;
      state.error = action.payload;
    })
    .addCase(deleteUserAddressRequest, (state) => {
      state.addressloading = true;
    })
    .addCase(deleteUserAddressSuccess, (state, action) => {
      state.addressloading = false;
      state.successMessage = action.payload.successMessage;
      state.user = action.payload.user;
    })
    .addCase(deleteUserAddressFailed, (state, action) => {
      state.addressloading = false;
      state.error = action.payload;
    })
    .addCase(getAllUsersRequest, (state) => {
      state.usersLoading = true;
    })
    .addCase(getAllUsersSuccess, (state, action) => {
      state.usersLoading = false;
      state.users = action.payload;
    })
    .addCase(getAllUsersFailed, (state, action) => {
      state.usersLoading = false;
      state.error = action.payload;
    });
});