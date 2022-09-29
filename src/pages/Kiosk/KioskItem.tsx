import { ReactElement } from "react";
import { MenuItemType } from "../../interfaces/types";

type KioskItemProps = {
  item: MenuItemType;
  disabled: boolean;
  handler: (item: MenuItemType) => void;
  back: (item: null) => void;
};

const KioskItem = ({
  item,
  disabled,
  handler,
  back,
}: KioskItemProps): ReactElement => (
  <div className="p-4">
    <div className="bg-white rounded-md shadow-md w-full flex flex-row">
      <div className="w-6/12">
        <img
          src={item.image}
          alt={item.name}
          width={300}
          className="rounded-l-md"
        />
      </div>
      <div className="w-6/12 p-2 flex flex-col justify-between">
        <h1 className="text-center font-bold text-2xl">{item.name}</h1>
        <h2 className="text-center font-bold text-2xl">
          {`$ ${(+item.value).toFixed(2)}`}
        </h2>
        <button
          type="button"
          className="px-2 py-1.5 rounded-md shadow-md bg-primary text-white"
          onClick={() => handler(item)}
          disabled={disabled}
        >
          Add to Cart
        </button>
      </div>
    </div>
    <div className="mt-2 w-full flex flex-row justify-around">
      <button
        type="button"
        className="px-2 py-1.5 rounded-md shadow-md bg-warning text-white"
        onClick={() => back(null)}
        disabled={disabled}
      >
        Back to Menu
      </button>
    </div>
  </div>
);

export default KioskItem;
