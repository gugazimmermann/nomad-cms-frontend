import { ReactElement, useEffect, useState } from 'react';
import { ORDER_STATUS } from '../../interfaces/enums';
import { OrderResponseType } from "../../interfaces/types";

type RestaurantProps = {
  payload: OrderResponseType | undefined;
};

const Restaurant = ({ payload }: RestaurantProps): ReactElement => {
  const [restaurantOrders, setRestaurantOrders] = useState<OrderResponseType[]>([]);

  useEffect(() => {
    if (payload) {
      let cloneRestaurantOrders = restaurantOrders.map((x) => x);
      if (payload.status === ORDER_STATUS.DELIVERED) {
        cloneRestaurantOrders.push(payload)
        setRestaurantOrders(cloneRestaurantOrders);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload]);

  return (
    <div>
      <h1 className="text-center bg-primary text-white p-2">
        Restaurant Screen
      </h1>
      <div className="py-2">
        {restaurantOrders.map((o) => (
          <div key={o.updatedAt} className="w-full bg-primary/50 text-white px-4 py-2 border-b-2 border-b-primary uppercase">
            <span className="font-bold">{o.orderNumber}</span> - order ready
          </div>
        ))}
      </div>
    </div>
  );
};

export default Restaurant;
