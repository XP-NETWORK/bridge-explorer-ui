import { ExplorerCards } from "../components/ExplorerCards";
import { Navbar } from "../components/Navbar";
import { SearchBar } from "../components/SearchBar";

export const Explorer = () => {
  return (
    <div>
      <Navbar />
      <ExplorerCards />
      <SearchBar />
    </div>
  );
};
