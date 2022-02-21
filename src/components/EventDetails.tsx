import { Container } from "./Container";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IEvent } from "./ExplorerEvents";
import { Status } from "./Status";
import CopyIcon from "../assets/icons/copy.svg";
import ClipboardJS from "clipboard";
import moment from "moment";

export const EventDetails = () => {
  let params = useParams();
  const [event, setEvent] = useState<IEvent>();
  const [metadata, setMetadata] = useState<any>();

  useEffect(() => {
    new ClipboardJS(".copy-btn");

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
              className="rounded-lg sm:w-32 sm:h-32"
              src={
                metadata?.image ||
                "https://via.placeholder.com/100?text=No+Image"
              }
              alt="nft preview"
            />
            <div className="flex flex-col gap-3 md:p-5 w-full">
              <div className="flex w-full">
                <div className="font-medium w-32">NFT Name:</div>
                <p
                  className="break-words w-[calc(100%-8rem)] md:w-fit"
                  // style={{ width: "calc(100% - 8rem)" }}
                >
                  {metadata?.name || "N/A"}
                </p>
              </div>
              <div className="flex w-full">
                <div className="font-medium w-32">ID:</div>
                <p
                  className="break-words w-[calc(100%-8rem)] md:w-fit"
                  // style={{ width: "calc(100% - 8rem)" }}
                >
                  {metadata?.id || "N/A"}
                </p>
              </div>
              <div className="flex items-start justify-start">
                <div className="font-medium w-32">Transaction Hash:</div>
                <p className="break-words shrink w-[calc(100%-8rem)] md:w-fit">
                  <span className="text-[#235EF5]">
                    {event?.fromHash || "N/A"}
                  </span>
                </p>
                <button
                  className="copy-btn"
                  data-clipboard-text={event?.toHash}
                >
                  <img src={CopyIcon} alt="copy button" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full">
          <div className="flex items-start justify-start gap-2 border-b py-4">
            <div className="font-medium w-32">Source Hash:</div>
            <p
              // style={{ width: "calc(100% - 6rem)" }}
              className="md:pl-14 break-words shrink w-[calc(100%-8rem)] md:w-fit"
            >
              <span className="text-[#235EF5]">{event?.fromHash || "N/A"}</span>
            </p>
            <button className="copy-btn" data-clipboard-text={event?.fromHash}>
              <img src={CopyIcon} alt="copy button" />
            </button>
          </div>
          <div className="flex items-start justify-start gap-2 border-b py-4">
            <div className="font-medium w-32">Dest Hash:</div>
            <p className="md:pl-14 break-words shrink w-[calc(100%-8rem)] md:w-fit">
              <span className="text-[#235EF5]">{event?.toHash || "N/A"}</span>
            </p>
            <button className="copy-btn" data-clipboard-text={event?.toHash}>
              <img src={CopyIcon} alt="copy button" />
            </button>
          </div>
          <div className="flex items-start justify-start gap-2 border-b py-4">
            <div className="font-medium w-32">Source Chain:</div>
            <p className="md:pl-14 break-words shrink w-[calc(100%-8rem)] md:w-fit">
              <span>{event?.fromChainName || "N/A"}</span>
            </p>
          </div>
          <div className="flex items-start justify-start gap-2 border-b py-4">
            <div className="font-medium w-32">Dest Chain:</div>
            <p className="md:pl-14 break-words shrink w-[calc(100%-8rem)] md:w-fit">
              <span>{event?.toChainName || "N/A"}</span>
            </p>
          </div>
          <div className="flex items-start justify-start gap-2 border-b py-4">
            <div className="font-medium w-32">From:</div>
            <p className="md:pl-14 break-words shrink w-[calc(100%-8rem)] md:w-fit">
              <span className="text-[#235EF5]">
                {event?.senderAddress || "N/A"}
              </span>
            </p>
            <button
              className="copy-btn"
              data-clipboard-text={event?.senderAddress}
            >
              <img src={CopyIcon} alt="copy button" />
            </button>
          </div>
          <div className="flex items-start justify-start gap-2 border-b py-4">
            <div className="font-medium w-32">To:</div>
            <p className="md:pl-14 break-words shrink w-[calc(100%-8rem)] md:w-fit">
              <span className="text-[#235EF5]">
                {event?.targetAddress || "N/A"}
              </span>
            </p>
            <button
              className="copy-btn"
              data-clipboard-text={event?.targetAddress}
            >
              <img src={CopyIcon} alt="copy button" />
            </button>
          </div>
          <div className="flex items-start justify-start gap-2 border-b py-4">
            <div className="font-medium w-32">Date:</div>
            <p className="md:pl-14 break-words shrink w-[calc(100%-8rem)] md:w-fit">
              <span>
                {moment(event?.createdAt).format("YYYY/MM/DD H:mm") ?? "N/A"}
              </span>
            </p>
          </div>
          <div className="flex items-start justify-start gap-2 border-b py-4 md:mt-10">
            <div className="font-medium w-32">Status:</div>
            <p className="md:pl-14 break-words shrink w-[calc(100%-8rem)] md:w-fit">
              <Status status={event?.status} />
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};
