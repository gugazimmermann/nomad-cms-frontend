import { ReactElement, useCallback, useEffect, useRef, useState } from "react";
import API from "../../api";
import {
  GenericObject,
  MenuItemType,
  ModalContentType,
  OrderItemType,
} from "../../interfaces/types";
import {
  KioskCard,
  KioskItem,
  KioskLoading,
  KioskCartModal,
  KioskNavBar,
} from ".";
import KioskOrderModal from "./KioskOrderModal";
import { OrderResponseType } from "../../interfaces/types";
import { ORDER_STATUS } from "../../interfaces/enums";

const restaurantID = process.env.REACT_APP_RESTAURANT || "";
const menuID = process.env.REACT_APP_MENU || "";

type KioskProps = {
  payload: OrderResponseType | undefined;
};

const Kiosk = ({ payload }: KioskProps): ReactElement => {
  const [loadingMenu, setLoadingMenu] = useState<boolean>(false);
  const [menu, setMenu] = useState<MenuItemType[]>([]);
  const [showItem, setShowItem] = useState<MenuItemType | null>(null);
  const [cartItems, setCartItems] = useState<MenuItemType[]>([]);
  const [cartModalContent, setCartModalContent] = useState<ModalContentType>();
  const [orderModalContent, setOrderModalContent] =
    useState<ModalContentType>();
  const refModalTimer = useRef<number | null>(null);

  const handleOrganizeItems = (items: MenuItemType[]): OrderItemType[] => {
    const organizeItens: GenericObject = {};
    items.forEach((item) => {
      if (!organizeItens[item.productID])
        organizeItens[item.productID] = { ...item, quantity: 0 };
      organizeItens[item.productID].quantity += 1;
    });
    return Object.values(organizeItens).map(({ image, ...i }) => i);
  };

  const handleOrder = async () => {
    const total = cartItems.reduce((p, c) => p + +c.value, 0).toFixed(2);
    const orderItems = handleOrganizeItems(cartItems);
    const order = { restaurantID, menuID, orderItems, total };
    try {
      setOrderModalContent({
        color: "bg-warning text-white",
        text: "Sending Order",
      });
      const data = await API.PostOrder(restaurantID, order);
      setOrderModalContent({
        color: "bg-warning text-white",
        text: `Order ${data.orderNumber}, waiting... `,
      });
      setCartItems([] as MenuItemType[]);
    } catch (error: any) {
      setCartModalContent({
        color: "bg-danger text-white",
        text: `Error! Please, Try Again!`,
      });
    }
  };

  const handleSendToCart = (item: MenuItemType) => {
    setCartModalContent({
      color: "bg-primary text-white",
      text: `${showItem?.name} Added to the Cart`,
    });
    const cart = cartItems.map((i) => i);
    cart.push(item);
    setCartItems(cart);
    setShowItem(null);
  };

  useEffect(() => {
    refModalTimer.current = window.setTimeout(() => {
      setCartModalContent(undefined);
    }, 1500);
    return () => {
      if (refModalTimer.current !== null)
        window.clearTimeout(refModalTimer.current);
    };
  }, [cartModalContent]);

  const getRestaurantMenu = useCallback(
    async (restaurantID: string, menuID: string): Promise<void> => {
      setLoadingMenu(true);
      try {
        const menuItems = await API.GetRestaurantMenu(restaurantID, menuID);
        setMenu(menuItems);
      } catch (error: any) {
        alert(error.message);
        setMenu([]);
      }
      setLoadingMenu(false);
    },
    []
  );

  useEffect(() => {
    if (restaurantID && menuID) getRestaurantMenu(restaurantID, menuID);
    else alert("Missing restaurantID OR menuID");
  }, [getRestaurantMenu]);

  useEffect(() => {
    if (
      payload &&
      payload.status !== ORDER_STATUS.WAITING &&
      payload.status !== ORDER_STATUS.PREPARING &&
      payload.status !== ORDER_STATUS.READY &&
      payload.status !== ORDER_STATUS.DELIVERED &&
      payload.status !== ORDER_STATUS.DONE
    ) {
      setOrderModalContent({
        color: "bg-warning text-white",
        text: `Order ${payload.orderNumber}, ${payload.status}. `,
      });
    }
  }, [payload]);

  return (
    <div className="relative">
      <KioskCartModal content={cartModalContent} />
      <KioskOrderModal
        content={orderModalContent}
        setOrderModalContent={setOrderModalContent}
      />
      <h1 className="text-center bg-warning text-white p-2">Kiosk Screen</h1>
      {loadingMenu ? (
        <div className="flex flex-row justify-center items-center w-full h-screen z-50">
          <KioskLoading />
        </div>
      ) : (
        <>
          <KioskNavBar cartItems={cartItems} handleOrder={handleOrder} />
          {!showItem ? (
            <div className="grid grid-cols-2">
              {menu.map((item) => (
                <KioskCard
                  key={item.productID}
                  item={item}
                  setShowItem={setShowItem}
                />
              ))}
            </div>
          ) : (
            <KioskItem
              item={showItem}
              disabled={!!cartModalContent}
              handler={handleSendToCart}
              back={setShowItem}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Kiosk;
