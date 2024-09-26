import { create } from "zustand";
import axios from "axios";

const useNotificationStore = create((set) => ({
  notifications: [],
  fetchNotifications: async (userId) => {
    try {
      console.log("Fetching notifications for user:", userId);
      const response = await axios.get(`/api/notifications/${userId}`);
      console.log("Response from API:", response);

    
      const notifications = Array.isArray(response.data?.payload)
        ? response.data.payload
        : [];

      console.log("Formatted notifications:", notifications);


      set({ notifications });
      console.log("Store state updated with notifications:", notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      set({ notifications: [] }); 
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
