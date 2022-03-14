import { FC, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Container } from "./Container";
import { useContext } from "react";
import { EventsContext } from "../context/Events";
import { Status } from "./Status";
import ImgBroken from "../assets/img-broken.png";
import { LoaderRow } from "./elements/LoaderRow";
import { ethers } from "ethers";
import { currency, chains, chainNoncetoName } from "../constants";
import ReactTooltip from "react-tooltip";
import moment from "moment";
import scrollUp from "../assets/img/collapse.svg";
import { NoEventsRow } from "./elements/NoEventsRow";
import { ImgOrFail } from "./elements/ImgOrFail";
import { getExchangeRates } from "../getExchangeRate";
import sortIcon from "../assets/img/sort.svg";
import { truncate } from "./Details/helpers";

import { Paginator } from "./elements/Paginator";
import { ErrorStatus } from "./elements/ErrorStatus";

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
  status: "Completed" | "Pending";
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

  useEffect(() => {
    console.log(eventsContext?.isLoading, "isLoading");
  }, [eventsContext?.isLoading]);

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
      <Container className="mt-5 px-0 sm:px-4 overflow-x-auto tableWrapper">
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
        <Paginator />
        <table className="min-w-full divide-y border-b divide-gray-200 eventsTable">
          <thead className="bg-gray-50 ">
            <tr>
              <TableHeading>NFT</TableHeading>
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
          <tbody className="bg-white divide-y  divide-gray-200 overflow-x-scroll">
            {eventsContext?.isLoading ? (
              <LoaderRow />
            ) : // if events length is 0 after 2 seconds, show loader
            eventsContext?.events.length ? (
              eventsContext?.events.map((event: IEvent) => (
                <tr key={event.id} /*onClick={() => window.open(`/tx/${event.fromHash}`, '_self')}*/>
                  <TableData className="sticky left-0 text-center max-w-[62px] bg-white imgTableData">
                    <ReactTooltip effect="solid" className="copyTip" />
                    {event?.status === "Completed" || event?.imgUri ? (
                      <ImgOrFail
                        className="rounded-lg"
                        src={event?.imgUri || ImgBroken}
                        width={38}
                        height={38}
                      />
                    ) : (
                      <div className="lds-ellipsis">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                    )}
                  </TableData>

                  <TableData>
                    <span
                      className=""
                      data-tip={
                        !isNaN(+event.txFees) &&
                        ethers.utils.formatEther(event.txFees)
                      }
                    >
                      <span>
                        {!isNaN(+event.txFees) &&
                          Number(ethers.utils.formatEther(event.txFees))
                            .toFixed(7)
                            .toString()}
                      </span>{" "}
                      <span>
                        {event.fromChain && currency[event.fromChain]}
                      </span>
                      <br />
                      <span>
                        $
                        {!isNaN(+event.txFees) &&
                          (
                            getExchangeRate(exchangeRates, event.chainName) *
                            Number(ethers.utils.formatEther(event.txFees))
                          ).toFixed(2)}
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
                        alt=""
                      />
                      <span>
                        {chainNoncetoName[event?.fromChain || 0] || "N/A"}{" "}
                      </span>
                    </div>
                    <Link
                      className="text-[#235EF5]"
                      key={event.id}
                      to={`/tx/${event.fromHash}`}
                    >
                      {truncate(event.fromHash, 15)}
                    </Link>
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
                        alt=""
                      />
                      <span>
                        {chainNoncetoName[event?.toChain || 0] || "N/A"}
                      </span>
                    </div>
                    <Link
                      className="text-[#235EF5]"
                      key={event.id}
                      to={`/tx/${event.fromHash}`}
                    >
                      {truncate(event.toHash, 15) || <ErrorStatus />}
                    </Link>
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
                      {moment(event?.createdAt)
                        .fromNow()
                        .replace("a ", "1 ")
                        .replace("an ", "1 ")
                        .replace("hour ", "hr ")
                        .replace("few ", "")
                        .replace("hours", "hrs ")
                        .replace("minute ", "min ")
                        .replace("minutes", "mins")
                        .replace("second ", "sec ")
                        .replace("seconds ", "sec ") || "N/A"}
                    </span>
                  </TableData>
                  <TableData>
                    <Status status={event.status} />
                  </TableData>
                </tr>
              ))
            ) : (
              <NoEventsRow />
            )}
          </tbody>
        </table>
      </Container>
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
      "px-3 py-3 text-left max-w-xs text-sm font-medium text-[#222222] tracking-wider " +
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
