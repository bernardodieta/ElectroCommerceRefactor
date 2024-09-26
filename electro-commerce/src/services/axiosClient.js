import axios from "axios";

export const getHeader = () => {
  return {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
};

export default class AxiosClient {
  static getRequest = async ({ url, config }) => {
    try {
      const response = await axios.get(url, { ...config, ...getHeader() });
     // console.log("Respuesta GET:", response);
      return response;
    } catch (error) {
      console.error("Error GET:", error);
      throw error;
    }
  };

  static async postRequest({ url, body, config }) {
    try {
      const response = await axios.post(url, body, config);
      return response; // Asegúrate de retornar la respuesta
    } catch (error) {
      console.error("Error en la solicitud POST:", error);
      throw error; // Re-lanza el error para que pueda ser manejado más arriba
    }
  }

  static putRequest = async ({ url, body, config }) => {
    try {
      const response = await axios.put(url, body, {
        ...config,
        ...getHeader(),
      });
      console.log("Respuesta PUT:", response);
      return response;
    } catch (error) {
      console.error("Error PUT:", error);
      throw error;
    }
  };

  static deleteRequest = async ({ url, config }) => {
    try {
      const response = await axios.delete(url, { ...config, ...getHeader() });
      console.log("Respuesta DELETE:", response);
      return response;
    } catch (error) {
      console.error("Error DELETE:", error);
      throw error;
    }
  };
}
