import { create } from "zustand";

const useSearchStore = create((set) => ({
  query: "",
  setQuery: (query) => set({ query }),
  filteredResults: [],
  setFilteredResults: (results) => set({ filteredResults: results }), 
  clearSearch: () => set({ query: "", filteredResults: [] }), 
}));

export default useSearchStore;
