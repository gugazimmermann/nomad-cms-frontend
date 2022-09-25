import { ReactElement, useEffect, useRef, useState } from "react";
import { MenuItemsType, ModalContentType, OrderType } from "../../interfaces/types";
import { KioskCard, KioskItem, KioskModal, KioskNavBar } from ".";

type KioskProps = {
  menu: MenuItemsType[];
  handlePayment: (cartItems: MenuItemsType[]) => Promise<string>;
  handeOrders: (order: OrderType) => void;
};

const Kiosk = ({ menu, handlePayment, handeOrders }: KioskProps): ReactElement => {
  const [showItem, setShowItem] = useState<MenuItemsType | null>(null);
  const [cartItems, setCartItems] = useState<MenuItemsType[]>([]);
  const [modalContent, setModalContent] = useState<ModalContentType>();
  const refModalTimer = useRef<number | null>(null);

  const handleSendOrder = async () => {
    try {
      const order = await handlePayment(cartItems);
      setModalContent({
        color: "bg-secondary text-white",
        text: `Thanks for Ordering, your order number is: ${order}`,
      });
      handeOrders({ order, items: cartItems });
      setCartItems([] as MenuItemsType[]);
    } catch (error: any) {
      setModalContent({
        color: "bg-danger text-white",
        text: `Payment Error! Please, Try Again!`,
      });
    }
  };

  const handleSendToCart = (item: MenuItemsType) => {
    setModalContent({
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
      setModalContent(undefined);
    }, 2500);
    return () => {
      if (refModalTimer.current !== null)
        window.clearTimeout(refModalTimer.current);
    };
  }, [modalContent]);

  return (
    <div className="relative">
      <KioskModal content={modalContent} />
      <h1 className="text-center bg-warning text-white p-2">Kiosk Screen</h1>
      <KioskNavBar cartItems={cartItems} sendOrder={handleSendOrder} />
      {!showItem ? (
        <div className="grid grid-cols-2">
          {menu.map((item) => (
            <KioskCard key={item.id} item={item} setShowItem={setShowItem} />
          ))}
        </div>
      ) : (
        <KioskItem
          item={showItem}
          disabled={!!modalContent}
          handler={handleSendToCart}
          back={setShowItem}
        />
      )}
    </div>
  );
};

export default Kiosk;
