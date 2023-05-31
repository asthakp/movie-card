import { createSlice } from "@reduxjs/toolkit";
import MovieInterface from "./interface/global.interface";

const initialState: MovieInterface = {
  movies: [],
  oriMovies: [],
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

    // setOriMovies: (state: any, action: any) => {

    // },

    searchMovie: (state, action) => {
      const searchedMovie = action.payload.toLowerCase();
      if (searchedMovie === "") {
        state.movies = state.oriMovies;
      } else {
        const newMovie = state.movies.filter((movie) => {
          const movieTitle = movie.title.toLowerCase();
          return movieTitle.includes(searchedMovie);
        });
        state.movies = newMovie;
      }
    },
  },
});

export default MovieSlice.reducer;
export const { setMovies, delItems, searchMovie } = MovieSlice.actions;
