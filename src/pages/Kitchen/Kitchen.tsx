import { ReactElement, useEffect, useState } from "react";
import { ORDER_STATUS } from "../../interfaces/enums";
import { OrderType } from "../../interfaces/types";
import { KitchenRow } from ".";

type KitchenProps = {
  orders: OrderType[];
  handeOrders: (order: OrderType) => void;
};

const Kitchen = ({ orders, handeOrders }: KitchenProps): ReactElement => {
  const [kitchenOrders, setKitchenOrders] = useState<OrderType[]>([]);

  const changeStatus = (order: OrderType) => {
    const cloneOrder: OrderType = JSON.parse(JSON.stringify(order));
    if (cloneOrder.status === ORDER_STATUS.READY) cloneOrder.status = ORDER_STATUS.DELIVERED;
    if (cloneOrder.status === ORDER_STATUS.PREPARING) cloneOrder.status = ORDER_STATUS.READY;
    if (cloneOrder.status === ORDER_STATUS.WAITING) cloneOrder.status = ORDER_STATUS.PREPARING;
    const newOrdersList = kitchenOrders.map(o => {
      if (o.datetime === cloneOrder.datetime) return cloneOrder
      return o
    });
    setKitchenOrders(newOrdersList.filter(o => o.status !== ORDER_STATUS.DELIVERED));
    const readyForDelivery = newOrdersList.find(o => o.status === ORDER_STATUS.DELIVERED);
    if (readyForDelivery) handeOrders(readyForDelivery);
  }

  useEffect(() => {
    setKitchenOrders(orders);
  }, [orders]);

  return (
    <div>
      <h1 className="text-center bg-secondary text-white p-2">
        Kitchen Screen
      </h1>
      <div className="p-2">
        {kitchenOrders.map((o) => <KitchenRow key={o.datetime} order={o} handleStatus={changeStatus} />)}
      </div>
    </div>
  );
};

export default Kitchen;
