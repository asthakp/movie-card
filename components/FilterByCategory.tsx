import React from "react";
import { filterItems } from "@/MovieSlice";
import { useDispatch } from "react-redux";

const FilterByCategory = () => {
  const dispatch = useDispatch();

  return (
    <>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Filter by category
      </label>
      <select
        id="countries"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-25 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={(e: any) => dispatch(filterItems(e.target.value))}
      >
        <option>Choose</option>
        <option value="popularity.asc">popularity.asc</option>
        <option value="popularity.desc">popularity.desc</option>
        <option value="revenue.asc">revenue.asc</option>
        <option value="revenue.desc">revenue.desc</option>
        <option value="vote_count.asc">vote_count.asc</option>
        <option value="vote_count.desc">vote_count.desc</option>
      </select>
    </>
  );
};

export default FilterByCategory;
