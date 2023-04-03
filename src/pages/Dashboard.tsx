import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { EventDetails } from "../components/EventDetails";
import { ExplorerCards } from "../components/ExplorerCards";
import { Chart } from "../components/elements/Сhart";
import { useState, useEffect } from "react";
import { url } from "../constants";
import React from "react";
import { handleGoogleAnalyticsPageView } from "../GA4";

export interface DailyData {
    id: string;
    Tx: string;
    walletsNumber: number;
    date: string;
    day: string;
}

export const Dashboard = React.memo(() => {
    const [dailyData, setDailyData] = useState<DailyData[]>([]);
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        setFetching(true);
        const pageView = {
            hitType: "Page View",
            page: window.location.pathname + window.location.search,
            title: "Dashboard",
        };

        handleGoogleAnalyticsPageView(pageView);
        (async () => {
            const res = await fetch(`${url}newDash`);
            // console.log("res", res);
            setFetching(false);
            if (res.ok) {
                const body = await res.json();
                setDailyData(body);
            }
        })();
    }, []);

    return (
        <div>
            <Chart dailyData={dailyData} charFetching={fetching} />
        </div>
    );
});
