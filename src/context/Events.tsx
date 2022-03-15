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

import {loadImages, fetchNtf} from '../components/Details/helpers'

interface IEventsContext {
  events: IEvent[];
  status: string;
  chainName:string;
  sort: string;
  paginationPage: number;
  totalEvents:number;
  setStatus: Dispatch<SetStateAction<string>>;
  setChainName: (chainName: string) => void;
  setEvents: (events: IEvent[]) => void;
  setIsLoading: (bol: boolean) => void;
  toggleSort: () => void;
  setPage: (idx:number) => void;
  isLoading: boolean;
}

export const EventsContext = createContext<IEventsContext | null>(null);
export const EventsProvider: FC = withContainer(
  ({ children, container: { socket } }) => {
    const [events, setEvents] = useState<IEvent[]>([]);
    const [chainName, setChainName] = useState("");
    const [status, setStatus] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [sort, setSort] = useState('DESC') 
    const [paginationPage, setPage] = useState(0)
    const [totalEvents, setTotal] = useState(0)

    const toggleSort = () => setSort(sort === 'DESC' ? 'ASC':'DESC')
    
    useEffect(() => {

      socket.off("incomingEvent");
      socket.off("updateEvent");
      socket.on("incomingEvent", async (event: any) => {
        try {
          //const res = await fetch(event.nftUri);
          //const metadata = await res.json();
          const incoming = { imgUri: "", ...event };
          setEvents([incoming, ...events]);
          /*setTimeout(() => {
            const idx = events.findIndex(
              (oldEvent: IEvent) =>
              oldEvent.actionId + oldEvent.tokenId + oldEvent.fromHash ===
              event.actionId + event.actionId + event.fromHash
            );
            if (events[idx].status === "Pending") {
            const erroredEvent: IEvent = {
              ...events[idx],
              status: 'Error'
            }
            setEvents([
              ...events.slice(0, idx),
              erroredEvent,
              ...events.slice(idx + 1),
            ]);
          }
          }, 1000 * 1 * 60)*/
        } catch (e: any) {
          console.log(e);
          const incoming = { imgUri: "", ...event };
          setEvents([incoming, ...events]); //updateEvent
        }
      });
      socket.on("updateEvent", async (updated: any) => {
        const idx = events.findIndex(
          (event) =>
            event.actionId + event.fromChain === //event.tokenId + event.fromHash ===
            updated.actionId + updated.fromChain
        );
        try {
          const metadata = await fetchNtf(updated)
          setEvents([
            ...events.slice(0, idx),
            { imgUri: metadata.image as string, ...updated },
            ...events.slice(idx + 1),
          ]);
        } catch (e: any) {
          console.log(e, "img fetch error");
          setEvents([
            ...events.slice(0, idx),
            { imgUri: "", ...updated },
            ...events.slice(idx + 1),
          ]); //updateEvent
        }
      });
    }, [events]);

    useEffect(() => {
      //if (events.length !== events.length) {
        setIsLoading(true);
     // }
      if (chainName.length && status.length === 0) {
        console.log("only chain name");

        fetch(`${url}?chainName=` + chainName + `&sort=${sort}&offset=${paginationPage}`)
          .then((res) => res.json())
          .then(async ({events, count}: {events: IEvent[], count: number}) => {
            await loadImages(events, setEvents);
            setTotal(count)
          })
          .then(() => setIsLoading(false));
      } else if (status.length && chainName.length === 0) {
        console.log("only status");

        fetch(`${url}?status=Pending` + `&sort=${sort}&offset=${paginationPage}`)
          .then((res) => res.json())
          .then(async ({events, count}: {events: IEvent[], count: number}) => {
            await loadImages(events, setEvents);
            setTotal(count)
            //console.log(await Promise.all(newEvents), "new events");
          })
          .then(() => setIsLoading(false));
      } else if (chainName.length && status.length > 0) {
        console.log("chain name and status");
        fetch(`${url}?pendingSearch=` + chainName + `&sort=${sort}&offset=${paginationPage}`)
          .then((res) => res.json())
          .then(async ({events, count}: {events: IEvent[], count: number}) => {
            await loadImages(events, setEvents);
            setTotal(count)
          })
          .then(() => setIsLoading(false));
      } else {
        console.log("no query");
        fetch(`${url}?sort=${sort}&offset=${paginationPage}`)
          .then((res) => res.json())
          .then(async ({events, count}: {events: IEvent[], count: number}) => {
              await loadImages(events, setEvents)
              setTotal(count)
          })
          .then(() => setIsLoading(false));
      }
      console.log("isLoading", isLoading);
      console.log("fetching events", events.length, isLoading);
    }, [chainName, status, sort, paginationPage]);

    return (
      <EventsContext.Provider
        value={{ events, totalEvents, status, setStatus, setChainName, isLoading, setEvents, setIsLoading, chainName, toggleSort, sort, paginationPage, setPage }}
      >
        {children}
      </EventsContext.Provider>
    );
  }
);
