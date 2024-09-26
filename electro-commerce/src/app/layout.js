"use client";
import { useEffect } from "react";
import { useUsersStore } from "@/store/userStore";
import { useCartStore } from "@/store/cartStore";
import axios from "axios";
import { NavBar } from "./shop/components/navbar/NavBar";
import { roboto } from "@/config/fonts/fonts";
import AxiosClient from "@/services/axiosClient";

const checkAuth = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/users/auth/verify",
      {
        withCredentials: true,
      }
    );
    return response.data; // Debes devolver el estado de autenticación
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default function RootLayout({ children }) {
  useEffect(() => {
    const initializeAuth = async () => {
      const authData = await checkAuth();
      if (authData && authData.isAuthenticated) {
        const initialUser = await axios.get(
          "http://localhost:8080/api/users/",
          { withCredentials: true }
        );
        const initialCart = await axios.get("http://localhost:8080/api/cart/", {
          withCredentials: true,
        });
        useUsersStore.getState().setUser(initialUser.data.payload);
        useCartStore.getState().setCart(initialCart.data.payload.items);
      } else {
        console.log("No token o no autenticado");
      }
    };

    initializeAuth();
  }, []);

  return (
    <html>
      <body>
        <NavBar />
        <main className={roboto.className}>{children}</main>
      </body>
    </html>
  );
}
