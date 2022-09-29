import { ORDER_STATUS } from "./enums";

export type GenericObject = { [key: string]: any };

export type MenuItemType = {
  productID: string;
  name: string;
  image: string;
  value: string;
};

export type OrderItemType = {
  quantity: number;
  productID: string;
  name: string;
  value: string;
};

export type OrderType = {
  orderNumber?: number;
  restaurantID: string;
  menuID: string;
  orderItems: OrderItemType[];
  total: string;
};

export type ModalContentType = {
  color: string;
  text: string;
};

export type OrderResponseType = {
  restaurantID: string;
  menuID: string;
  orderID: string;
  orderItems: OrderItemType[];
  orderNumber: number;
  status: ORDER_STATUS;
  total: string;
  createdAt: string;
  updatedAt: string;
};
