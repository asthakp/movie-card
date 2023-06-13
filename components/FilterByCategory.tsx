import React from "react";

const FilterByCategory = ({ filter, handleFilterChange }: any) => {
  return (
    <>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Filter by category
      </label>
      <select
        id="countries"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-25 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={handleFilterChange}
      >
        <option value="">Choose</option>
        <option value="primary_release_date.desc">
          primary_release_date.desc
        </option>
        <option value="popularity.asc">popularity.asc</option>
        <option value="vote_average.desc">vote_average.desc</option>
        <option value="revenue.asc">revenue.asc</option>
        <option value="vote_count.desc">vote_count.desc</option>
      </select>
    </>
  );
};

export default FilterByCategory;
