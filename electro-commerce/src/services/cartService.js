import AxiosClient from "./axiosClient";
export const fetchCart = async () => {
  try {
    const url = "http://localhost:8080/api/cart/";
    const result = await AxiosClient.getRequest({ url });
    console.log('result', result);
    
    return result.data;
  } catch (error) {
    throw new Error("Error al obtener el carrito: " + error.message);
  }
};
