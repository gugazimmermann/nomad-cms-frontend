import { ReactElement, useEffect, useState } from "react";
import { ORDER_STATUS } from "../../interfaces/enums";
import { OrderResponseType } from "../../interfaces/types";
import { KitchenRow } from ".";
import API from "../../api";

type KitchenProps = {
  payload: OrderResponseType | undefined;
};

const Kitchen = ({ payload }: KitchenProps): ReactElement => {
  const [kitchenOrders, setKitchenOrders] = useState<OrderResponseType[]>([]);

  const changeStatus = async (order: OrderResponseType) => {
    const cloneOrder: OrderResponseType = JSON.parse(JSON.stringify(order));
    if (cloneOrder.status === ORDER_STATUS.READY) {
      await API.ChangeOrderStatus(
        order.restaurantID,
        order.menuID,
        order.orderID,
        ORDER_STATUS.DELIVERED
      );
    }
    if (cloneOrder.status === ORDER_STATUS.PREPARING) {
      await API.ChangeOrderStatus(
        order.restaurantID,
        order.menuID,
        order.orderID,
        ORDER_STATUS.READY
      );
    }
    if (cloneOrder.status === ORDER_STATUS.WAITING) {
      await API.ChangeOrderStatus(
        order.restaurantID,
        order.menuID,
        order.orderID,
        ORDER_STATUS.PREPARING
      );
    }
    const newOrdersList = kitchenOrders.map((o) => {
      if (o.updatedAt === cloneOrder.updatedAt) return cloneOrder;
      return o;
    });
    setKitchenOrders(
      newOrdersList.filter((o) => o.status !== ORDER_STATUS.DELIVERED)
    );
  };

  useEffect(() => {
    if (payload) {
      let cloneKitchenOrders = kitchenOrders.map((x) => x);
      if (
        payload.status === ORDER_STATUS.WAITING ||
        payload.status === ORDER_STATUS.PREPARING ||
        payload.status === ORDER_STATUS.READY
      ) {
        const exists = cloneKitchenOrders.find(
          (i) => i.orderID === payload.orderID
        );
        if (!exists) cloneKitchenOrders.push(payload);
        else
          cloneKitchenOrders.forEach((i) => {
            if (i.orderID === payload.orderID) i.status = payload.status;
          });
      } else {
        cloneKitchenOrders = cloneKitchenOrders.filter(i => i.orderID !== payload.orderID)
      }
      setKitchenOrders(cloneKitchenOrders);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload]);

  return (
    <div>
      <h1 className="text-center bg-secondary text-white p-2">
        Kitchen Screen
      </h1>
      <div className="p-2">
        {kitchenOrders.map((o) => (
          <KitchenRow key={o.updatedAt} order={o} handleStatus={changeStatus} />
        ))}
      </div>
    </div>
  );
};

export default Kitchen;
