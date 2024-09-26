import { create } from "zustand";

export const useUsersStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  
  loadUser: (userLogin) =>
    set({
      user: userLogin,
      isAuthenticated: true,
    }),
  

  setUser: (userdata) => {
    console.log('setUser', userdata);
    set({
      user: userdata,
      isAuthenticated: true,
    });
  },
  
  clearUser: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),
}));
