import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { EventDetails } from "../components/EventDetails";
import { ExplorerCards } from "../components/ExplorerCards";
import { Chart } from "../components/elements/Сhart";
import { useState, useEffect } from "react";
import { url } from "../constants";

export interface DailyData {
  txNumber: number,
  walletsNumber: number,
  date: string
}

export const Dashboard = () => {

  const [dailyData, setDailyData] = useState<DailyData[]>([])

  useEffect(() => {
    (async() => {
       const res =  await fetch(`${url}dashboard`);
       if (res.ok) {
         const body = await res.json();
         setDailyData(body)
       }
    })()
  },[])


  return (
    <div>
      <Navbar />
      <ExplorerCards />
      <Chart dailyData={dailyData}/>
      <Footer />
    </div>
  );
};
