import { createSlice } from "@reduxjs/toolkit";
import { AuthInterface } from "./interface/global.interface";

const initialState: AuthInterface = {
  isLoggedIn: false,
  jwtToken: "",
};

const AuthSlice: any = createSlice({
  name: "Authentication",
  initialState,
  reducers: {
    isLogged: (state, action) => {
      state.isLoggedIn = true;
      state.jwtToken = action.payload;
    },
  },
});

export default AuthSlice.reducer;
export const { isLogged } = AuthSlice.actions;
