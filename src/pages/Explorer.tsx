import { useState } from "react";
import { ExplorerCards } from "../components/ExplorerCards";
import { ExplorerEvents } from "../components/ExplorerEvents";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { SearchBar } from "../components/SearchBar";
import { EventsProvider } from "../context/Events";
import { BreadCrumbs } from "../components/elements/BreadCrumbs";

export const Explorer = () => {
  const [tab, setTab] = useState("View Tx");
  return (
    <div>
      <Navbar />
      <ExplorerCards />
      <EventsProvider>
        <SearchBar />
        <BreadCrumbs
          onChange={(value: string) => setTab(value)}
          tabs={["View Tx", "Pending Txns", "Tools"]}
          selecedTab={tab}
        />
        {tab === "View Tx" && <ExplorerEvents />}
      </EventsProvider>
      <Footer />
    </div>
  );
};
