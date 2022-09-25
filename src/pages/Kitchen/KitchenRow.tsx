import { ReactElement, useState } from "react";
import { OrderType } from "../../interfaces/types";
import { ORDER_STATUS } from "../../interfaces/enums";
import { CaretIcon } from ".";

type KitchenRowProps = {
  order: OrderType;
  handleStatus: (order: OrderType) => void;
};

const KitchenRow = ({ order, handleStatus }: KitchenRowProps): ReactElement => {
  const [show, setShow] = useState<boolean>(false);

  const statusLabel = (status: ORDER_STATUS | undefined) => {
    if (!status) return "";
    if (status === ORDER_STATUS.WAITING) return ORDER_STATUS.PREPARING;
    if (status === ORDER_STATUS.PREPARING) return ORDER_STATUS.READY;
    if (status === ORDER_STATUS.READY) return ORDER_STATUS.DELIVERED;
  };

  return (
    <div className="w-full bg-secondary/50 text-white p-2 border-b-2 border-b-secondary">
      <div key={order.datetime} className="flex flex-row">
        <div className="w-4/12">
          <button
            className="flex flex-row"
            type="button"
            onClick={() => setShow(!show)}
          >
            <CaretIcon rotate={!!show} />
            {`Order ${order.order}`}
          </button>
        </div>
        <div className="w-4/12 uppercase">{order.status}</div>
        <div className="w-4/12 text-right">
          <button type="button" onClick={() => handleStatus(order)}>
            Move to{" "}
            <span className="capitalize">{statusLabel(order.status)}</span>
          </button>
        </div>
      </div>
      {show &&
        order.items.map((item) => (
          <div
            key={`${order.datetime}${item.qty}${item.name}`}
            className="bg-secondary/50 text-white p-2"
          >
            {`${item.qty}x ${item.name}`}
          </div>
        ))}
    </div>
  );
};

export default KitchenRow;
