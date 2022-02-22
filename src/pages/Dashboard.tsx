import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { EventDetails } from "../components/EventDetails";
import { ExplorerCards } from "../components/ExplorerCards";
import { Chart } from "../components/elements/Сhart";

export const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <ExplorerCards />
      <Chart />
      <Footer />
    </div>
  );
};
