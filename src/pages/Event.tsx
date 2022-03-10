import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { EventDetails } from "../components/EventDetails";
import { EventDetailsSkeleton } from "../components/Details";
import { useEffect } from "react";

export const Event = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Navbar />
      <EventDetailsSkeleton />
      <Footer />
    </div>
  );
};
