import { ReactElement } from 'react';
import { OrderType } from "../../interfaces/types";

type RestaurantProps = {
  orders: OrderType[];
};

const Restaurant = ({ orders }: RestaurantProps): ReactElement => {
  return (
    <div>
      <h1 className="text-center bg-primary text-white p-2">
        Restaurant Screen
      </h1>
      <div className="py-2">
        {orders.map((o) => (
          <div key={o.datetime} className="w-full bg-primary/50 text-white px-4 py-2 border-b-2 border-b-primary uppercase">
            <span className="font-bold">{o.order}</span> - order ready
          </div>
        ))}
      </div>
    </div>
  );
};

export default Restaurant;
