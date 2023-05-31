import { configureStore } from "@reduxjs/toolkit";
import MovieReducer from "./MovieSlice";

const store = configureStore({
  reducer: {
    AllMovies: MovieReducer,
  },
});

export default store;
