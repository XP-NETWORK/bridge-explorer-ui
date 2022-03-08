import {
  FC,
  ReactNode,
  useEffect,
  useState,
  useRef,
  MutableRefObject,
} from "react";
import { Link } from "react-router-dom";
import { Container } from "./Container";
import { useContext } from "react";
import { EventsContext } from "../context/Events";
import { Status } from "./Status";
import ImgBroken from "../assets/img-broken.png";
import { LoaderRow } from "./elements/LoaderRow";
import { ethers } from "ethers";
import { currency } from "../constants";
import ReactTooltip from "react-tooltip";
import moment from "moment";
import scrollUp from "../assets/img/collapse.svg";

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
}

export const ExplorerEvents: FC<{ status?: string }> = ({ status = "" }) => {
  const eventsContext = useContext(EventsContext);

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
        <table className="min-w-full divide-y border-b divide-gray-200 eventsTable">
          <thead className="bg-gray-50 ">
            <tr>
              <TableHeading>NFT</TableHeading>
              <TableHeading>Tx Value</TableHeading>
              {false && <TableHeading>Tx Hash</TableHeading>}
              <TableHeading>Coin</TableHeading>
              <TableHeading>Tx Type</TableHeading>
              <TableHeading>From</TableHeading>
              <TableHeading>To</TableHeading>
              <TableHeading>Date</TableHeading>
              <TableHeading>Status</TableHeading>
            </tr>
          </thead>
          <tbody className="bg-white divide-y  divide-gray-200 overflow-x-scroll">
            {eventsContext?.events.length ? (
              eventsContext?.events.map((event: IEvent) => (
                <tr key={event.id}>
                  <TableData className="sticky left-0 text-center max-w-[62px] bg-white imgTableData">
                    <ReactTooltip effect="solid" backgroundColor="#575151" />
                    {event?.status === "Completed" || event?.imgUri ? (
                      <img
                        className="rounded-lg"
                        src={event?.imgUri || ImgBroken}
                        alt=""
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
                      className="valueData"
                      data-tip={ethers.utils.formatEther(event.txFees)}
                    >
                      {Number(ethers.utils.formatEther(event.txFees))
                        .toFixed(7)
                        .toString()}
                    </span>
                  </TableData>

                  <TableData>
                    {event.fromChain && currency[event.fromChain]}
                  </TableData>

                  {false && (
                    <TableData>
                      <Link
                        className="text-[#235EF5]"
                        key={event.id}
                        to={`/tx/${event.fromHash}`}
                      >
                        {event.fromHash.slice(0, 6)}...
                        {event.fromHash.slice(-6)}
                      </Link>
                    </TableData>
                  )}

                  <TableData>
                    <span className="methodDataTable">
                      {event.type || "N/A"}
                    </span>
                  </TableData>
                  <TableData>
                    <div>{event.fromChainName || "N/A"} </div>{" "}
                    <Link
                      className="text-[#235EF5]"
                      key={event.id}
                      to={`/tx/${event.fromHash}`}
                    >
                      {event.fromHash.slice(0, 6)}...
                      {event.fromHash.slice(-6)}
                    </Link>
                  </TableData>
                  <TableData>
                    <div>{event.toChainName || "N/A"}</div>
                    <Link
                      className="text-[#235EF5]"
                      key={event.id}
                      to={`/tx/${event.fromHash}`}
                    >
                      {event?.toHash?.slice(0, 6)}...
                      {event?.toHash?.slice(-6)}
                    </Link>
                  </TableData>
                  <TableData>
                    {moment(event?.createdAt).format("YYYY/MM/DD H:mm") ||
                      "N/A"}
                  </TableData>
                  <TableData>
                    <Status status={event.status} />
                  </TableData>
                </tr>
              ))
            ) : (
              <LoaderRow />
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
