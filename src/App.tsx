import { ReactElement, useEffect, useState } from "react";
import { OrderResponseType } from "./interfaces/types";
import Kiosk from "./pages/Kiosk/Kiosk";
import Kitchen from "./pages/Kitchen/Kitchen";

const WSEndpoint = process.env.REACT_APP_ORDERS_WEBSOCKET_ENDPOINT || "";

const App = (): ReactElement => {
  const [ws, setWs] = useState<WebSocket>();
  const [payload, setPayload] = useState<OrderResponseType>();

  useEffect(() => {
    const wsClient = new WebSocket(WSEndpoint);
    wsClient.onopen = () => {
      console.log("ws opened");
      setWs(wsClient);
    };
    wsClient.onclose = () => console.log("ws closed");
    return () => wsClient.close();
  }, []);

  useEffect(() => {
    if (!ws) return;
    ws.onmessage = (e) => {
      const { payload } = JSON.parse(e.data);
      const p =
        payload.length > 1 ? payload.length[payload.length + 1] : payload[0];
      setPayload(p)
      console.log("payload", p);
    };
  }, [ws]);

  return (
    <div className="w-full h-screen flex flex-row">
      <div className="w-6/12 h-full bg-warning/10">
        <Kiosk payload={payload} />
      </div>
      <div className="w-6/12">
        <div className="h-2/4 bg-secondary/10">
          <Kitchen payload={payload} />
        </div>
        <div className="h-2/4 bg-primary/10">
          {/* <Restaurant orders={restaurantOrders} /> */}
        </div>
      </div>
    </div>
  );
};

export default App;
