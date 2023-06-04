import { configureStore } from "@reduxjs/toolkit";
import MovieReducer from "./MovieSlice";
import AuthReducer from "./AuthSlice";

const store = configureStore({
  reducer: {
    AllMovies: MovieReducer,
    UserLoggin: AuthReducer,
  },
});

export default store;
