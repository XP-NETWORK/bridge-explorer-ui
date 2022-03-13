import { DetailsCard } from "./DetailsCard";
import ReactTooltip from "react-tooltip";
import CopyWithTooltip from "./CopyWithTooltop";
import { Status } from "../Status";
import moment from "moment";
import { truncate } from "./helpers";
import useIsMobile from "../../hooks/isMobile";
import { useEffect, useMemo, useState } from "react";
import {
  txExplorers,
  addressExplorers,
  currency,
  chains,
} from "../../constants";
import { ethers } from "ethers";
import ClockIcon from "../../assets/icons/clock.svg";
import { getExchangeRates } from "../../getExchangeRate";

const DetailsList = ({ data, copyProps }: DetailsCard) => {
  const { loading: dataLoad, event } = data;
  const { setTooltipCopy, tooltipCopy, tooltips } = copyProps;
  const [exchangeRates, setExchangeRates] = useState<{
    [key: string]: { usd: number };
  }>({});

  const isMobile = useIsMobile();
  const truncateSize = useMemo(() => (isMobile ? 33 : 60), [isMobile]);

  console.log(isMobile);
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
    const chain = chains.find((chain) => chain.name === chainName);
    const rate = (chain && rates[chain.id].usd) || 1;

    return rate;
  };

  return (
    <div className="flex flex-col w-full">
      <div
        className="flex items-start justify-start gap-2 border-b py-4 detailsListRow"
        style={{ display: "none" }}
      >
        <div className="text-[#222222] font-medium w-32">Source Hash:</div>
        <p
          // style={{ width: "calc(100% - 6rem)" }}
          className={`md:pl-14 break-words  md:w-fit  ${
            dataLoad ? "loadingWrapper" : "loadedWrapper"
          }`}
        >
          <ReactTooltip
            effect="solid"
            className={`${tooltipCopy ? "copyTip copied" : "copyTip"}`}
          />
          {!dataLoad && (
            <CopyWithTooltip
              copyValue={event?.fromHash}
              copyProps={copyProps}
              copyIdx={5}
            />
          )}
          <span className="text-[#235EF5]">
            {truncate(event?.fromHash, truncateSize) || "N/A"}
          </span>
        </p>
      </div>

      <div className="flex items-start justify-start gap-2 border-b py-4 detailsListRow">
        <div className="text-[#222222] font-medium w-32">Destination Hash:</div>
        <p
          className={`md:pl-14 break-words shrink w-[calc(100%-8rem)] md:w-fit ${
            dataLoad ? "loadingWrapper" : "loadedWrapper"
          }`}
        >
          <a
            href={`${event?.toChain && txExplorers[event?.toChain]}${
              event?.toHash
            }`}
            target="_blank"
            rel="noreferrer"
            className={`text-[#235EF5] ${event?.toHash ? "" : "nonactive "}`}
          >
            {truncate(event?.toHash, truncateSize) || "N/A"}
          </a>
          {!dataLoad && event?.toHash && (
            <CopyWithTooltip
              copyValue={event?.toHash}
              copyProps={copyProps}
              copyIdx={6}
            />
          )}
        </p>
      </div>
      <div className="flex items-start justify-start gap-2 border-b py-4 detailsListRow">
        <div className="text-[#222222] font-medium w-32">Departure Chain:</div>
        <p
          className={`md:pl-14 break-words shrink w-[calc(100%-8rem)] md:w-fit ${
            dataLoad ? "loadingWrapper" : "loadedWrapper"
          }`}
        >
          <span className="text-[#222222]">
            {event?.fromChainName || "N/A"}
          </span>
        </p>
      </div>
      <div
        className={`flex items-start justify-start gap-2 border-b py-4 detailsListRow`}
      >
        <div className="text-[#222222] font-medium w-32">
          Destination Chain:
        </div>
        <p
          className={`md:pl-14 break-words shrink w-[calc(100%-8rem)] md:w-fit ${
            dataLoad ? "loadingWrapper" : "loadedWrapper"
          }`}
        >
          <span className="text-[#222222]">{event?.toChainName || "N/A"}</span>
        </p>
      </div>
      <div className="flex items-start justify-start gap-2 border-b py-4 detailsListRow">
        <div className="text-[#222222] font-medium w-32">From:</div>

        <p
          className={`md:pl-14 break-words shrink w-[calc(100%-8rem)] md:w-fit ${
            dataLoad ? "loadingWrapper" : "loadedWrapper"
          }`}
        >
          <span className="text-[#235EF5]">
            <a
              target="_blank"
              rel="noreferrer"
              href={`${event?.fromChain && addressExplorers[event?.fromChain]}${
                event?.senderAddress
              }`}
            >
              {truncate(event?.senderAddress, truncateSize) || "N/A"}
            </a>
          </span>
          {!dataLoad && (
            <CopyWithTooltip
              copyValue={event?.senderAddress}
              copyProps={copyProps}
              copyIdx={7}
            />
          )}
        </p>
      </div>
      <div className="flex items-start justify-start gap-2 border-b py-4 detailsListRow">
        <div className="text-[#222222] font-medium w-32">To:</div>
        <p
          className={`md:pl-14 break-words shrink w-[calc(100%-8rem)] md:w-fit ${
            dataLoad ? "loadingWrapper" : "loadedWrapper"
          }`}
        >
          <a
            target="_blank"
            rel="noreferrer"
            href={`${event?.toChain && addressExplorers[event?.toChain]}${
              event?.targetAddress
            }`}
          >
            <span className="text-[#235EF5]">
              {truncate(event?.targetAddress, truncateSize) || "N/A"}
            </span>
          </a>
          {!dataLoad && (
            <CopyWithTooltip
              copyValue={event?.targetAddress}
              copyProps={copyProps}
              copyIdx={8}
            />
          )}
        </p>
      </div>
      <div className="flex items-start justify-start gap-2 border-b py-4 detailsListRow">
        <div className="text-[#222222] font-medium w-32">Date:</div>
        <p
          className={`md:pl-14 break-words shrink w-[calc(100%-8rem)] md:w-fit ${
            dataLoad ? "loadingWrapper" : "loadedWrapper"
          }`}
        >
          <span className="mr-1">
            <img src={ClockIcon} alt="clock icon" />
          </span>
          <span className="text-[#222222]">{`${moment(event?.createdAt)
            .fromNow()
            .replace("a ", "1 ")
            .replace("an ", "1 ")
            .replace("hour ", "hr ")
            .replace("hours", "hrs")
            .replace("minute ", "min ")
            .replace("second ", "sec ")
            .replace("seconds ", "secs ")} (${new Date(
            event?.createdAt
          ).toUTCString()})`}</span>
        </p>
      </div>
      <div className="flex items-start justify-start gap-2 border-b py-4 detailsListRow">
        <div className="text-[#222222] font-medium w-32">Transaction Fee:</div>
        <p
          className={`md:pl-14 break-words shrink w-[calc(100%-8rem)] md:w-fit ${
            dataLoad ? "loadingWrapper" : "loadedWrapper"
          }`}
        >
          <span className="text-[#222222]">
            {event?.txFees && Number(ethers.utils.formatEther(event.txFees))}{" "}
            {event?.fromChain && currency[event.fromChain]} ($
            {event?.fromChain &&
              (
                getExchangeRate(exchangeRates, event.chainName) *
                Number(ethers.utils.formatEther(event.txFees))
              ).toFixed(2)}
            )
          </span>
        </p>
      </div>

      <div className="flex items-start justify-start gap-2 border-b py-4 detailsListRow">
        <div className="text-[#222222] font-medium w-32">Status:</div>
        <p
          className={`md:pl-14 break-words shrink w-[calc(100%-8rem)] md:w-fit ${
            dataLoad ? "loadingWrapper" : "loadedWrapper"
          }`}
        >
          <Status status={event?.status} />
        </p>
      </div>
    </div>
  );
};

export default DetailsList;
