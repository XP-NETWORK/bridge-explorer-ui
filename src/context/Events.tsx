import {
    createContext,
    Dispatch,
    FC,
    SetStateAction,
    useEffect,
    useState,
} from "react";
import { IEvent } from "../components/ExplorerEvents";
import axios from "axios";
import { url } from "../constants";
import { withContainer } from "./ServcieProvder";
import { loadImages, fetchNtf } from "../components/Details/helpers";
import { useSelector } from "react-redux";
import { ReduxState } from "../store";
import { count } from "console";
import { useLocation } from "react-router-dom";

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
    ({ children, container: { socket, scraperSocket, destScraperSocket } }) => {
        const [events, setEvents] = useState<IEvent[]>([]);
        // console.log("🚀 ~ file: Events.tsx:39 ~ events:", events);
        //const [chainName, setChainName] = useState("");
        //const [status, setStatus] = useState("");
        const [isLoading, setIsLoading] = useState(true);
        const [sort, setSort] = useState("DESC");
        //const [paginationPage, setPage] = useState(0);
        const [totalEvents, setTotal] = useState(0);
        const [enableNav, setEnableNav] = useState(true);
        const loc = useLocation();
        // console.log({ loc });

        const {
            eventsQueryString,
            statusFilter,
            collectionName,
            paginationPage,
        } = useSelector((state: ReduxState) => ({
            paginationPage: state.global.page,
            eventsQueryString: state.global.eventsQueryString,
            statusFilter: state.global.statusFilter,
            collectionName: state.global.showByCollection,
        }));

        const toggleSort = () => setSort(sort === "DESC" ? "ASC" : "DESC");

        useEffect(() => {
            socket.off("incomingEvent");
            socket.off("updateEvent");

            scraperSocket.off("incomingEvent");
            scraperSocket.off("updateEvent");

            destScraperSocket.off("incomingEvent");
            destScraperSocket.off("updateEvent");

            socket.on("incomingEvent", async (event: IEvent) => {
                console.log("socket-incoming", event);
                if (loc.pathname === "/") {
                    try {
                        const incoming = { imgUri: "", ...event };
                        setEvents([incoming, ...events]);
                    } catch (e: any) {
                        // console.log(e);
                        const incoming = { imgUri: "", ...event };
                        setEvents([incoming, ...events]); //updateEvent
                    }
                }
            });

            socket.on("updateEvent", async (updated: IEvent) => {
                console.log("socket-updateEvent!!", updated);
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

            socket.on("disconnect", function () {
                console.log("disconnect!!!!!");
            });

            scraperSocket.on("incomingEvent", async (event: IEvent) => {
                console.log("scraperSocket-Incoming Event!!", event);
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

            scraperSocket.on("updateEvent", async (updated: IEvent) => {
                console.log("scraperSocket-updateEvent!!", updated);
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

            destScraperSocket.on("updateEvent", async (updated: IEvent) => {
                console.log("destScraperSocket-updateEvent!!", updated);
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
                scraperSocket.off("incomingEvent");
                scraperSocket.off("updateEvent");
                destScraperSocket.off("updateEvent");
                destScraperSocket.off("updateEvent");
            };
        }, [events]);

        useEffect(() => {
            if (events.length <= 50) {
            }
        }, [events]);

        useEffect(() => {
            setIsLoading(true);
            switch (true) {
                case collectionName.length > 0:
                    loadEventsByCollectionName();
                    break;
                case eventsQueryString.fromChainName !== undefined ||
                    eventsQueryString.toChainName !== undefined ||
                    eventsQueryString.type !== undefined ||
                    eventsQueryString.status !== undefined:
                    filteredEvents();
                    break;
                case typeof eventsQueryString === "string" &&
                    eventsQueryString.length > 0:
                    loadEventsBySearch();
                    break;
                default:
                    loadAllEvents();
                    break;
            }
        }, [eventsQueryString, sort, paginationPage, collectionName]);

        const load = async ({
            events,
            count,
        }: {
            events: IEvent[];
            count: number;
        }) => {
            await loadImages(events, setEvents);
            setTotal(count);
            setIsLoading(false);
        };

        const loadAllEvents = async () => {
            const eventsObj = await axios.get(
                `${url}?sort=${sort}&offset=${paginationPage}`
            );
            load(eventsObj.data);
            // console.log("load all events");
        };

        const loadEventsBySearch = async () => {
            const eventsObj = await axios.get(
                `${url}?chainName=${eventsQueryString}&sort=${sort}&offset=${paginationPage}`
            );
            load(eventsObj.data);
            // console.log("load all search");
        };

        const loadEventsByCollectionName = async () => {
            // console.log(`${url}api?collectionName=${collectionName}&offset=${paginationPage}`);

            const eventsObj = await axios.get(
                `${url}api?collectionName=${collectionName}&offset=${paginationPage}`
            );
            load(eventsObj.data);
            // console.log("load by collection name");
        };

        const filteredEvents = async () => {
            // console.log({ eventsQueryString });
            const urlF = `${url}api?${
                eventsQueryString.fromChainName
                    ? `fromChainName=` +
                      eventsQueryString?.fromChainName?.toUpperCase()
                    : ""
            }${
                eventsQueryString.toChainName
                    ? `&toChainName=` +
                      eventsQueryString?.toChainName?.toUpperCase()
                    : ""
            }${
                eventsQueryString.type ? `&type=` + eventsQueryString.type : ""
            }${
                eventsQueryString.status
                    ? `&status=` + eventsQueryString.status
                    : ""
            }&offset=${paginationPage}`;
            const eventsObj = await axios.get(urlF);
            load(eventsObj.data);
            // console.log("load by filters");
        };

        // useEffect(() => {
        //   setIsLoading(true);
        //   if (eventsQueryString.length && !statusFilter) {
        //     console.log("only chain name");

        //     fetch(
        //       `${url}?chainName=` +
        //         eventsQueryString +
        //         `&sort=${sort}&offset=${paginationPage}`
        //     )
        //       .then((res) => res.json())
        //       .then(
        //         async ({ events, count }: { events: IEvent[]; count: number }) => {
        //           await loadImages(events, setEvents);
        //           setTotal(count);
        //         }
        //       )
        //       .then(() => setIsLoading(false));
        //   } else if (
        //     (eventsQueryString.fromChainName ||
        //       eventsQueryString.toChainName ||
        //       eventsQueryString.type) &&
        //     !statusFilter
        //   ) {
        //     console.log("only eventsQueryString.fromChainName");
        //     console.log({ eventsQueryString });

        //     fetch(
        //       `${url}api?${
        //         eventsQueryString.fromChainName
        //           ? `fromChainName=` + eventsQueryString.fromChainName.toUpperCase()
        //           : ""
        //       }${
        //         eventsQueryString.toChainName
        //           ? `&toChainName=` + eventsQueryString.toChainName.toUpperCase()
        //           : ""
        //       }${eventsQueryString.type ? `&type=` + eventsQueryString.type : ""}`
        //     )
        //       .then((res) => res.json())
        //       .then(
        //         async ({ events, count }: { events: IEvent[]; count: number }) => {
        //           await loadImages(events, setEvents);
        //           setTotal(count);
        //         }
        //       )
        //       .then(() => setIsLoading(false));
        //   } else if (statusFilter && !eventsQueryString) {
        //     // console.log("only status");

        //     fetch(`${url}?status=Failed` + `&sort=${sort}&offset=${paginationPage}`)
        //       .then((res) => res.json())
        //       .then(
        //         async ({ events, count }: { events: IEvent[]; count: number }) => {
        //           await loadImages(events, setEvents);
        //           setTotal(count);
        //           //console.log(await Promise.all(newEvents), "new events");
        //         }
        //       )
        //       .then(() => setIsLoading(false));
        //   } else if (eventsQueryString && statusFilter) {
        //     // console.log("queryString and status");
        //     fetch(
        //       `${url}?pendingSearch=` +
        //         eventsQueryString +
        //         `&sort=${sort}&offset=${paginationPage}`
        //     )
        //       .then((res) => res.json())
        //       .then(
        //         async ({ events, count }: { events: IEvent[]; count: number }) => {
        //           await loadImages(events, setEvents);
        //           setTotal(count);
        //         }
        //       )
        //       .then(() => setIsLoading(false));
        //   } else {
        //     // console.log("no query");
        //     fetch(`${url}?sort=${sort}&offset=${paginationPage}`)
        //       .then((res) => res.json())
        //       .then(
        //         async ({ events, count }: { events: IEvent[]; count: number }) => {
        //           // console.log(events);
        //           await loadImages(events, setEvents);
        //           setTotal(count);
        //         }
        //       )
        //       .then(() => setIsLoading(false));
        //   }
        //   // console.log("isLoading", isLoading);
        //   // console.log("fetching events", events.length, isLoading);
        // }, [eventsQueryString, statusFilter, sort, paginationPage]);

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
function async(
    arg0: { events: IEvent[]; count: any },
    arg1: { events: any; count: any }
) {
    throw new Error("Function not implemented.");
}
