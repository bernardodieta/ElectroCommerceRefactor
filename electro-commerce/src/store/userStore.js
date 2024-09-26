import { create } from "zustand";

// Crea el store directamente y exporta el hook
export const useUsersStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  
  // Carga el usuario y cambia el estado de autenticación
  loadUser: (userLogin) =>
    set({
      user: userLogin,
      isAuthenticated: true,
    }),
  
  // Establece el usuario y cambia el estado de autenticación
  setUser: (userdata) => {
    console.log('setUser', userdata);
    set({
      user: userdata,
      isAuthenticated: true,
    });
  },
  
  // Limpia el usuario y cambia el estado de autenticación
  clearUser: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),
}));
