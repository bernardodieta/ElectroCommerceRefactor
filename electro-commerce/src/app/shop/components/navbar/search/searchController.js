"use client";
import { useState } from "react";
import axios from "axios";
import useSearchStore from "@/store/searchStore";

export const useSearchController = () => {
  const { query, setQuery, filteredResults, setFilteredResults, clearSearch } =
    useSearchStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = async (e) => {
    const searchTerm = e.target.value;
    setQuery(searchTerm);

    if (searchTerm.length > 0) {
      setIsLoading(true);

      try {
        const response = await axios.get(`/api/products`, {
          params: { title: searchTerm },
        });

        setFilteredResults(response.data.payload.data || []);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setFilteredResults([]);
      } finally {
        setIsLoading(false);
      }
    } else {
      setFilteredResults([]);
    }
  };

  return {
    query,
    filteredResults,
    isLoading,
    handleInputChange,
    clearSearch,
  };
};
