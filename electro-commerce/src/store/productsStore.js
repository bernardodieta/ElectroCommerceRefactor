import create from "zustand";

const useProductStore = create((set) => ({
  products: [],
  addProduct: (product) =>
    set((state) => ({
      products: [...state.products, product],
    })),
  removeProduct: (productId) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== productId),
    })),
  setProducts: (products) => set({ products }),
}));

export default useProductStore;
