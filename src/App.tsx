import { useState, useCallback, useEffect, ReactElement } from "react";
import FakeServer from "./api/fake-server";
import { ORDER_STATUS } from "./interfaces/enums";
import { MenuItemsType, OrderType, GenericObject } from "./interfaces/types";
import Kiosk from "./pages/Kiosk/Kiosk";
import Kitchen from "./pages/Kitchen/Kitchen";
import Restaurant from "./pages/Restaurant/Restaurant";
import { generateOrderNumber } from './api/fake-server';
import API from "./api";

const restaurantID = process.env.REACT_APP_RESTAURANT || "";
const menuID = process.env.REACT_APP_MENU || "";

const App = (): ReactElement => {
  const [menu, setMenu] = useState<MenuItemsType[]>([]);
  const [kitchenOrders, setKitchenOrders] = useState<OrderType[]>([]);
  const [restaurantOrders, setRestaurantOrders] = useState<OrderType[]>([]);

  const handleRestaurantOrders = (order: OrderType): void => {
    const orders = restaurantOrders.map((x) => x);
    orders.push(order);
    setRestaurantOrders(orders);
  };

  const organizeKitchenOrders = (orderItems: MenuItemsType[]): MenuItemsType[] => {
    const organizeItens: GenericObject = {};
    orderItems.forEach((item) => {
      if (!organizeItens[item.id]) organizeItens[item.id] = { ...item, qty: 0 };
      organizeItens[item.id].qty += 1;
    });
    return Object.values(organizeItens);
  };

  const handleKitchenOrders = (order: OrderType): void => {
    const orders = kitchenOrders.map((x) => x);
    orders.push({
      ...order,
      items: organizeKitchenOrders(order.items.map((x) => x)),
      datetime: Date.now(),
      status: ORDER_STATUS.WAITING,
    });
    setKitchenOrders(orders);
  };

  const sendPayment = async (orderItems: MenuItemsType[]): Promise<string> => {
    const orderValue = orderItems.reduce((p, c) => p + +c.value, 0);
    let orderNumber = await FakeServer.SendPayment(restaurantID, +orderValue.toFixed(2));
    // workarround for mock server do not repeat the order number
    do {
      orderNumber = generateOrderNumber();
    // eslint-disable-next-line no-loop-func
    } while(kitchenOrders.find(o => o.order === orderNumber))
    return orderNumber;
  };

  const getRestaurantMenu = useCallback(
    async (restaurantID: string, menuID: string): Promise<void> => {
      try {
        const menuItems = await API.GetRestaurantMenu(restaurantID, menuID);
        setMenu(menuItems);
      } catch (error: any) {
        alert(error.message)
        setMenu([]);
      }
    },
    []
  );

  useEffect(() => {
    if (restaurantID && menuID) getRestaurantMenu(restaurantID, menuID);
    else alert('Missing restaurantID OR menuID')
  }, [getRestaurantMenu]);

  return (
    <div className="w-full h-screen flex flex-row">
      <div className="w-6/12 h-full bg-warning/10">
        <Kiosk
          menu={menu}
          handlePayment={sendPayment}
          handeOrders={handleKitchenOrders}
        />
      </div>
      <div className="w-6/12">
        <div className="h-2/4 bg-secondary/10">
          <Kitchen orders={kitchenOrders} handeOrders={handleRestaurantOrders} />
        </div>
        <div className="h-2/4 bg-primary/10">
          <Restaurant orders={restaurantOrders} />
        </div>
      </div>
    </div>
  );
};

export default App;
