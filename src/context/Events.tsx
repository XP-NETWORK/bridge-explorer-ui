import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { IEvent } from "../components/ExplorerEvents";

import { withSocket } from "./ServcieProvder";

const url = "http://localhost:3100/"; //"https://dev-explorer-api.herokuapp.com/"; //"http://localhost:3100/";
interface IEventsContext {
  events: IEvent[];
  setChainName: (chainName: string) => void;
}

export const EventsContext = createContext<IEventsContext | null>(null);
export const EventsProvider: FC = withSocket(({ children, socket }) => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [chainName, setChainName] = useState("");

  useEffect(() => {}, []);

  useEffect(() => {
    socket.off("incomingEvent");
    socket.off("updateEvent");
    socket.on("incomingEvent", async (event: any) => {
      console.log(event, 'incoming');
      try {
        //const res = await fetch(event.nftUri);
        //const metadata = await res.json();
        const incoming = { imgUri:'', ...event };
        console.log(events, "on event===");
        setEvents([incoming, ...events]);
      } catch (e: any) {
        console.log(e);
        const incoming = { imgUri: "", ...event };
        setEvents([incoming, ...events]); //updateEvent
      }
    });
    socket.on("updateEvent", async (updated: any) => {
      console.log(updated ,'updated');
      const idx = events.findIndex((event) => event.actionId + event.tokenId + updated.fromHash === updated.actionId + updated.tokenId + event.fromHash);
      try {
        const res = await fetch(updated.nftUri);
        const metadata = await res.json();
        const updatedEvent = {imgUri: metadata.image as string, ...updated}
        setEvents([...events.slice(0, idx), updatedEvent, ...events.slice(idx + 1)]);
      } catch (e: any) {
        console.log(e,'img fetch error');
        const updatedEvent = { imgUri: "", ...updated };
        setEvents([...events.slice(0, idx), updatedEvent, ...events.slice(idx + 1)]); //updateEvent
      }
    });
  }, [events]);

  useEffect(() => {
    if (chainName.length) {
      fetch(`${url}?chainName=` + chainName)
        .then((res) => res.json())
        .then(async (data: IEvent[]) => {
          const newEvents = data.map(async (data) => {
            const res = await fetch(data.nftUri);
            const metadata = await res.json();
            return { imgUri: metadata.image as string, ...data };
          });
          setEvents(await Promise.all(newEvents));
        });
    } else {
      fetch(`${url}`)
        .then((res) => res.json())
        .then(async (data: IEvent[]) => {
          const newEvents = data.map(async (data) => {
            try {
              console.log(data.nftUri);
              const res = await fetch(data.nftUri);
              const metadata = await res.json();
              return { imgUri: metadata.image as string, ...data };
            } catch (e: any) {
              console.log(e);
              return { imgUri: "", ...data };
            }
          });
          setEvents(await Promise.all(newEvents));
        });
    }
  }, [chainName]);

  return (
    <EventsContext.Provider value={{ events, setChainName }}>
      {children}
    </EventsContext.Provider>
  );
});
