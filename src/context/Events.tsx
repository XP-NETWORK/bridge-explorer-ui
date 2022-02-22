import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { IEvent } from "../components/ExplorerEvents";

const url = "http://localhost:3100/"; //'https://dev-explorer-api.herokuapp.com/'
interface IEventsContext {
  events: IEvent[];
  setChainName: (chainName: string) => void;
}

export const EventsContext = createContext<IEventsContext | null>(null);
export const EventsProvider: FC = ({ children }) => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [chainName, setChainName] = useState("");

  useEffect(() => {
    //socket.emit("test");
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
};
