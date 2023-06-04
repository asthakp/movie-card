import MovieCard from "@/components/MovieCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMovies } from "../MovieSlice";
import { Movie } from "../interface/global.interface";
import FilterByCategory from "@/components/FilterByCategory";
import Genre from "@/components/Genre";
import { getData, searchData, getGenreData } from "@/services/axios.service";

export default function Home() {
  const [query, setQuery] = useState<string>("");
  const { movies, oriMovies } = useSelector((state: any) => state.AllMovies);
  const [genres, setGenres] = useState<object[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const dispatch = useDispatch();

  //******fetch data in the page first load */
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
  //*********fetch data end */

  //********local state way */
  // const searchResult = (query: any) => {
  //   const searchQuery = query.toLowerCase();
  //   const filteredmovies = oriMovies.filter((movie: any) => {
  //     return movie.title.toLowerCase().includes(query);
  //   });
  //   dispatch(filterSearchMovie(filteredmovies));
  // };

  //****************get search result based on change in query */

  const searchResult = async () => {
    if (query && query !== "") {
      const response = await searchData(
        `api_key=c87cdba8f6b74b82910c1ad56e9c93c4&query=${query}`
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
  //************************************************************ */

  //************************************************************* */
  const searchByCategory = async () => {
    if (filter && filter != "") {
      const response = await getData(
        `include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=${filter}`
      );
      dispatch(setMovies(response.data.results));
    }
  };

  useEffect(() => {
    searchByCategory();
  }, [filter, page]);
  // *******************************************************************

  // **********************************************************************
  const getGenre = async () => {
    const response = await getGenreData();
    setGenres(response.data.genres);
  };

  useEffect(() => {
    getGenre();
  }, []);
  // ****************************************************************************

  const handleLoad = (e: any) => {
    e.preventDefault();
    setPage(page + 1);
  };

  const handleFilterChange = (e: any) => {
    e.preventDefault();
    setFilter(e.target.value);
  };

  const handleGenreChange = (e: any, result: any) => {
    e.preventDefault();
    getData(`with_genres=${result}`).then((resp) =>
      dispatch(setMovies(resp.data.results))
    );
  };

  return (
    <>
      <div className="container mx-auto py-8 shadow-lg ">
        <h1 className="font-bold mb-4 text-2xl text-center">Popular Movies</h1>
        <div className="w-full  flex  space-x-12 items-end justify-center">
          <div>
            <FilterByCategory
              filter={filter}
              handleFilterChange={handleFilterChange}
            />
          </div>
          <div>
            <Genre genres={genres} handleGenreChange={handleGenreChange} />
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
