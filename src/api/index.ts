import axios from "axios";
import { MenuItemsType } from "../interfaces/types";

const ENDPOINT = process.env.REACT_APP_API_ENDPOINT || "";

const api = axios.create({ baseURL: ENDPOINT });

const GetRestaurantMenu = async (restaurantID: string, menuID: string): Promise<MenuItemsType[]> => {
  const { data } = await api.get(`${restaurantID}/${menuID}`);
  return data;
};

const API = { GetRestaurantMenu };

export default API;
