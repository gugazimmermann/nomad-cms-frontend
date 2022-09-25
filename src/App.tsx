import { useState, useCallback, useEffect, ReactElement } from "react";
import FakeServer from "./api/fake-server";
import { ORDER_STATUS } from "./interfaces/enums";
import { MenuItemsType, OrderType, GenericObject } from "./interfaces/types";
import Kiosk from "./pages/Kiosk/Kiosk";
import Kitchen from "./pages/Kitchen/Kitchen";
import Restaurant from "./pages/Restaurant/Restaurant";

const restaurantID = process.env.REACT_APP_RESTAURANT || "";

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
    const orderValue = orderItems.reduce((p, c) => p + c.value, 0);
    return await FakeServer.SendPayment(restaurantID, +orderValue.toFixed(2));
  };

  const getRestaurantMenu = useCallback(
    async (restaurantID: string): Promise<void> => {
      const menuItems = await FakeServer.GetRestaurantMenu(restaurantID);
      setMenu(menuItems);
    },
    []
  );

  useEffect(() => {
    getRestaurantMenu(restaurantID);
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
