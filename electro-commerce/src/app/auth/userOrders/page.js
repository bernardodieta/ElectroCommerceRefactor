"use client";
import { UsersOrders } from "../components/userOrders/UsersOrders";
import { useUsersStore } from "@/store/userStore";
import { useEffect, useState } from "react";
export default function UserOrders() {
  const [orderGet, setOrderGet] = useState([]);
  const userData = useUsersStore((state) => state.user);
  const user = userData;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`/api/orders/${user.id}`);
        const orders = await response.json();
        setOrderGet(orders.payload);
      } catch (error) {
        console.error("Error al obtener las órdenes:", error);
      }
    };
    fetchOrders();
  }, [user]);

  return (
    <div>
      <h1>
        <UsersOrders orders={orderGet} />
      </h1>
    </div>
  );
}
