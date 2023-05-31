import React from "react";
import { useDispatch } from "react-redux";
import { delItems } from "@/MovieSlice";
import { MovieCardInterface } from "../interface/global.interface";

const MovieCard = ({
  id,
  title,
  releaseYear,
  rating,
  poster,
}: MovieCardInterface) => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="max-w-xs rounded px-6 py-4 overflow-hidden shadow-lg">
        <img className="w-full" src={poster} alt={title} />
        <div className="mt-4">
          <p className="font-bold text-lg text-gray-800  mb-2">{title}</p>
          <p className="  text-gray-600  mb-2">
            Release Year:{releaseYear.split("-")[0]}
          </p>
          <p className="  text-gray-600  mb-2">Rating:{rating}</p>
        </div>
        <button
          className="text-white bg-red-600 p-2 rounded"
          onClick={() => dispatch(delItems(id))}
        >
          Del
        </button>
      </div>
    </>
  );
};

export default MovieCard;
