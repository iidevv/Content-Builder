import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { authAPI } from "../../../api/api";
import { jwtDecode } from "jwt-decode";

interface UserState {
  name: string | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  name: null,
  token: Cookies.get("token") || null,
  isAuthenticated: !!Cookies.get("token"),
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      Cookies.remove("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        const token = action.payload.token;

        try {
          const decodedToken = jwtDecode(token);
          if (decodedToken.exp) {
            const expirationDate = new Date(decodedToken.exp * 1000);
            Cookies.set("token", token, {
              expires: expirationDate,
              secure: true,
              sameSite: "Strict",
            });

            state.token = token;
            state.isAuthenticated = true;
          } else {
            throw new Error("Token expiration date is missing");
          }
        } catch (error) {
          state.token = null;
          state.isAuthenticated = false;
          Cookies.remove("token");
        } finally {
          state.loading = false;
        }
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.loading = false;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        const token = action.payload.token;

        try {
          const decodedToken = jwtDecode(token);
          if (decodedToken.exp) {
            const expirationDate = new Date(decodedToken.exp * 1000);
            Cookies.set("token", token, {
              expires: expirationDate,
              secure: true,
              sameSite: "Strict",
            });

            state.token = token;
            state.isAuthenticated = true;
          } else {
            throw new Error("Token expiration date is missing");
          }
        } catch (error) {
          state.token = null;
          state.isAuthenticated = false;
          Cookies.remove("token");
        } finally {
          state.loading = false;
        }
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.loading = false;
      });
  },
});

export const loginUser = createAsyncThunk(
  "user/login",
  async (
    data: {},
    { rejectWithValue }
  ) => {
    try {
      const result = await authAPI.login(data);

      return result.data;
    } catch (error) {
      return rejectWithValue(
        (error as any).response?.data?.message ||
        "An error occurred during login. Please try again."
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/register",
  async (
    data: {},
    { rejectWithValue }
  ) => {
    try {
      const result = await authAPI.register(data);

      return result.data;
    } catch (error) {
      return rejectWithValue(
        (error as any).response?.data?.message ||
        "An error occurred during registration. Please try again."
      );
    }
  }
);

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
