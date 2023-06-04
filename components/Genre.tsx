import React from "react";

const Genre = ({ genres, handleGenreChange }: any) => {
  return (
    <>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Filter by Genre
      </label>
      <select
        id="countries"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-25 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={(e) => handleGenreChange(e, e.target.value)}
      >
        <option value="">Choose</option>
        {genres.map((genre: any) => {
          return (
            <option value={genre.id} key={genre.id}>
              {genre.name}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default Genre;
