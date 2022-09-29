import { ReactElement } from 'react';
import { OrderResponseType } from "../../interfaces/types";

type RestaurantProps = {
  orders: OrderResponseType[];
};

const Restaurant = ({ orders }: RestaurantProps): ReactElement => {
  return (
    <div>
      <h1 className="text-center bg-primary text-white p-2">
        Restaurant Screen
      </h1>
      <div className="py-2">
        {orders.map((o) => (
          <div key={o.updatedAt} className="w-full bg-primary/50 text-white px-4 py-2 border-b-2 border-b-primary uppercase">
            <span className="font-bold">{o.orderNumber}</span> - order ready
          </div>
        ))}
      </div>
    </div>
  );
};

export default Restaurant;
