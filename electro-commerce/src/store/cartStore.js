// export default useCartStore;

import { create } from "zustand";
import AxiosClient from "@/services/axiosClient";


export const useCartStore = create((set) => ({
  cart: [],

  addToCart: async (product, quantity) => {
    set((state) => {
      const cart = Array.isArray(state.cart) ? state.cart : [];
      const itemIndex = cart.findIndex(
        (item) => item.product._id === product._id
      );

      let newCart;
      if (itemIndex > -1) {
        newCart = [...cart];
        newCart[itemIndex].quantity += quantity;
        if (newCart[itemIndex].quantity <= 0) {
          newCart.splice(itemIndex, 1);
        }
      } else {
        newCart = [...cart, { product, quantity }];
      }
      return { cart: newCart };
    });

    const body = { productId: product._id, quantity };
    
    await AxiosClient.postRequest({
      url: "/api/cart/add",
      body,
    })
      .then((response) => {
        console.log("Datos recibidos:", response.data);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  },

  removeFromCart: async (productId) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.product._id !== productId),
    }));
    await AxiosClient.putRequest({
      url: `/api/cart/remove/${productId}`,
    })
      .then((response) => {
        console.log("Datos recibidos:", response.data);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  },

  setCart: (cart) => set({ cart: Array.isArray(cart) ? cart : [] }), // Asegúrate de que cart siempre es un array
}));
