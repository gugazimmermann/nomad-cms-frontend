import { ORDER_STATUS } from "./enums";

export type GenericObject = { [key: string]: any };

export type MenuItemsType = {
  qty?: number;
  id: string;
  name: string;
  image: string;
  value: string;
}

export type ModalContentType = {
  color: string;
  text: string;
}

export type OrderType = {
  datetime?: number;
  order: string;
  items: MenuItemsType[];
  status?: ORDER_STATUS;
}