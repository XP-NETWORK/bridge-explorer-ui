import { useState } from "react";
import { ExplorerCards } from "../components/ExplorerCards";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { SearchBar } from "../components/SearchBar";
import { EventsProvider } from "../context/Events";
import { Dashboard } from "./Dashboard";
// import { useLocation } from "react-router";
// import { BreadCrumbs, TabsNavigator, tabs } from "../components/elements/BreadCrumbs";
import { Title } from "../components/Title";
import { ErrorBoundary } from "./errorHandler";
import { ExplorerEvents } from "../../src/components/ExplorerEvents";

export const Explorer = () => {
  // const loc = useLocation();
  // const [tab, setTab] = useState(
  //   tabs.find((tab) => tab.route === loc.pathname.replace("/", ""))?.name
  // );
  const [searchingMode, setSearchingMode] = useState(false);

  return (
    <div>
      <Navbar />
      <ErrorBoundary>
        <Title />
        <EventsProvider>
          <SearchBar />
          <span>
            <ExplorerCards />
            <Dashboard />
          </span>
          {/* ) : (
            ""
          )} */}
          {/* <BreadCrumbs
            onChange={(value: string) => {
              setTab(value);
            }}
            tabs={tabs}
            selecedTab={tab || tabs[0].name}
          />
          <TabsNavigator /> */}
          <ExplorerEvents status="" />
        </EventsProvider>
        <Footer />
      </ErrorBoundary>
    </div>
  );
};
