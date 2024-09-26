import { getHeader } from "./axiosClient";
import AxiosClient from "./axiosClient";

export default class PaymentServices {
  constructor() {}

  createPaymentIntent = async ({ orderId, callbackSuccess, callbackError }) => {
    console.log("Creating payment intent...");

    const requestInfo = {
      url: `/api/payment-intents?id=${orderId}`,
      body: {},
      config: { ...getHeader(), withCredentials: true },
    };

    try {
      const response = await AxiosClient.postRequest(requestInfo);
      if (
        response &&
        response.data &&
        response.data.payload &&
        response.data.payload.payload
      ) {
        const clientSecret = response.data.payload.payload.client_secret;
        console.log("Extracted client_secret:", clientSecret);
        if (callbackSuccess) callbackSuccess(clientSecret);
      } else {
        console.error("Client secret not found in response");
        if (callbackError) callbackError("Client secret not found in response");
      }
    } catch (error) {
      console.error("Error in createPaymentIntent:", error);
      if (callbackError) callbackError(error);
    }
  };

  pay = async ({ body, callbackSuccess, callbackError }) => {
    const requestInfo = {
      url: `/api/checkout`,
      body,
      config: { ...getHeader(), withCredentials: true },
      callbackSuccess,
      callbackError,
    };
    await AxiosClient.postRequest(requestInfo);
  };
}
