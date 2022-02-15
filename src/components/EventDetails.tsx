import { Container } from "./Container";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IEvent } from "./ExplorerEvents";
import { Status } from "./Status";

export const EventDetails = () => {
  let params = useParams();
  const [event, setEvent] = useState<IEvent>();
  const [metadata, setMetadata] = useState<any>();

  useEffect(() => {
    console.log(params.fromHash);
    fetch(`https://dev-explorer-api.herokuapp.com/?fromHash=${params.fromHash}`)
      .then((res) => res.json())
      .then((data) => {
        setEvent(data[0]);
        console.log(data[0]);
      });
  }, []);

  // TODO: fetch metadata from nftUri
  useEffect(() => {
    fetch(event?.nftUri!)
      .then((res) => res.json())
      .then((metadata) => {
        setMetadata(metadata);

        console.log(metadata);
      });
  }, [event]);

  return (
    <Container>
      <div className="mt-10 bg-white rounded-2xl p-8">
        <div className="flex flex-col sm:flex-row gap-4 border p-5 md:p-10 rounded-xl">
          <img
            className="rounded-lg "
            src={
              metadata?.image || "https://via.placeholder.com/100?text=No+Image"
            }
            width="100"
            height={100}
            alt="nft preview"
          />
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-x-4">
              <div>NFT name:</div>
              <div>{metadata?.name || "N/A"}</div>
            </div>
            <div className="grid grid-cols-2 gap-x-4">
              <div>ID:</div>
              {/* TODO: Change to ID */}
              <div>{metadata?.id || "N/A"}</div>
            </div>
          </div>
        </div>
        <div className="my-5">
          <h1 className="text-2xl font-bold mb-5">{metadata?.name}</h1>
          <h1 className="text-gray-700">{metadata?.description}</h1>
          <h1 className="text-gray-700">{metadata?.description}</h1>
        </div>
        <div className="overflow-x-auto mt-5">
          <table className="min-w-full divide-y divide-gray-200">
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <TableData>Source Hash</TableData>
                <TableData>{event?.fromHash || "N/A"}</TableData>
              </tr>
              <tr>
                <TableData>Destination Hash</TableData>
                <TableData>{event?.toHash || "N/A"}</TableData>
              </tr>
              <tr>
                <TableData>Source Chain</TableData>
                <TableData>{event?.fromChain || "N/A"}</TableData>
              </tr>
              <tr>
                <TableData>Destination Chain</TableData>
                <TableData>{event?.toChain || "N/A"}</TableData>
              </tr>
              <tr>
                <TableData>From</TableData>
                <TableData>{event?.senderAddress || "N/A"}</TableData>
              </tr>
              <tr>
                <TableData>To</TableData>
                <TableData>{event?.targetAddress || "N/A"}</TableData>
              </tr>
              <tr>
                <TableData>Date</TableData>
                <TableData>{event?.createdAt || "N/A"}</TableData>
              </tr>
              <tr>
                <TableData>Status</TableData>
                <TableData>
                  <Status status={event?.status} />
                </TableData>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
};

const TableData: FC = ({ children }) => (
  <td className="px-3 py-4 whitespace-nowrap overflow-hidden text-sm text-gray-500">
    {children}
  </td>
);
