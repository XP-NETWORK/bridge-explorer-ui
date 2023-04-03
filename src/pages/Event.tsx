import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { EventDetailsSkeleton } from "../components/Details";
import { useEffect } from "react";
import { handleGoogleAnalyticsPageView } from "../GA4";

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
