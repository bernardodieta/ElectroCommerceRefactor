import { create } from "zustand";
import axios from "axios";

const useNotificationStore = create((set) => ({
  notifications: [],
  fetchNotifications: async (userId) => {
    try {
      console.log("Fetching notifications for user:", userId);
      const response = await axios.get(`/api/notifications/${userId}`);
      console.log("Response from API:", response);

      // Asegúrate de que la respuesta tenga el formato esperado
      const notifications = Array.isArray(response.data?.payload)
        ? response.data.payload
        : []; // En caso de que no haya notificaciones, asigna un array vacío

      console.log("Formatted notifications:", notifications);

      // Actualiza el estado con las notificaciones
      set({ notifications });
      console.log("Store state updated with notifications:", notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      set({ notifications: [] }); // Vacía las notificaciones en caso de error
    }
  },
  addNotification: (notification) => {
    set((state) => ({
      notifications: [...state.notifications, notification],
    }));
  },
  markAsRead: (id) => {
    set((state) => ({
      notifications: state.notifications.map((notif) =>
        notif._id === id ? { ...notif, read: true } : notif
      ),
    }));
  },
}));

export default useNotificationStore;
