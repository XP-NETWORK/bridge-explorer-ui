import { FC, ReactNode, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "./Container";
import { useContext } from "react";
import { EventsContext } from "../context/Events";
import { Status } from "./Status";
import { LoaderRow } from "./elements/LoaderRow";


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
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <TableHeading>NFT</TableHeading>
            <TableHeading>Tx Hash</TableHeading>
            <TableHeading>Tx Type</TableHeading>
            <TableHeading>From</TableHeading>
            <TableHeading>To</TableHeading>
            <TableHeading>Date</TableHeading>
            <TableHeading>Status</TableHeading>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {events.length ? (
            events.map((event: IEvent) => (
              <tr key={event.id}>
                <TableData>
                  { event?.imgUri ? 
                  <img
                    className="rounded-lg"
                    src={
                      event?.imgUri ||
                      event?.nftUri ||
                      "https://via.placeholder.com/50"
                    }
                    alt=""
                    width={38}
                    height={38}
                  />:  <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>}

                </TableData>
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
            <LoaderRow/>
          )}
        </tbody>
      </table>
    </Container>
  );
};

export const TableHeading: FC = ({ children }) => (
  <th
    scope="col"
    className="px-3 py-3 text-left max-w-xs text-sm font-medium text-[#222222] tracking-wider"
  >
    {children}
  </th>
);

export const TableData: FC<any> = ({ className, children }: {
  className: string;
  children: ReactNode
}) => (
  <td className={`px-3 py-4 whitespace-nowrap text-sm text-[#222222] ${className? className : ''}`}>
    {children}
  </td>
);
