import { Routes, Route } from "react-router-dom";
import { Explorer } from "./pages/Explorer";
import { Event } from "./pages/Event";
import { Dashboard } from "./pages/Dashboard";
import { Network } from "./pages/Network";
import { ServiceProvider } from "../src/context/ServcieProvder";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import "./components/ChainModal/Chain.css";

import { socketUrl, url, scraperSocketUrl, destScraperSocketUrl } from "./constants";

const socket = io(socketUrl, {
  path: "/socket.io",
});

const scraperSocket = io(scraperSocketUrl, {
  path: "/socket.io",
});
const destScraperSocket = io(destScraperSocketUrl, {
  path: "/socket.io",
});

interface AppData {
  totalTx: number;
  totalWallets: number;
}

export const App = () => {
  const [appData, setAppData] = useState<AppData>({
    totalTx: 0,
    totalWallets: 0,
  });

  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${url}getMetrics`);
        const metrics = await res.json();
        if (metrics) {
          setAppData({
            totalTx: metrics.totalTx,
            totalWallets: metrics.totalWallets,
          });
        }
        setFetching(false);
      } catch (e) {
        console.error("get metrics route");
      }
    })();
  }, []);

  return (
    <ServiceProvider value={{ socket, appData, fetching, scraperSocket, destScraperSocket }}>
      <Routes>
        <Route path="/*" element={<Explorer />} />
        <Route path="/tx/:fromHash" element={<Event />} />
        <Route path="/network" element={<Network />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </ServiceProvider>
  );
};
