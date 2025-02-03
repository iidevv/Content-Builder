import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { authAPI } from "../../../api/api";
import { jwtDecode } from "jwt-decode";

interface UserState {
  email: string;
  password: string;
  name: string | null;
  token: string | null;
  isAuthenticated: boolean;
  error: string | null;
}

const initialState: UserState = {
  email: "",
  password: "",
  name: null,
  token: Cookies.get("token") || null,
  isAuthenticated: !!Cookies.get("token"),
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    logout: (state) => {
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
            state.email = "";
            state.password = "";
            state.isAuthenticated = true;
          } else {
            throw new Error("Token expiration date is missing");
          }
        } catch (error) {
          state.token = null;
          state.isAuthenticated = false;
          Cookies.remove("token");
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isAuthenticated = false;
      });
  },
});

export const loginUser = createAsyncThunk(
  "user/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const result = await authAPI.login(email, password);
      return result.data;
    } catch (error) {
      return rejectWithValue(
        (error as any).response?.data?.message ||
          "An error occurred during login"
      );
    }
  }
);

export const { setEmail, setPassword, logout } = userSlice.actions;

export default userSlice.reducer;
