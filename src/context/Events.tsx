import { createContext, FC, useEffect, useState } from "react";
import { IEvent } from "../components/ExplorerEvents";

export const EventsContext = createContext<IEvent[]>([]);

export const EventsProvider: FC = ({ children }) => {
  const [events, setEvents] = useState<IEvent[]>([]);

  useEffect(() => {
    fetch("https://dev-explorer-api.herokuapp.com/")
      .then((res) => res.json())
      .then(async (data: IEvent[]) => {
        console.log(data);
        const newEvents = data.map(async (data) => {
          const res = await fetch(data.nftUri);
          const metadata = await res.json();
          return { imgUri: metadata.image as string, ...data };
        });
        setEvents(await Promise.all(newEvents));
      });
  }, []);

  return (
    <EventsContext.Provider value={events}>{children}</EventsContext.Provider>
  );
};
