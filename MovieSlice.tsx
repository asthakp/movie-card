import { createSlice } from "@reduxjs/toolkit";
import MovieInterface from "./interface/global.interface";

const initialState: MovieInterface = {
  movies: [],
  oriMovies: [],
  filter: "",
  page: 1,
};

const MovieSlice: any = createSlice({
  name: "Movies",
  initialState,
  reducers: {
    setMovies: (state: any, action: any) => {
      state.movies = action.payload;
      state.oriMovies = action.payload;
    },

    delItems: (state: any, action: any) => {
      const filteredmovies = state.movies.filter((movie: any) => {
        return movie.id !== action.payload;
      });
      state.movies = filteredmovies;
    },

    filterItems: (state: any, action: any) => {
      state.filter = action.payload;
    },

    setPage: (state: any, action: any) => {
      state.page += 1;
    },
  },
});

export default MovieSlice.reducer;
export const { setMovies, delItems, filterItems, setPage } = MovieSlice.actions;
