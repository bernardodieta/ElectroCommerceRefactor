"use client";
import { OrderListAdmin } from "../components/orders/OrdersListAdmin";
import { useUsersStore } from "@/store/userStore";
import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orderGet, setOrderGet] = useState([]);
  const userData = useUsersStore((state) => state.user);
  const user = userData;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`/api/orders/orders`);
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
        <OrderListAdmin orders={orderGet} />
      </h1>
    </div>
  );
}
