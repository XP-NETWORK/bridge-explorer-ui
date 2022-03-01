import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { NetworkTable } from "../components/Network";
import { ExplorerCards } from "../components/ExplorerCards";


export const Network = () => {
  return (
    <div>
      <Navbar />
      <ExplorerCards />
      <NetworkTable/>
      <Footer />
    </div>
  );
};
