import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import { BASE_URL } from "@/config";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
  error: null, // ✅ Add error field
};

export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData) => {
    const response = await axios.post(
      `${BASE_URL}/api/auth/register`,
      formData,
      {
        withCredentials: true,
      }
    );

    return response.data;
  }
);

export const loginUser = createAsyncThunk("/auth/login", async (formData) => {
  const response = await axios.post(`${BASE_URL}/api/auth/login`, formData, {
    withCredentials: true,
  });

  console.log("response.data Login : ", response.data);

  localStorage.setItem("token", JSON.stringify(response.data.token));
  localStorage.setItem("user", JSON.stringify(response.data.user));
  return response.data;
});

export const logoutUser = createAsyncThunk("/auth/logout", async () => {
  const response = await axios.post(
    `${BASE_URL}/api/auth/logout`,
    {},
    {
      withCredentials: true,
    }
  );

  localStorage.removeItem("token");
  localStorage.removeItem("user");
  return response.data;
});

export const checkAuth = createAsyncThunk(
  "/auth/checkauth",
  async (_, thunkAPI) => {
    const token = localStorage.getItem("token");

    if (!token) {
      return thunkAPI.rejectWithValue("No auth token found");
    }

    try {
      const response = await axios.get(`${BASE_URL}/api/auth/check-auth`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      });

      console.log("response.data checkAuth: ", response.data);

      return response.data;
    } catch (error) {
      console.error("Auth check failed:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null; // ✅ Reset error on new request
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.error.message; // ✅ Save error
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null; // ✅ Reset error on new request
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("action: ", action);

        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null; // ✅ Reset error on new request
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = action.payload.success;
        state.user = action.payload.success ? action.payload.user : null;
        state.error = null;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload || "Authentication check failed"; // ✅ Handle error message
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
