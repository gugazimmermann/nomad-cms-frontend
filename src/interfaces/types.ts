import { ORDER_STATUS } from "./enums";

export type GenericObject = { [key: string]: any };

export interface MenuItemType {
  productID: string;
  name: string;
  image: string;
  value: string;
}

export interface OrderItemType extends MenuItemType {
  qty?: number;
}

export type ModalContentType = {
  color: string;
  text: string;
}

export type OrderType = {
  order: string;
  items: OrderItemType[];
  datetime?: number;
  status?: ORDER_STATUS;
}