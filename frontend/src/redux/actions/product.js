import axios from "axios";
import { createAction } from "@reduxjs/toolkit";
import { server } from "../../server";

export const productCreateRequest = createAction("productCreateRequest");
export const productCreateSuccess = createAction("productCreateSuccess");
export const productCreateFail = createAction("productCreateFail");

export const getAllProductsRequest = createAction("getAllProductsRequest");
export const getAllProductsSuccess = createAction("getAllProductsSuccess");
export const getAllProductsFailed = createAction("getAllProductsFailed");

export const deleteProductRequest = createAction("deleteProductRequest");
export const deleteProductSuccess = createAction("deleteProductSuccess");
export const deleteProductFailed = createAction("deleteProductFailed");

export const productUpdateRequest = createAction("productUpdateRequest");
export const productUpdateSuccess = createAction("productUpdateSuccess");
export const productUpdateFail = createAction("productUpdateFail");

// create product
export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch(productCreateRequest());

    const { data } = await axios.post(
      `${server}/product/create-product`, 
      productData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      }
    );

    dispatch(productCreateSuccess(data.product));
  } catch (error) {
    dispatch(productCreateFail(error.response.data.message));
  }
};

// get all products
export const getAllProducts = () => async (dispatch) => {
  try {
    console.log('Dispatching getAllProductsRequest');
    dispatch(getAllProductsRequest());

    console.log('Sending GET request to server');
    const { data } = await axios.get(`${server}/product/all-products`, {
      withCredentials: true,
    });

    console.log('Received response from server:', data);
    dispatch(getAllProductsSuccess(data.products));
  } catch (error) {
    console.error('Error occurred:', error.response.data.message);
    dispatch(getAllProductsFailed(error.response.data.message));
  }
};

// delete product
export const deleteProduct = (id) => async (dispatch) => {
    try {
      dispatch(deleteProductRequest());
  
      const { data } = await axios.delete(
        `${server}/product/delete-product/${id}`,
        {
          withCredentials: true,
        }
      );
  
      dispatch(deleteProductSuccess(data.message));
    } catch (error) {
      dispatch(deleteProductFailed(error.response.data.message));
    }
  };

  // update product
export const updateProduct =
(
  id,
  name,
  description,
  category,
  price,
  stock,
  images
) =>
async (dispatch) => {
  try {
    dispatch(productUpdateRequest());

    const { data } = await axios.put(
      `${server}/product/update-product/${id}`,
      {
        name,
        description,
        category,
        price,
        stock,
        images,
      }
    );
    dispatch(productUpdateSuccess(data.product));
  } catch (error) {
    dispatch(productUpdateFail(error.response.data.message));
  }
};