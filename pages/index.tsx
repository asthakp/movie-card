import MovieCard from "@/components/MovieCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMovies, searchMovie } from "../MovieSlice";
import { Movie } from "../interface/global.interface";

export default function Home() {
  const movies = useSelector((state: any) => state.AllMovies.movies);

  const dispatch = useDispatch();

  const fetchMovies = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/popular?api_key=5345d591dce999dd3dde52a8fd7e0f56"
      );
      dispatch(setMovies(response.data.results));
    } catch (error) {}
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <>
      <div className="container mx-auto py-8 shadow-lg ">
        <h1 className="font-bold mb-4 text-2xl text-center">Popular Movies</h1>
        <div className="w-44 mx-auto ">
          {" "}
          <input
            type="text"
            className="form-control bg-slate-200 px-5 rounded py-2 "
            placeholder="search for movies here"
            onChange={(e) => dispatch(searchMovie(e.target.value))}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 space-x-2">
          {movies.map((movie: Movie) => {
            return (
              <MovieCard
                key={movie.id}
                id={movie.id}
                releaseYear={movie.release_date}
                title={movie.title}
                rating={movie.vote_average}
                poster={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
