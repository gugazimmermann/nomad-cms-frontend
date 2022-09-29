import { ReactElement, useEffect, useState } from "react";
import { ORDER_STATUS } from "../../interfaces/enums";
import { OrderResponseType } from "../../interfaces/types";
import { KitchenRow } from ".";

type KitchenProps = {
  payload: OrderResponseType | undefined;
};

const Kitchen = ({ payload }: KitchenProps): ReactElement => {
  const [kitchenOrders, setKitchenOrders] = useState<OrderResponseType[]>([]);

  const changeStatus = (order: OrderResponseType) => {
    const cloneOrder: OrderResponseType = JSON.parse(JSON.stringify(order));
    if (cloneOrder.status === ORDER_STATUS.READY)
      cloneOrder.status = ORDER_STATUS.DELIVERED;
    if (cloneOrder.status === ORDER_STATUS.PREPARING)
      cloneOrder.status = ORDER_STATUS.READY;
    if (cloneOrder.status === ORDER_STATUS.WAITING)
      cloneOrder.status = ORDER_STATUS.PREPARING;
    const newOrdersList = kitchenOrders.map((o) => {
      if (o.updatedAt === cloneOrder.updatedAt) return cloneOrder;
      return o;
    });
    setKitchenOrders(
      newOrdersList.filter((o) => o.status !== ORDER_STATUS.DELIVERED)
    );
  };

  useEffect(() => {
    if (
      payload &&
      (payload.status === ORDER_STATUS.WAITING ||
        payload.status === ORDER_STATUS.PREPARING ||
        payload.status === ORDER_STATUS.READY)
    ) {
      const cloneKitchenOrders = kitchenOrders.map(x => x);
      cloneKitchenOrders.push(payload)
      setKitchenOrders(cloneKitchenOrders)
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
