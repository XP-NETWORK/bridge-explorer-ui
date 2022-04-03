import { FC, useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import BigNumber from "bignumber.js";
import { Paginator } from "./elements/Paginator";
import { ErrorStatus } from "./elements/ErrorStatus";
import { Loader } from "./elements/Loader";

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
  status: "Completed" | "Pending" | "Error";
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
  const navigate = useNavigate();
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
      <div>
        <Container>
          <Paginator />
        </Container>
        <Container className="mt-5 px-0 md:px-4 overflow-x-auto tableWrapper">
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

          <table className="min-w-full divide-y border-b eventsTable">
            <thead className="bg-gray-50 ">
              <tr>
                <TableHeading className="sticky left-0 bg-gray-50 ">
                  NFT
                </TableHeading>
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
            <tbody className=" divide-y   overflow-x-scroll">
              {eventsContext?.isLoading ? (
                <LoaderRow />
              ) : // if events length is 0 after 2 seconds, show loader
              eventsContext?.events.length ? (
                eventsContext?.events.map((event: IEvent) => {
                  const dollarValue =
                    !isNaN(+event.txFees) &&
                    getExchangeRate(exchangeRates, event.chainName) *
                      Number(ethers.utils.formatEther(event.txFees));

                  return (
                    <tr
                      key={event.id}
                      onClick={() => navigate(`/tx/${event.fromHash}`)}
                      className="bg-white group hover:bg-transparent"
                    >
                      <TableData
                        className={`sticky left-0 text-center bg-white group-hover:bg-[#F7F7F9] imgTableData ${
                          /^((?!chrome|android).)*safari/i.test(
                            navigator.userAgent
                          )
                            ? "safariHack"
                            : "sitckyBottomLine"
                        }`}
                      >
                        <ReactTooltip
                          effect="solid"
                          className="copyTip"
                          multiline
                        />
                        {event?.status === "Completed" || event?.imgUri ? (
                          <ImgOrFail
                            className="rounded-lg"
                            src={event?.imgUri || ImgBroken}
                            width={38}
                            height={38}
                          />
                        ) : (
                          <Loader />
                        )}
                      </TableData>

                      <TableData>
                        <span
                          className="cursor-default"
                          data-tip={`
                        ${
                          !isNaN(+event.txFees) &&
                          ethers.utils.formatEther(event.txFees)
                        } ${event.fromChain && currency[event.fromChain]} <br>
                          ${dollarValue} $
                      `}
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
                          <span className="text-xs">
                            ${dollarValue && dollarValue.toFixed(2)}
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
                          className="text-[#235EF5] text-xs"
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
                        {event?.status === "Completed" ? (
                          <Link
                            className="text-[#235EF5] text-xs"
                            key={event.id}
                            to={`/tx/${event.fromHash}`}
                          >
                            {truncate(event.toHash, 15)}
                          </Link>
                        ) : event?.status === "Pending" ? (
                          <Loader className="addressLoader" />
                        ) : (
                          <ErrorStatus />
                        )}
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
                            .replace("in", "")
                            .replace("a ", "1 ")
                            .replace("an ", "1 ")
                            .replace("hours ", "hrs ")
                            .replace("hour ", "hr ")
                            .replace("a few ", "10")
                            .replace("few ", "")
                            .replace("minutes ", "mins ")
                            .replace("minute ", "min ")
                            .replace("mutes ", "mins ")
                            .replace("mute ", "min ")
                            .replace("second ", "sec ")
                            .replace("seconds ", "secs ")}
                        </span>
                      </TableData>
                      <TableData>
                        <Status status={event.status} />
                      </TableData>
                    </tr>
                  );
                })
              ) : (
                <NoEventsRow />
              )}
            </tbody>
          </table>
        </Container>
      </div>
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
      "px-3 py-3 whitespace-nowrap text-left max-w-xs text-sm font-medium text-[#222222] tracking-wider " +
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
