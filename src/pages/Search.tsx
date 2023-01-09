import { FC, MouseEvent, useContext, useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import { ChainListBox } from "../components/ChainModal/ChainListBox";
import { ChainSwitch } from "../components/elements/chainSwitch";
import { DropDown } from "../components/elements/DropDown";
import FiltersBtn from "../components/elements/FiltersBtn";
import FiltersMobile from "../components/elements/FiltersMobile";
import { SearchPaginator } from "../components/elements/SearchPaginator";
import { StatusFilter } from "../components/elements/StatusFilter";
import { IEvent } from "../components/ExplorerEvents";
import { SearchBar } from "../components/SearchBar";
import scrollUp from "../assets/img/collapse.svg";
import { LoaderRow } from "../components/elements/LoaderRow";
import { useLocation, useNavigate } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import moment from "moment";
import ExplorerLink from "../components/elements/ExplorerLink";
import { Loader } from "../components/elements/Loader";
import { NoEventsRow } from "../components/elements/NoEventsRow";
import { Status } from "../components/Status";
import { CollectionNameRow } from "../components/Table/CollectionNameRow";
import { RowNFT } from "../components/Table/RowNFT";
import { currency, chains, chainNoncetoName } from "../constants";
import { formatFees, extractHash } from "../components/Details/helpers";
import { confiUrl } from "../services/hashConfig";
import { Navbar } from "../components/Navbar";
import { Title } from "../components/Title";
import axios from "axios";
import { setFrom, setTo, setEventsQueryString } from "../store/global";
import { useDispatch } from "react-redux";

export const Search = (props: any) => {
  const uri = `https://dev-explorer-api.herokuapp.com/`;
  const navigate = useNavigate();
  const loc = useLocation();
  const [showClearBtn, setShowClearBtn] = useState(false);
  const [totalTrx, setTotalTrx] = useState<any>(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [eventsContext, setEventsContext] = useState({
    isLoading: true,
    events: [
      {
        chainName: "POLYGON",
        fromChain: "7",
        fromChainName: "POLYGON",
        toChainName: "BSC",
        fromHash: "0x7fa21d343d83f76c97d838a1281b9763061589fae53ee1848fee0c88a687818b",
        toHash: "0xc78be50bdea7250974e9e2dcbfc2f6be64c93bd7074c372e7374b763e9026cf7",
        actionId: "3260",
        tokenId: "3293",
        type: "Transfer",
        status: "Completed",
        toChain: "4",
        txFees: "700339201073507820",
        senderAddress: "0x6449b68cc5675f6011e8DB681B142773A3157cb9",
        targetAddress: "0x6449b68cc5675f6011e8DB681B142773A3157cb9",
        nftUri: "https://metadata.buildship.dev/api/token/moon/3293",
        contract: "0xbC1fE0f3B02CE5FF516F14AC7b79Dd6397A54b9c",
        dollarFees: "0.560271360858806256",
        createdAt: {
          $date: {
            $numberLong: "1672913741781",
          },
        },
        collectionName: "NFT MOON METAVERSE",
        originalChainNonce: null,
        originalContract: null,
        originalTokenId: null,
        originalUri: null,
        createdWith: "Scraper",
        sftAmount: 1,
      },
    ],
  });
  const [exchangeRates, setExchangeRates] = useState<{ [key: string]: { usd: number } }>({
    velas: { usd: 0 },
  });
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("I run everytime this component rerenders");
    getParams();
  }, [loc]);

  const getParams = async () => {
    const searchParams = new URLSearchParams(loc.search);
    switch (true) {
      case searchParams.has("bar"):
        const search = searchParams.get("bar");
        const offset = searchParams.get("offset");
        setPageNumber(offset ? +offset : 0);
        const resp = await axios.get(`${uri}?chainName=${search}&sort=DESC&offset=${offset}`);
        if (resp.data.events.length < 1) return;
        setEventsContext({
          isLoading: false,
          events: resp.data.events,
        });
        setTotalTrx(resp.data.count);
        break;
      default:
        const defaultOffset = searchParams.get("offset");
        setPageNumber(defaultOffset ? +defaultOffset : 0);
        const defaultResp = await axios.get(`${uri}api/${loc.search}`);
        // if (defaultResp.data.events.length < 1) return;
        setEventsContext({
          isLoading: false,
          events: defaultResp.data.events,
        });
        setTotalTrx(defaultResp.data.count);
        break;
    }
  };

  const handleClearAll = () => {
    navigate("/search");
    dispatch(setFrom("All chains"));
    dispatch(setTo("All chains"));
    dispatch(setEventsQueryString("change"));
  };

  const getExchangeRate = (
    rates: { [key: string]: { usd: number } },
    chainName: string
  ): number => {
    const chain = chains.find((chain) => chain.name.toLowerCase() === chainName.toLowerCase());
    const rate = (chain && rates[chain.id]?.usd) || 1;
    // if (chainName === "TON") {
    //   console.log({rate , chainName});
    // }
    return rate;
  };

  const navigateTo = (e: any, event: IEvent) => {
    if (e.target.tagName.toLowerCase() === "img") {
      return;
    }
    navigate(`/tx/${extractHash(confiUrl(event.fromHash))}`);
  };

  let scrollBtn = useRef<any>(null);
  return (
    <div>
      <Navbar />
      <Container className="lg:max-w-5xl mx-auto px-4 mt-4 px-0 md:px-4 overflow-x-auto tableWrapper">
        <Title />
        <SearchBar />
        <ChainListBox />
        <FiltersMobile />

        <Container>
          <SearchPaginator totalTrx={totalTrx} pageNumber={pageNumber} />
          <div className="line"></div>
        </Container>

        <Container className="mt-2 px-0 md:px-4 chainSwitch">
          <ChainSwitch />
          <div className="desktopOnly hideInIpad">
            <DropDown />
          </div>
          <div className="desktopOnly">
            <StatusFilter />
          </div>
          <div className="desktopOnly">
            <button
              className=" text-[#222222] px-2 flex items-center space-x-1 p-1 hover:bg-[#235EF5] hover:text-white rounded csvBtn"
              style={{
                marginLeft: "5px",
                fontSize: "14px",
                height: "100%",
                display: "block",
              }}
              onClick={handleClearAll}
            >
              Clear filters
            </button>
          </div>
          <FiltersBtn />
          <span className="nothing desktopOnly"></span>
        </Container>

        <Container className="mt-4 px-0 md:px-4 overflow-x-auto tableWrapper">
          <img
            src={scrollUp}
            alt="scrollUp"
            className="scrollTopBtn"
            ref={scrollBtn}
            onClick={(e) => {
              setTimeout(() => window.scrollTo({ top: 10, behavior: "smooth" }), 100);
            }}
          />

          <table className="min-w-full divide-y border-b eventsTable">
            <thead className="bg-gray-50 ">
              <tr>
                <TableHeading className="left-0 bg-gray-50 ">NFT</TableHeading>
                <TableHeading>Tx Value</TableHeading>
                {false && <TableHeading>Tx Hash</TableHeading>}
                <TableHeading>From</TableHeading>
                <TableHeading>To</TableHeading>
                <TableHeading>Collection</TableHeading>
                <TableHeading>Method</TableHeading>
                <TableHeading>
                  <span className="ageHeader">Age</span>
                </TableHeading>
                <TableHeading>Status</TableHeading>
              </tr>
            </thead>
            <tbody className=" divide-y   overflow-x-scroll">
              {eventsContext?.isLoading ? (
                <LoaderRow />
              ) : eventsContext?.events.length ? (
                eventsContext?.events.map((event: any, idx: number) => {
                  const dollarValue = Number(
                    getExchangeRate(exchangeRates, event.chainName) * formatFees(event)
                  );

                  return (
                    <tr
                      key={event.id + String(idx)}
                      className="bg-white group hover:bg-transparent txRow"
                      onClick={(e) => navigateTo(e, event)}
                    >
                      <TableData
                        className={`left-0 text-center bg-white group-hover:bg-[#F7F7F9] imgTableData ${
                          /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
                            ? "safariHack"
                            : "sitckyBottomLine"
                        }`}
                      >
                        <ReactTooltip effect="solid" className="copyTip" multiline />
                        <RowNFT event={event} />
                      </TableData>

                      <TableData>
                        <span
                          className="cursor-default"
                          data-tip={`
                        ${formatFees(event)} ${event.fromChain && currency[event.fromChain]} <br>
                          ${dollarValue} $
                      `}
                        >
                          <span>{formatFees(event).toFixed(7).toString()}</span>{" "}
                          <span>{event.fromChain && currency[event.fromChain]}</span>
                          <br />
                          <span className="text-xs">${dollarValue && dollarValue.toFixed(2)}</span>
                        </span>
                      </TableData>

                      <TableData>
                        <div className="flex space-x-1 mb-1">
                          <img
                            src={
                              chains.find(
                                (chain) =>
                                  chain.name.toLowerCase() ===
                                  chainNoncetoName[event?.fromChain || 0]?.toLowerCase()
                              )?.icon
                            }
                            alt=""
                            className="chainIcon"
                          />
                          <span>{chainNoncetoName[event?.fromChain || 0] || "N/A"} </span>
                        </div>
                        <ExplorerLink
                          hash={extractHash(event.fromHash!)}
                          chain={event.fromChain!}
                        />
                      </TableData>

                      <TableData>
                        <div className="flex space-x-1 mb-1">
                          <img
                            src={
                              chains.find(
                                (chain) =>
                                  chain.name.toLowerCase() ===
                                  chainNoncetoName[event?.toChain || 0]?.toLowerCase()
                              )?.icon
                            }
                            alt=""
                            className="chainIcon"
                          />
                          <span>{chainNoncetoName[event?.toChain || 0] || "N/A"}</span>
                        </div>
                        {event?.status === "Completed" ? (
                          <ExplorerLink hash={extractHash(event.toHash!)} chain={event.toChain!} />
                        ) : event?.status === "Pending" ? (
                          <Loader className="addressLoader" />
                        ) : (
                          <Loader className="addressLoader" />
                        )}
                      </TableData>

                      <TableData className="CollectioName">
                        <CollectionNameRow
                          hash={extractHash(event.toHash!)}
                          collectionName={event?.collectionName ? event?.collectionName : "-"}
                          chain={event.toChain!}
                        />
                      </TableData>

                      <TableData>
                        <span className="methodDataTable">{event.type || "N/A"}</span>
                      </TableData>

                      <TableData>
                        <span
                          className="valueData "
                          data-tip={moment(event?.createdAt).format("YYYY/MM/DD H:mm")}
                        >
                          {moment(event.createdAt)
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
                            .replace("second ", "sec ")}
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
          <SearchPaginator totalTrx={totalTrx} pageNumber={pageNumber} />
        </Container>
      </Container>
    </div>
  );
};

export const TableHeading: FC<{ className?: string }> = ({ children, className }) => (
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

export const TableData: FC<{ className?: string }> = ({ children, className }) => (
  <td
    className={
      "px-3 py-4 min-w-[62px] border-0 whitespace-nowrap text-sm text-[#222222] " + className
    }
  >
    {children}
  </td>
);
