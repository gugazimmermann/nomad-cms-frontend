import { ReactElement } from "react";
import { MenuItemsType } from "../../interfaces/types";

type KioskCardProps = {
  item: MenuItemsType;
  setShowItem: (item: MenuItemsType) => void;
};

const KioskCard = ({ item, setShowItem }: KioskCardProps): ReactElement => (
  <button
    type="button"
    onClick={() => setShowItem(item)}
    className="flex flex-col justify-center items-center m-2 py-2 shadow-md rounded-md bg-white"
  >
    <img src={item.image} alt={item.name} width={200} className="rounded-md" />
    <span className="font-bold">{item.name}</span>
    <span>{`$ ${(+item.value).toFixed(2)}`}</span>
  </button>
);

export default KioskCard;
