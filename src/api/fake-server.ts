import { PAYMENT_RESPONSE } from "../interfaces/enums";
import { MenuItemsType } from "../interfaces/types";
import menuItems from "./items.json";

const defaultRestaurantID = process.env.REACT_APP_RESTAURANT || "";
const simulatePaymentStatus = [
  PAYMENT_RESPONSE.ACCEPT,
  PAYMENT_RESPONSE.ACCEPT,
  PAYMENT_RESPONSE.ACCEPT,
  PAYMENT_RESPONSE.DECLINED,
];

const GetRestaurantMenu = (restaurantID: string): Promise<MenuItemsType[]> => {
  return new Promise((res, rej) => {
    if (restaurantID === defaultRestaurantID) res(menuItems);
    else rej(new Error("Restaurant Not Found"));
  });
};

const getPaymentStatus = (restaurantID: string, value: number): PAYMENT_RESPONSE => {
  return simulatePaymentStatus.sort(() => Math.random() - 0.5)[0];
}

// exported just as a workarround for the mock server
export const generateOrderNumber = (): string => Math.floor(Math.random() * (100 - 1 + 1) + 1).toString()

const SendPayment = (restaurantID: string, value: number): Promise<string> => {
  const paymentStatus = getPaymentStatus(restaurantID, value);
  return new Promise((res, rej) => {
    if (paymentStatus === PAYMENT_RESPONSE.ACCEPT) {
      res(generateOrderNumber());
    } else {
      rej(new Error("Payment Error"));
    }
  });
};

const FakeServer = { GetRestaurantMenu, SendPayment };

export default FakeServer;
