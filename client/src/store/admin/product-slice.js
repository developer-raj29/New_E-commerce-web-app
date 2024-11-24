import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};

export const addNewProduct = createAsyncThunk("/products/addnewProduct", async (formData) => {
    const result = await axios.post(
      "http://localhost:5000/api/admin/products/add",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return result;
  }
);

export const fetchAllProduct = createAsyncThunk("/products/fetchAllProducts", async () => {
    const result = await axios.get("http://localhost:5000/api/admin/products/allProducts");

    return result?.data;
  }
);

export const updateProduct = createAsyncThunk("/products/updateProduct", async (id, formData) => {
    const result = await axios.put(
      `http://localhost:5000/api/admin/products/edit/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
      return result?.data;
  }
);

export const deleteProduct = createAsyncThunk("/products/deleteProduct", async (id) => {
    const result = await axios.delete(
      `http://localhost:5000/api/admin/products/delete/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
);

const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProduct.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.productList = action.payload.data; 
      })
      .addCase(fetchAllProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      })
      // .addCase(addNewProduct.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(addNewProduct.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.productList = action.payload.data;
      // })
      // .addCase(addNewProduct.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.user = null;
      //   state.isAuthenticated = false;
      // })
      // .addCase(updateProduct.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(updateProduct.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.user = null;
      //   state.isAuthenticated = false;
      // })
      // .addCase(updateProduct.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.user = null;
      //   state.isAuthenticated = false;
      // })
      // .addCase(deleteProduct.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(deleteProduct.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.user = null;
      //   state.isAuthenticated = false;
      // })
      // .addCase(deleteProduct.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.user = null;
      //   state.isAuthenticated = false;
      // });
  },
});

export default AdminProductsSlice.reducer; 
