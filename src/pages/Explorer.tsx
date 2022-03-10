import { useState } from "react";
import { ExplorerCards } from "../components/ExplorerCards";
import { ExplorerEvents } from "../components/ExplorerEvents";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { SearchBar } from "../components/SearchBar";
import { EventsProvider } from "../context/Events";
import { Dashboard } from "./Dashboard";

import {
  BreadCrumbs,
  TabsNavigator,
  tabs,
} from "../components/elements/BreadCrumbs";

export const Explorer = () => {
  const [tab, setTab] = useState(tabs[0]);
  return (
    <div>
      <Navbar />
      <ExplorerCards />
      <Dashboard />
      <EventsProvider>
        <SearchBar />

        <BreadCrumbs
          onChange={(value: string) => setTab(value)}
          tabs={tabs}
          selecedTab={tab}
        />
        <TabsNavigator tab={tab} />
      </EventsProvider>
      <Footer />
    </div>
  );
};
