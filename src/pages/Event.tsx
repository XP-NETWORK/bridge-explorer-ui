import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { EventDetails } from "../components/EventDetails";
import { EventDetailsSkeleton } from "../components/Details";

export const Event = () => {
  return (
    <div>
      <Navbar />
      <EventDetailsSkeleton />
      <Footer />
    </div>
  );
};
