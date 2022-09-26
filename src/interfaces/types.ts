import { ORDER_STATUS } from "./enums";

export type GenericObject = { [key: string]: any };

export interface MenuResponse {
  productID: string;
  name: string;
  image: string;
  value: string;
}

export interface OrderItem extends MenuResponse {
  qty?: number;
}

export type ModalContentType = {
  color: string;
  text: string;
}

export type OrderType = {
  order: string;
  items: OrderItem[];
  datetime?: number;
  status?: ORDER_STATUS;
}