import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  username: string | null;
  role: "admin" | "editor" | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  username: localStorage.getItem("username"),
  role: (localStorage.getItem("role") as "admin" | "editor") || null,
};

interface LoginPayload {
  username: string;
  token: string;
  role: "admin" | "editor";
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginPayload>) {
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.role = action.payload.role;

      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("username", action.payload.username);
      localStorage.setItem("role", action.payload.role);
    },
    logout(state) {
      state.token = null;
      state.username = null;
      state.role = null;
      localStorage.clear();
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
