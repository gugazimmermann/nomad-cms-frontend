import { ReactElement } from "react";
import { MenuItemsType } from "../../interfaces/types";

type KioskNavBarProps = {
  cartItems: MenuItemsType[];
  sendOrder: () => void;
};

const KioskNavBar = ({
  cartItems,
  sendOrder,
}: KioskNavBarProps): ReactElement => (
  <div className="flex flex-row justify-between items-center p-2">
    <button
      type="button"
      disabled={!cartItems.length}
      onClick={() => sendOrder()}
      className={`px-2 py-1.5 rounded-md shadow-md text-white ${
        !cartItems.length ? "bg-gray-500" : "bg-primary "
      }`}
    >
      Finish Order
    </button>
    <span className={`${!!cartItems.length && "font-bold"}`}>
      {cartItems.length} Products
    </span>
  </div>
);

export default KioskNavBar;
