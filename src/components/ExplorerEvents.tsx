import { FC, useEffect, useState } from "react";
import { Container } from "./Container";

export interface IEvent {
  id: string;
  chainName: string;
  type: "Transfer" | "Unfreeze";
  fromChain?: string;
  toChain: string;
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
  const [events, setEvents] = useState<IEvent[]>([]);

  useEffect(() => {
    events.forEach((event) => {
      if (event.nftUri) {
        fetch(event.nftUri)
          .then((res) => res.json())
          .then((metadata) => {
            setEvents((_events) => [
              { imgUri: metadata.image, ...event },
              ..._events,
            ]);
          });
      }
    });
    console.log(events);
  }, []);

  useEffect(() => {
    fetch("https://dev-explorer-api.herokuapp.com/")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
      });
  }, []);

  return (
    <Container className="mt-5 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <TableHeading>#</TableHeading>
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
            events.map((event, index) => (
              <tr key={event.id}>
                <TableData>{index}</TableData>
                <TableData>
                  <img
                    className="rounded-lg"
                    src={event?.nftUri || "https://via.placeholder.com/50"}
                    alt=""
                  />
                  {console.log(event.nftUri)}
                </TableData>
                <TableData>{event.fromHash || "N/A"}</TableData>
                <TableData>{event.type || "N/A"}</TableData>
                <TableData>{event.fromChain || "N/A"}</TableData>
                <TableData>{event.toChain || "N/A"}</TableData>
                <TableData>
                  {new Date(event.createdAt).toLocaleDateString() || "N/A"}
                </TableData>
                <TableData>{event.status || "N/A"}</TableData>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={8}
                className="px-3 py-6 text-center w-full text-xs font-medium text-gray-800"
              >
                No Events Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Container>
  );
};

const TableHeading: FC = ({ children }) => (
  <th
    scope="col"
    className="px-3 py-3 text-left text-xs font-medium text-gray-800 tracking-wider"
  >
    {children}
  </th>
);

const TableData: FC = ({ children }) => (
  <td className="px-3 py-4 whitespace-nowrap max-w-sm text-ellipsis overflow-hidden text-sm text-gray-500">
    {children}
  </td>
);
