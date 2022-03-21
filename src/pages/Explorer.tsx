import { useState } from "react";
import { ExplorerCards } from "../components/ExplorerCards";
import { ExplorerEvents } from "../components/ExplorerEvents";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { SearchBar } from "../components/SearchBar";
import { EventsProvider } from "../context/Events";
import { Dashboard } from "./Dashboard";
import { useLocation } from "react-router";

import {
  BreadCrumbs,
  TabsNavigator,
  tabs,
} from "../components/elements/BreadCrumbs";

export const Explorer = () => {
  const loc = useLocation();
  console.log(loc);
  const [tab, setTab] = useState(
    tabs.find((tab) => tab.route === loc.pathname.replace("/", ""))?.name
  );

  return (
    <div>
      <Navbar />
      <ExplorerCards />

      <EventsProvider>
        <SearchBar />
        <Dashboard />
        <BreadCrumbs
          onChange={(value: string) => setTab(value)}
          tabs={tabs}
          selecedTab={tab || tabs[0].name}
        />
        <TabsNavigator />
      </EventsProvider>
      <Footer />
    </div>
  );
};
