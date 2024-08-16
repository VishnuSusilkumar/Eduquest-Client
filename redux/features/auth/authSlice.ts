import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  user: "",
  name: "",
  email: "",
  password: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    UserData: (state, action) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.password = action.payload.password;
    },
    userRegistration: (state, action) => {
      state.token = action.payload.token;
    },
    userLoggedIn: (state, action) => {
      state.token = action.payload.accessToken;
      state.user = action.payload.user;
    },
    userLoggedOut: (state) => {
      state.token = "";
      state.user = "";
    },
  },
});

export const { userRegistration, userLoggedIn, userLoggedOut, UserData } =
  authSlice.actions;

export default authSlice.reducer;
