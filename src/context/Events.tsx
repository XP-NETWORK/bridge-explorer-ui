import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { IEvent } from "../components/ExplorerEvents";

import { url } from "../constants";

import { withContainer } from "./ServcieProvder";

interface IEventsContext {
  events: IEvent[];
  status: string;
  setStatus: Dispatch<SetStateAction<string>>;
  setChainName: (chainName: string) => void;
  isLoading: boolean;
}

export const EventsContext = createContext<IEventsContext | null>(null);
export const EventsProvider: FC = withContainer(
  ({ children, container: { socket } }) => {
    const [events, setEvents] = useState<IEvent[]>([]);
    const [chainName, setChainName] = useState("");
    const [status, setStatus] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      socket.off("incomingEvent");
      socket.off("updateEvent");
      socket.on("incomingEvent", async (event: any) => {
        try {
          //const res = await fetch(event.nftUri);
          //const metadata = await res.json();
          const incoming = { imgUri: "", ...event };
          setEvents([incoming, ...events]);
        } catch (e: any) {
          console.log(e);
          const incoming = { imgUri: "", ...event };
          setEvents([incoming, ...events]); //updateEvent
        }
      });
      socket.on("updateEvent", async (updated: any) => {
        const idx = events.findIndex(
          (event) =>
            event.actionId + event.tokenId + updated.fromHash ===
            updated.actionId + updated.tokenId + event.fromHash
        );
        try {
          const res = await fetch(updated.nftUri);
          const metadata = await res.json();
          const updatedEvent = { imgUri: metadata.image as string, ...updated };
          setEvents([
            ...events.slice(0, idx),
            updatedEvent,
            ...events.slice(idx + 1),
          ]);
        } catch (e: any) {
          console.log(e, "img fetch error");
          const updatedEvent = { imgUri: "", ...updated };
          setEvents([
            ...events.slice(0, idx),
            updatedEvent,
            ...events.slice(idx + 1),
          ]); //updateEvent
        }
      });
    }, [events]);

    useEffect(() => {
      setIsLoading(true);

      if (chainName.length && status.length === 0) {
        console.log("only chain name");

        fetch(`${url}?chainName=` + chainName)
          .then((res) => res.json())
          .then(async (data: IEvent[]) => {
            const newEvents = data.map(async (data) => {
              const res = await fetch(data.nftUri);
              const metadata = await res.json();
              return { imgUri: metadata.image as string, ...data };
            });
            setEvents(await Promise.all(newEvents));
          })
          .then(() => setIsLoading(false));
      } else if (status.length && chainName.length === 0) {
        console.log("only status");

        fetch(`${url}?status=Pending`)
          .then((res) => res.json())
          .then(async (data: IEvent[]) => {
            const newEvents = data.map(async (data) => {
              const res = await fetch(data.nftUri);
              const metadata = await res.json();
              return { imgUri: metadata.image as string, ...data };
            });
            setEvents(await Promise.all(newEvents));
            console.log(await Promise.all(newEvents), "new events");
          })
          .then(() => setIsLoading(false));
      } else if (chainName.length && status.length > 0) {
        console.log("chain name and status");
        fetch(`${url}?pendingSearch=` + chainName)
          .then((res) => res.json())
          .then(async (data: IEvent[]) => {
            const newEvents = data.map(async (data) => {
              const res = await fetch(data.nftUri);
              const metadata = await res.json();
              return { imgUri: metadata.image as string, ...data };
            });
            setEvents(await Promise.all(newEvents));
          })
          .then(() => setIsLoading(false));
      } else {
        console.log("no query");
        fetch(`${url}`)
          .then((res) => res.json())
          .then(async (data: IEvent[]) => {
            const newEvents = data.map(async (data) => {
              try {
                const res = await fetch(data.nftUri);
                const metadata = await res.json();
                return { imgUri: metadata.image as string, ...data };
              } catch (e: any) {
                console.log(e);
                return { imgUri: "", ...data };
              }
            });
            setEvents(await Promise.all(newEvents));
          })
          .then(() => setIsLoading(false));
      }
      console.log("isLoading", isLoading);
      console.log("fetching events", events.length, isLoading);
    }, [chainName, status]);

    return (
      <EventsContext.Provider
        value={{ events, status, setStatus, setChainName, isLoading }}
      >
        {children}
      </EventsContext.Provider>
    );
  }
);
