import MovieCard from "@/components/MovieCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMovies } from "../MovieSlice";
import { Movie } from "../interface/global.interface";
import FilterByCategory from "@/components/FilterByCategory";
import { setPage } from "../MovieSlice";

export default function Home() {
  const [query, setQuery] = useState<string>("");
  const { movies, oriMovies } = useSelector((state: any) => state.AllMovies);
  const { filter, page } = useSelector((state: any) => state.AllMovies);

  const dispatch = useDispatch();

  const fetchMovies = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/popular?api_key=c87cdba8f6b74b82910c1ad56e9c93c4"
      );
      dispatch(setMovies(response.data.results));
    } catch (error) {}
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  //********local state way */
  // const searchResult = (query: any) => {
  //   const searchQuery = query.toLowerCase();
  //   const filteredmovies = oriMovies.filter((movie: any) => {
  //     return movie.title.toLowerCase().includes(query);
  //   });
  //   dispatch(filterSearchMovie(filteredmovies));
  // };

  const searchResult = async () => {
    if (query && query !== "") {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${query}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjODdjZGJhOGY2Yjc0YjgyOTEwYzFhZDU2ZTljOTNjNCIsInN1YiI6IjY0NzU5NTljOTI0Y2U2MDBmOTc2MmU0YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GFY8SaJ0_ZZFVmSrA5qsEcjSC9vJ_3QUJxHab-B-jqQ ",
          },
        }
      );
      dispatch(setMovies(response.data.results));
    } else {
      fetchMovies();
    }
  };

  useEffect(() => {
    const debounceFN = setTimeout(() => {
      searchResult();
    }, 500);
    return () => clearTimeout(debounceFN);
  }, [query]);

  const searchByGenre = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=${filter}`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjODdjZGJhOGY2Yjc0YjgyOTEwYzFhZDU2ZTljOTNjNCIsInN1YiI6IjY0NzU5NTljOTI0Y2U2MDBmOTc2MmU0YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GFY8SaJ0_ZZFVmSrA5qsEcjSC9vJ_3QUJxHab-B-jqQ",
        },
      }
    );
    dispatch(setMovies(response.data.results));
  };

  useEffect(() => {
    searchByGenre();
  }, [filter, page]);

  const handleLoad = (e: any) => {
    e.preventDefault();
    dispatch(setPage());
  };

  return (
    <>
      <div className="container mx-auto py-8 shadow-lg ">
        <h1 className="font-bold mb-4 text-2xl text-center">Popular Movies</h1>
        <div className="w-full  flex  space-x-12 items-end">
          <div>
            <FilterByCategory />
          </div>

          <input
            type="text"
            className="form-control bg-slate-200 px-3 rounded h-[55px] "
            placeholder="search for movies here"
            onChange={(e: any) => setQuery(e.target.value)}
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
                poster={
                  movie.poster_path
                    ? "https://image.tmdb.org/t/p/w500" + movie.poster_path
                    : ""
                }
              />
            );
          })}
        </div>
        <div className="text-center">
          <button
            className="text-slate-100 font-bold bg-lime-600 text-lg px-4 py-2 my-6 "
            onClick={(e) => handleLoad(e)}
          >
            Load More
          </button>
        </div>
      </div>
    </>
  );
}
