import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { EventDetails } from "../components/EventDetails";
import { ExplorerCards } from "../components/ExplorerCards";
import { Chart } from "../components/elements/Сhart";
import { useState, useEffect } from "react";
import { url } from "../constants";
import React from "react";

export interface DailyData {
  txNumber: number;
  walletsNumber: number;
  date: string;
}

export const Dashboard = React.memo(() => {
  const [dailyData, setDailyData] = useState<DailyData[]>([]);
  const [fetching, setFetching] = useState(false)

  useEffect(() => {
    setFetching(true);

    (async () => {
      const res = await fetch(`${url}dashboard`);
      setFetching(false)
      if (res.ok) {
        const body = await res.json();
        setDailyData(body);
      }
    })();
  }, []);

  return (
    <div>
      <Chart dailyData={dailyData} charFetching={fetching}/>
    </div>
  );
});
