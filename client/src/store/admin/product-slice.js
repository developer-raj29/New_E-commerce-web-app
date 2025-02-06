import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "@/components/config";

const initialState = {
  isLoading: false,
  productList: [],
  error: null,
};

export const addNewProduct = createAsyncThunk("/products/addnewProduct", async (formData) => {
    const result = await axios.post(`${BASE_URL}/admin/products/add`,
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

export const fetchAllProducts = createAsyncThunk("/products/fetchAllProducts", async () => {
    const result = await axios.get(`${BASE_URL}/admin/products/allProducts`);

    return result?.data;
  }
);

export const editProduct = createAsyncThunk("/products/editProduct", async ({ id, formData }) => {
    const result = await axios.put(`${BASE_URL}/admin/products/edit/${id}`,
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

export const deleteProduct = createAsyncThunk("/products/deleteProduct", async (_id) => {
    try {
      console.log("Deleting Product with ID:", _id);

      const response = await axios.delete(
        `${BASE_URL}/admin/products/delete/${_id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Delete Product Response:", response.data);
      return response.data; // ✅ Return the API response
    } catch (error) {
      console.error("Error deleting product:", error);
      // return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default AdminProductsSlice.reducer;
