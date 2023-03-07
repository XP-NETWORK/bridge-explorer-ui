import { DetailsCard } from "./DetailsCard";
import ReactTooltip from "react-tooltip";
import CopyWithTooltip from "./CopyWithTooltop";
import { Status } from "../Status";
import moment from "moment";
import { truncate } from "./helpers";
import useIsMobile from "../../hooks/isMobile";
import { useEffect, useMemo, useState } from "react";
import { txExplorers, addressExplorers, currency, chains, chainNoncetoName } from "../../constants";
import { ethers } from "ethers";
import ClockIcon from "../../assets/icons/clock.svg";
import { getExchangeRates } from "../../getExchangeRate";
import { formatFees, extractHash } from "./helpers";

const DetailsList = ({ data, copyProps }: DetailsCard) => {
  const { loading: dataLoad, event } = data;
  const { setTooltipCopy, tooltipCopy, tooltips } = copyProps;
  const [exchangeRates, setExchangeRates] = useState<{
    [key: string]: { usd: number };
  }>({});

  const isMobile = useIsMobile();
  const truncateSize = useMemo(() => (isMobile ? 33 : 60), [isMobile]);
  const [fromIconSrc, setFromIconSrc] = useState("");
  const [toIconSrc, setToIconSrc] = useState("");

  // console.log(isMobile);
  useEffect(() => {
    const ids: string[] = chains.map(chain => chain.id);
    getExchangeRates(ids).then(rates => {
      setExchangeRates(rates);
    });
  }, []);

  const getExchangeRate = (
    rates: { [key: string]: { usd: number } },
    chainName: string
  ): number => {
    const chain = chains?.find(chain => chain?.name?.toLowerCase() === chainName?.toLowerCase());
    const rate = (chain && rates[chain.id]?.usd) || 1;

    return rate;
  };

  useEffect(() => {
    // console.log({event});
    // if(event?.fromChain ==""){
    //   setFromIconSrc("");
    // }
    // if(event?.toChain ==""){
    //   setToIconSrc("");
    // }
    chains?.map(chain => {
      if (chain?.name === chainNoncetoName[event?.fromChain || 0]) {
        if (chain?.icon[0] === ".") {
          setFromIconSrc(chain?.icon?.slice(1));
        } else {
          setFromIconSrc(chain?.icon);
        }
      }
      if (chain?.name === chainNoncetoName[event?.toChain || 0]) {
        if (chain?.icon[0] === ".") {
          setToIconSrc(chain?.icon?.slice(1));
        } else {
          setToIconSrc(chain?.icon);
        }
      }
    });
  }, [event]);

  return (
    <div className="flex flex-col w-full">
      {false && (
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
              <CopyWithTooltip copyValue={event?.fromHash} copyProps={copyProps} copyIdx={5} />
            )}
            <span className="text-[#235EF5]">
              {truncate(event?.fromHash, truncateSize) || "N/A"}
            </span>
          </p>
        </div>
      )}
      <div className="flex items-start justify-start gap-2 border-b py-4 detailsListRow">
        <div className="text-[#222222] font-medium w-32">Destination Hash:</div>
        <p
          className={`md:pl-14 break-words shrink w-[calc(100%-8rem)] md:w-fit ${
            dataLoad ? "loadingWrapper" : "loadedWrapper"
          }`}
        >
          <a
            href={`${event?.toChain && txExplorers[event?.toChain]}${
              event?.toHash && extractHash(event?.toHash)
            }`}
            target="_blank"
            rel="noreferrer"
            className={`text-[#235EF5] ${event?.toHash ? "" : "nonactive "}`}
          >
            {truncate(event?.toHash && extractHash(event?.toHash), truncateSize) || "N/A"}
          </a>
          {!dataLoad && event?.toHash && (
            <CopyWithTooltip copyValue={event?.toHash} copyProps={copyProps} copyIdx={6} />
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
          <img src={fromIconSrc} alt="chain icon" className="chainIconDetails" />
          <span className="text-[#222222]">{chainNoncetoName[event?.fromChain || 0] || "N/A"}</span>
        </p>
      </div>
      <div className={`flex items-start justify-start gap-2 border-b py-4 detailsListRow`}>
        <div className="text-[#222222] font-medium w-32">Destination Chain:</div>
        <p
          className={`md:pl-14 break-words shrink w-[calc(100%-8rem)] md:w-fit ${
            dataLoad ? "loadingWrapper" : "loadedWrapper"
          }`}
        >
          <img src={toIconSrc} alt="chain icon" className="chainIconDetails" />
          <span className="text-[#222222]">{chainNoncetoName[event?.toChain || 0] || "N/A"}</span>
        </p>
      </div>
      {event?.toChain && event?.toChain === "24" && (
        <div className="flex items-start justify-start gap-2 border-b py-4 detailsListRow">
          <div className="text-[#222222] font-medium w-32">Contract:</div>
          <p
            className={`md:pl-14 break-words shrink w-[calc(100%-8rem)] md:w-fit ${
              dataLoad ? "loadingWrapper" : "loadedWrapper"
            }`}
          >
            <span className="text-[#235EF5]">
              <a
                target="_blank"
                rel="noreferrer"
                href={`https://www.mintscan.io/secret/account/${encodeURIComponent(
                  event?.senderAddress
                )}`}
              >
                {truncate(event?.contract, truncateSize) || "N/A"}
              </a>
            </span>
            {!dataLoad && (
              <CopyWithTooltip copyValue={event?.senderAddress} copyProps={copyProps} copyIdx={7} />
            )}
          </p>
        </div>
      )}
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
              href={`${event?.fromChain && addressExplorers[event?.fromChain]}${encodeURIComponent(
                event?.senderAddress
              )}`}
            >
              {truncate(event?.senderAddress, truncateSize) || "N/A"}
            </a>
          </span>
          {!dataLoad && (
            <CopyWithTooltip copyValue={event?.senderAddress} copyProps={copyProps} copyIdx={7} />
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
            href={`${event?.toChain && addressExplorers[event?.toChain]}${encodeURIComponent(
              event?.targetAddress ? event?.targetAddress : ""
            )}`}
          >
            <span className="text-[#235EF5]">
              {truncate(event?.targetAddress, truncateSize) || "N/A"}
            </span>
          </a>
          {!dataLoad && (
            <CopyWithTooltip copyValue={event?.targetAddress} copyProps={copyProps} copyIdx={8} />
          )}
        </p>
      </div>
      <div className="flex items-start justify-start gap-2 border-b py-4 detailsListRow">
        <div className="text-[#222222] font-medium w-32">Date:</div>
        <p className={`md:pl-14  md:w-fit ${dataLoad ? "loadingWrapper" : "loadedWrapper"}`}>
          <span className="mr-1">
            <img src={ClockIcon} alt="clock icon" style={{ filter: "brightness(35%)" }} />
          </span>
          <span className="text-[#222222]">{`${moment(event?.createdAt)
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
            .replace("second ", "sec ")} (${new Date(event?.createdAt).toUTCString()})`}</span>
        </p>
      </div>
      <div className="flex items-start justify-start gap-2 border-b py-4 detailsListRow">
        <div className="text-[#222222] font-medium w-32">Transaction Fee:</div>
        <p className={`md:pl-14  md:w-fit ${dataLoad ? "loadingWrapper" : "loadedWrapper"}`}>
          <span className="text-[#222222]">
            {event?.txFees && formatFees(event)} {event?.fromChain && currency[event?.fromChain]} ($
            {event?.fromChain &&
              (getExchangeRate(exchangeRates, event?.chainName) * formatFees(event))?.toFixed(2)}
            )
          </span>
        </p>
      </div>
      {event?.sftAmount && (
        <div className="flex items-start justify-start gap-2 border-b py-4 detailsListRow">
          <div className="text-[#222222] font-medium w-32">Amount:</div>
          <p className={`md:pl-14  md:w-fit ${dataLoad ? "loadingWrapper" : "loadedWrapper"}`}>
            <span className="text-[#222222]">{event?.sftAmount}</span>
          </p>
        </div>
      )}

      <div className="flex items-start justify-start gap-2 border-b py-4 detailsListRow">
        <div className="text-[#222222] font-medium w-32">Status:</div>
        <div
          className={`md:pl-14 break-words shrink w-[calc(100%-8rem)] md:w-fit statusBar${
            dataLoad ? "loadingWrapper" : "loadedWrapper"
          }`}
        >
          <Status status={event?.status} />
        </div>
      </div>
    </div>
  );
};

export default DetailsList;
