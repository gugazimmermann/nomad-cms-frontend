import axios from "axios";
import { MenuResponse } from "../interfaces/types";

const RESTAURANT_MENU = process.env.REACT_APP_RESTAURANT_MENU_API_ENDPOINT || "";

const GetRestaurantMenu = async (restaurantID: string, menuID: string): Promise<MenuResponse[]> => {
  const { data } = await axios.get(`${RESTAURANT_MENU}${restaurantID}/${menuID}`);
  return data;
};

const API = { GetRestaurantMenu };

export default API;
