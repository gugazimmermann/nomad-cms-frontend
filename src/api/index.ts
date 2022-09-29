import axios from "axios";
import { MenuItemType, OrderType } from '../interfaces/types';

const RESTAURANT_MENU = process.env.REACT_APP_RESTAURANT_MENU_API_ENDPOINT || "";
const ORDERS_API = process.env.REACT_APP_ORDERS_API_ENDPOINT || "";

const PostOrder = async (restaurantID: string, order: OrderType): Promise<OrderType> => {
  const { data } = await axios.post(`${ORDERS_API}${restaurantID}`, order);
  return data
};

const GetRestaurantMenu = async (restaurantID: string, menuID: string): Promise<MenuItemType[]> => {
  const { data } = await axios.get(`${RESTAURANT_MENU}${restaurantID}/${menuID}`);
  return data;
};

const API = { GetRestaurantMenu, PostOrder };

export default API;
