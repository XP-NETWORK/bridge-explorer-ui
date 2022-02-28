import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "./Container";
import { useContext } from "react";
import { EventsContext } from "../context/Events";
import { Status } from "./Status";
import ImgBroken from "../assets/img-broken.png";

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
  status: "pending" | "success";
  fromHash: string;
  toHash?: string;
  senderAddress: string;
  targetAddress?: string;
  createdAt: Date;
  nftUri: string;
  imgUri?: string;
}

export const ExplorerEvents = () => {
  // @ts-ignore
  const { events } = useContext(EventsContext);

  useEffect(() => {
    console.log(events);
  }, [events]);

  return (
    <Container className="mt-5 px-0 sm:px-4 overflow-x-auto">
      <table className="min-w-full divide-y border-b divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <TableHeading className="sticky left-0 bg-[#F7F7F9]">
              NFT
            </TableHeading>
            <TableHeading>Tx Hash</TableHeading>
            <TableHeading>Tx Type</TableHeading>
            <TableHeading>From</TableHeading>
            <TableHeading>To</TableHeading>
            <TableHeading>Date</TableHeading>
            <TableHeading>Status</TableHeading>
          </tr>
        </thead>
        <tbody className="bg-white divide-y  divide-gray-200 overflow-x-scroll">
          {events.length ? (
            events.map((event: IEvent) => (
              <tr key={event.id}>
                <TableData className="sticky left-0 text-center max-w-[62px] bg-white">
                  <img
                    className="rounded-lg"
                    src={event?.imgUri || ImgBroken}
                    alt=""
                    width={38}
                    height={38}
                  />
                </TableData>
                <TableData className="">
                  <Link
                    className="text-[#235EF5]"
                    key={event.id}
                    to={`/tx/${event.fromHash}`}
                  >
                    {event.fromHash.slice(0, 6)}...
                    {event.fromHash.slice(-6)}
                  </Link>
                </TableData>
                <TableData>{event.type || "N/A"}</TableData>
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
                  {new Date(event.createdAt).toLocaleDateString() || "N/A"}
                </TableData>
                <TableData>
                  <Status status={event.status} />
                </TableData>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={8}
                className="px-3 py-6 w-full text-xs font-medium text-gray-800"
              >
                <div className="flex justify-center">
                  <svg
                    className=" animate-spin -ml-1 mr-3 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Container>
  );
};

const TableHeading: FC<{ className?: string }> = ({ children, className }) => (
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

const TableData: FC<{ className?: string }> = ({ children, className }) => (
  <td
    className={
      "px-3 py-4 min-w-[62px] border-0 whitespace-nowrap text-sm text-[#222222] " +
      className
    }
  >
    {children}
  </td>
);
