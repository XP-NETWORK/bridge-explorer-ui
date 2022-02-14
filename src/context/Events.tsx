import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { IEvent } from "../components/ExplorerEvents";

interface IEventsContext {
  events: IEvent[];
  setFromHash: (fromHash: string) => void;
}

export const EventsContext = createContext<IEventsContext | null>(null);

export const EventsProvider: FC = ({ children }) => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [fromHash, setFromHash] = useState("");

  useEffect(() => {
    if (fromHash.length) {
      fetch("https://dev-explorer-api.herokuapp.com/?fromHash=" + fromHash)
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
    } else {
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
    }
  }, [fromHash]);

  return (
    <EventsContext.Provider value={{ events, setFromHash }}>
      {children}
    </EventsContext.Provider>
  );
};
