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
    <Container className="p-0">
      <div className="mt-10 bg-white rounded-2xl md:p-8 p-4 shadow-[0_0px_10px_0px_rgba(0,0,0,0.2)] text-sm">
        <div className="text-[#222222] sm:border p-1 sm:p-5 md:p-6 rounded-xl">
          <h1 className="text-base font-medium">Send Item {metadata?.name}</h1>
          <hr className="mb-5 mt-3" />
          <div className="flex flex-col sm:flex-row gap-4">
            <img
              className="rounded-lg"
              src={
                metadata?.image ||
                "https://via.placeholder.com/100?text=No+Image"
              }
              width="128"
              height="128"
              alt="nft preview"
            />
            <div className="flex flex-col w-full md:p-5 gap-4">
              <div className="grid grid-cols-12 gap-4 md:gap-0">
                <div className="col-span-3 font-medium">NFT Name:</div>
                <p className="col-span-9">{metadata?.name || "N/A"}</p>
              </div>
              <div className="grid grid-cols-12 gap-4 md:gap-0">
                <div className="col-span-3 font-medium">ID:</div>
                <div className="col-span-9">{metadata?.id || "N/A"}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto mt-5">
          <table className="min-w-full border-b">
            <tbody className="bg-white divide-y">
              <tr>
                <TableData className="font-medium">Source Hash:</TableData>
                <TableData className="text-[#235EF5]">
                  {event?.fromHash || "N/A"}
                </TableData>
              </tr>
              <tr>
                <TableData className="font-medium">Destination Hash:</TableData>
                <TableData className="text-[#235EF5]">
                  {event?.toHash || "N/A"}
                </TableData>
              </tr>
              <tr>
                <TableData className="font-medium">Source Chain:</TableData>
                <TableData>{event?.fromChain || "N/A"}</TableData>
              </tr>
              <tr>
                <TableData className="font-medium">
                  Destination Chain:
                </TableData>
                <TableData>{event?.toChain || "N/A"}</TableData>
              </tr>
              <tr>
                <TableData className="font-medium">From:</TableData>
                <TableData className="text-[#235EF5]">
                  {event?.senderAddress || "N/A"}
                </TableData>
              </tr>
              <tr>
                <TableData className="font-medium">To:</TableData>
                <TableData className="text-[#235EF5]">
                  {event?.targetAddress || "N/A"}
                </TableData>
              </tr>
              <tr>
                <TableData className="font-medium">Date:</TableData>
                <TableData>
                  {new Date(event?.createdAt!).toLocaleString() ?? "N/A"}
                </TableData>
              </tr>
              <tr>
                <TableData className="font-medium pt-10">Status:</TableData>
                <TableData>
                  <div className="pt-7"></div>
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

const TableData: FC<{ className?: string }> = ({ children, className }) => (
  <td
    className={
      "px-3 py-4 whitespace-nowrap overflow-hidden text-sm " + className
    }
  >
    {children}
  </td>
);
