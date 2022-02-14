import { ExplorerCards } from "../components/ExplorerCards";
import { ExplorerEvents } from "../components/ExplorerEvents";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { SearchBar } from "../components/SearchBar";
import { EventsProvider } from "../context/Events";

export const Explorer = () => {
  return (
    <div>
      <Navbar />
      <ExplorerCards />
      <EventsProvider>
        <SearchBar />
        <ExplorerEvents />
      </EventsProvider>
      <Footer />
    </div>
  );
};
