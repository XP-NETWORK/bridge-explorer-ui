import { Routes, Route } from "react-router-dom";
import { Explorer } from "./pages/Explorer";
import { Event } from "./pages/Event";
import { Dashboard } from "./pages/Dashboard";
import { Network } from "./pages/Network";
import { Search } from "./pages/Search";
import { ServiceProvider } from "../src/context/ServcieProvder";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import "./components/ChainModal/Chain.css";

import { socketUrlPath, url, socketUrl } from "./constants";
import { handleGoogleAnalyticsPageView } from "./GA4";

const socket = io(socketUrl, {
    path: socketUrlPath || "/socket.io",
});
setTimeout(() => {
    console.log(socket.connected);
}, 6000);
interface AppData {
    totalTx: number;
    totalWallets: number;
    totalAsstest: number;
    totalValue: number;
}

export const App = () => {
    const [appData, setAppData] = useState<AppData>({
        totalTx: 0,
        totalWallets: 0,
        totalAsstest: 0,
        totalValue: 0,
    });

    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        const pageView = {
            hitType: "Page View",
            page: window.location.pathname + window.location.search,
            title: "Custom Title",
        };

        handleGoogleAnalyticsPageView(pageView);

        (async () => {
            try {
                const res = await fetch(`${url}getMetrics`);
                const metrics = await res.json();

                if (metrics) {
                    setAppData({
                        totalTx: metrics.totalTx,
                        totalWallets: metrics.totalWallets,
                        totalAsstest: metrics.totalAsstest,
                        totalValue: metrics.totalValue,
                    });
                }
                setFetching(false);
            } catch (e) {
                console.error("get metrics route");
            }
        })();
    }, []);

    return (
        <ServiceProvider
            value={{
                socket,
                appData,
                fetching,
            }}
        >
            <Routes>
                <Route path="/*" element={<Explorer />} />
                <Route path="/tx/:fromHash" element={<Event />} />
                <Route path="/network" element={<Network />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/search/*" element={<Search />} />
            </Routes>
        </ServiceProvider>
    );
};
