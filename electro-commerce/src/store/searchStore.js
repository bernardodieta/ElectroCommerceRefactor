import { create } from "zustand";

const useSearchStore = create((set) => ({
  query: "",
  setQuery: (query) => set({ query }),
  filteredResults: [], // Cambiado a filteredResults
  setFilteredResults: (results) => set({ filteredResults: results }), // Cambiado a setFilteredResults
  clearSearch: () => set({ query: "", filteredResults: [] }), // Cambiado clearResult por clearSearch
}));

export default useSearchStore;
