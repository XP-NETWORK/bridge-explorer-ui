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

import { loadImages, fetchNtf } from "../components/Details/helpers";

import { useSelector } from "react-redux";
import { ReduxState } from "../store";

interface IEventsContext {
  events: IEvent[];
  //status: string;
  //chainName: string;
  sort: string;
  //paginationPage: number;
  totalEvents: number;
  //setStatus: Dispatch<SetStateAction<string>>;
  //setChainName: (chainName: string) => void;
  setEvents: (events: IEvent[]) => void;
  setIsLoading: (bol: boolean) => void;
  toggleSort: () => void;
  //setPage: (idx: number) => void;
  isLoading: boolean;
}

export const EventsContext = createContext<IEventsContext | null>(null);
export const EventsProvider: FC = withContainer(
  ({ children, container: { socket } }) => {
    const [events, setEvents] = useState<IEvent[]>([]);
    //const [chainName, setChainName] = useState("");
    const [status, setStatus] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [sort, setSort] = useState("DESC");
    //const [paginationPage, setPage] = useState(0);
    const [totalEvents, setTotal] = useState(0);

    const { eventsQueryString, statusFilter, paginationPage } = useSelector(
      (state: ReduxState) => ({
        paginationPage: state.global.page,
        eventsQueryString: state.global.eventsQueryString,
        statusFilter: state.global.statusFilter,
      })
    );

    const toggleSort = () => setSort(sort === "DESC" ? "ASC" : "DESC");

    useEffect(() => {
      socket.off("incomingEvent");
      socket.off("updateEvent");
      socket.on("incomingEvent", async (event: IEvent) => {
        console.log("Incoming event");
        console.log(event);
        if (eventsQueryString) return;
        try {
          const incoming = { imgUri: "", ...event };
          setEvents([incoming, ...events]);
        } catch (e: any) {
          // console.log(e);
          const incoming = { imgUri: "", ...event };
          setEvents([incoming, ...events]); //updateEvent
        }
      });
      socket.on("updateEvent", async (updated: IEvent) => {
        console.log(
          "updateEvent",
          updated.fromChain,
          updated.actionId,
          updated.status
        );
        const idx = events.findIndex(
          (event) =>
            event.fromChain + event.actionId ===
            updated.fromChain + updated.actionId
        );
        try {
          const metadata = await fetchNtf(updated);
          setEvents([
            ...events.slice(0, idx),
            { imgUri: metadata.image as string, ...updated },
            ...events.slice(idx + 1),
          ]);
        } catch (e: any) {
          // console.log(e, "img fetch error");
          setEvents([
            ...events.slice(0, idx),
            { imgUri: "", ...updated },
            ...events.slice(idx + 1),
          ]); //updateEvent
        }
      });

      return () => {
        socket.off("incomingEvent");
        socket.off("updateEvent");
      };
    }, [events]);

    useEffect(() => {
      setIsLoading(true);
      if (eventsQueryString.length && !statusFilter) {
        console.log("only chain name");

        fetch(
          `${url}?chainName=` +
            eventsQueryString +
            `&sort=${sort}&offset=${paginationPage}`
        )
          .then((res) => res.json())
          .then(
            async ({ events, count }: { events: IEvent[]; count: number }) => {
              await loadImages(events, setEvents);
              setTotal(count);
            }
          )
          .then(() => setIsLoading(false));
      } else if (
        (eventsQueryString.fromChainName ||
          eventsQueryString.toChainName ||
          eventsQueryString.type) &&
        !statusFilter
      ) {
        console.log("only eventsQueryString.fromChainName");
        console.log({ eventsQueryString });

        fetch(
          `${url}api?${
            eventsQueryString.fromChainName
              ? `fromChainName=` + eventsQueryString.fromChainName.toUpperCase()
              : ""
          }${
            eventsQueryString.toChainName
              ? `&toChainName=` + eventsQueryString.toChainName.toUpperCase()
              : ""
          }${eventsQueryString.type ? `&type=` + eventsQueryString.type : ""}`
        )
          .then((res) => res.json())
          .then(
            async ({ events, count }: { events: IEvent[]; count: number }) => {
              await loadImages(events, setEvents);
              setTotal(count);
            }
          )
          .then(() => setIsLoading(false));
      } else if (statusFilter && !eventsQueryString) {
        // console.log("only status");

        fetch(`${url}?status=Failed` + `&sort=${sort}&offset=${paginationPage}`)
          .then((res) => res.json())
          .then(
            async ({ events, count }: { events: IEvent[]; count: number }) => {
              await loadImages(events, setEvents);
              setTotal(count);
              //console.log(await Promise.all(newEvents), "new events");
            }
          )
          .then(() => setIsLoading(false));
      } else if (eventsQueryString && statusFilter) {
        // console.log("queryString and status");
        fetch(
          `${url}?pendingSearch=` +
            eventsQueryString +
            `&sort=${sort}&offset=${paginationPage}`
        )
          .then((res) => res.json())
          .then(
            async ({ events, count }: { events: IEvent[]; count: number }) => {
              await loadImages(events, setEvents);
              setTotal(count);
            }
          )
          .then(() => setIsLoading(false));
      } else {
        // console.log("no query");
        fetch(`${url}?sort=${sort}&offset=${paginationPage}`)
          .then((res) => res.json())
          .then(
            async ({ events, count }: { events: IEvent[]; count: number }) => {
              // console.log(events);
              await loadImages(events, setEvents);
              setTotal(count);
            }
          )
          .then(() => setIsLoading(false));
      }
      // console.log("isLoading", isLoading);
      // console.log("fetching events", events.length, isLoading);
    }, [eventsQueryString, statusFilter, sort, paginationPage]);

    return (
      <EventsContext.Provider
        value={{
          events,
          totalEvents,
          //status,
          //setStatus,
          //setChainName,
          isLoading,
          setEvents,
          setIsLoading,
          //chainName,
          toggleSort,
          sort,
        }}
      >
        {children}
      </EventsContext.Provider>
    );
  }
);
