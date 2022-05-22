import { FC, useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "./Container";
import { useContext } from "react";
import { EventsContext } from "../context/Events";
import { Status } from "./Status";
import { LoaderRow } from "./elements/LoaderRow";
import { currency, chains, chainNoncetoName ,txExplorers } from "../constants";
import ReactTooltip from "react-tooltip";
import moment from "moment";
import scrollUp from "../assets/img/collapse.svg";
import { NoEventsRow } from "./elements/NoEventsRow";
import { getExchangeRates } from "../getExchangeRate";
import sortIcon from "../assets/img/sort.svg";
import { Paginator } from "./elements/Paginator";
import { ErrorStatus } from "./elements/ErrorStatus";
import { Loader } from "./elements/Loader";
import { formatFees } from "./Details/helpers";
import ExplorerLink from "./elements/ExplorerLink";
import { RowNFT } from "./Table/RowNFT";



export interface IEvent {
  id: string;
  chainName: string;
  type: "Transfer" | "Unfreeze";
  fromChain?: string;
  toChain: string;
  fromChainName?: string;
  toChainName?: string;
  actionId: string;
  txFees: string;
  tokenId?: string;
  status: "Completed" | "Pending" | "Error";
  fromHash: string;
  toHash?: string;
  senderAddress: string;
  targetAddress?: string;
  createdAt: Date;
  nftUri: string;
  imgUri?: string;
  name: string;
}

export const ExplorerEvents: FC<{ status?: string }> = ({ status = "" }) => {
  const navigate = useNavigate();
  const eventsContext = useContext(EventsContext);
  const [exchangeRates, setExchangeRates] = useState<{
    [key: string]: { usd: number };
  }>({
    velas: { usd: 0 },
  });

  useEffect(() => {
    eventsContext?.setStatus(status);
    console.log(eventsContext?.events, status);
  }, [status]);

  let scrollBtn = useRef<any>(null);

  const scrollHandler = function () {

    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 500
    ) {
      scrollBtn.current.style.bottom = "500px";
    } else {
      scrollBtn.current.style.bottom = "30px";
    }
  };

  useEffect(() => {





    if (eventsContext?.events.length) {
      scrollBtn.current.style.visibility = "visible";
      window.addEventListener("scroll", scrollHandler);
      return () => window.removeEventListener("scroll", scrollHandler);
    }
  }, [eventsContext?.events]);

  useEffect(() => {
    const ids: string[] = chains.map((chain) => chain.id);
    getExchangeRates(ids).then((rates) => {
      setExchangeRates(rates);
    });




    
  }, []);

  const getExchangeRate = (
    rates: { [key: string]: { usd: number } },
    chainName: string
  ): number => {
    const chain = chains.find(
      (chain) => chain.name.toLowerCase() === chainName.toLowerCase()
    );
    const rate = (chain && rates[chain.id]?.usd) || 1;

    return rate;
  };

  return (
    <>
      <div>
        <Container>
          <Paginator />
        </Container>
        <Container className="mt-5 px-0 md:px-4 overflow-x-auto tableWrapper">
          <img
            src={scrollUp}
            alt="scrollUp"
            className="scrollTopBtn"
            ref={scrollBtn}
            onClick={(e) => {
              setTimeout(
                () => window.scrollTo({ top: 10, behavior: "smooth" }),
                100
              );
            }}
          />

          <table className="min-w-full divide-y border-b eventsTable">
            <thead className="bg-gray-50 ">
              <tr>
                <TableHeading className="sticky left-0 bg-gray-50 ">
                  NFT
                </TableHeading>
                <TableHeading>Tx Value</TableHeading>
                {false && <TableHeading>Tx Hash</TableHeading>}
                <TableHeading>From</TableHeading>
                <TableHeading>To</TableHeading>
                <TableHeading>Method</TableHeading>
                <TableHeading>
                  <span className="ageHeader">
                    Age
                    <img
                      src={sortIcon}
                      className={`${
                        eventsContext?.sort === "ASC" ? "rotated" : ""
                      }`}
                      onClick={eventsContext!.toggleSort}
                    />
                  </span>
                </TableHeading>
                <TableHeading>Status</TableHeading>
              </tr>
            </thead>
            <tbody className=" divide-y   overflow-x-scroll">
              {eventsContext?.isLoading ? (
                <LoaderRow />
              ) : // if events length is 0 after 2 seconds, show loader
              eventsContext?.events.length ? (
                eventsContext?.events.map((event: IEvent, idx: number) => {
                  const dollarValue = getExchangeRate(exchangeRates, event.chainName) * formatFees(event)

                  return (
                    <tr
                      key={event.id}
                      onClick={() => navigate(`/tx/${event.fromHash}`)}
                      className="bg-white group hover:bg-transparent txRow"
                    >
                      <TableData
                        className={`sticky left-0 text-center bg-white group-hover:bg-[#F7F7F9] imgTableData ${
                          /^((?!chrome|android).)*safari/i.test(
                            navigator.userAgent
                          )
                            ? "safariHack"
                            : "sitckyBottomLine"
                        }`}
                      >
                        <ReactTooltip
                          effect="solid"
                          className="copyTip"
                          multiline
                        />
                        <RowNFT event={event} />
                      </TableData>

                      <TableData>
                        <span
                          className="cursor-default"
                          data-tip={`
                        ${
                          formatFees(event)
                        } ${event.fromChain && currency[event.fromChain]} <br>
                          ${dollarValue} $
                      `}
                        >
                          <span>
                          {
                              formatFees(event)
                                .toFixed(7)
                                .toString()}
                          </span>{" "}
                          <span>
                            {event.fromChain && currency[event.fromChain]}
                          </span>
                          <br />
                          <span className="text-xs">
                            ${dollarValue && dollarValue.toFixed(2)}
                          </span>
                        </span>
                      </TableData>

                      <TableData>
                        <div className="flex space-x-1 mb-1">
                          <img
                            src={
                              chains.find(
                                (chain) =>
                                  chain.name.toLowerCase() ===
                                  chainNoncetoName[
                                    event?.fromChain || 0
                                  ]?.toLowerCase()
                              )?.icon
                            }
                            alt="chainIcon"
                            className="chainIcon"
                          />
                          <span>
                            {chainNoncetoName[event?.fromChain || 0] || "N/A"}{" "}
                          </span>
                        </div>
                       <ExplorerLink hash={event.fromHash!} chain={event.fromChain!}/>
                      </TableData>
                      <TableData>
                        <div className="flex space-x-1 mb-1">
                          <img
                            src={
                              chains.find(
                                (chain) =>
                                  chain.name.toLowerCase() ===
                                  chainNoncetoName[
                                    event?.toChain || 0
                                  ]?.toLowerCase()
                              )?.icon
                            }
                            alt="chainIcon"
                            className="chainIcon"
                          />
                          <span>
                            {chainNoncetoName[event?.toChain || 0] || "N/A"}
                          </span>
                        </div>
                        {event?.status === "Completed" ? (
                          <ExplorerLink hash={event.toHash!} chain={event.toChain!}/>
                        ) : event?.status === "Pending" ? (
                          <Loader className="addressLoader" />
                        ) : (
                          <ErrorStatus />
                        )}
                      </TableData>
                      <TableData>
                        <span className="methodDataTable">
                          {event.type || "N/A"}
                        </span>
                      </TableData>
                      <TableData>
                        <span
                          className="valueData "
                          data-tip={moment(event?.createdAt).format(
                            "YYYY/MM/DD H:mm"
                          )}
                        >
                          {moment(event.createdAt)
                            .fromNow()
                            .replace("in", "")
                            .replace("a few ", "3 ")
                            .replace("few ", "")
                            .replace("an ", "1 ")
                            .replace("a ", "1 ")
                            .replace("hours ", "hrs ")
                            .replace("hour ", "hr ")
                            .replace("minutes ", "mins ")
                            .replace("minute ", "min ")
                            .replace("mutes ", "mins ")
                            .replace("mute ", "min ")
                            .replace("seconds ", "secs ")
                            .replace("second ", "sec ")}
                        </span>
                      </TableData>
                      <TableData>
                        <Status status={event.status} />
                      </TableData>
                    </tr>
                  );
                })
              ) : (
                <NoEventsRow />
              )}
            </tbody>
          </table>
        </Container>
      </div>
    </>
  );
};

export const TableHeading: FC<{ className?: string }> = ({
  children,
  className,
}) => (
  <th
    scope="col"
    className={
      "px-3 py-3 whitespace-nowrap text-left max-w-xs text-sm font-medium text-[#222222] tracking-wider " +
      className
    }
  >
    {children}
  </th>
);

export const TableData: FC<{ className?: string }> = ({
  children,
  className,
}) => (
  <td
    className={
      "px-3 py-4 min-w-[62px] border-0 whitespace-nowrap text-sm text-[#222222] " +
      className
    }
  >
    {children}
  </td>
);
