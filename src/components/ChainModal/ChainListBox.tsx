import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chains } from "../../values.js";
import {
  setChainModal,
  setFrom,
  setTo,
  setDepartureOrDestination,
  setSwitchDestination,
  setTemporaryFrom,
  setEventsQueryStringTo,
  setEventsQueryStringFrom,
  setChainSearch,
} from "../../store/global";
// import {Chain} from "./Chain";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Modal } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { ReduxState } from "../../store";
import "./Chain.css";
import "./Modal.css";
import ChainSearch from "./ChainSearch";
import showAll from "../../assets/icons/all.svg";
import ScrollArrows from "./ScrollArrows";

export const ChainListBox = () => {
  const [reached, setReached] = useState(false);
  const nftChainListRef = useRef(null);

  const dispatch = useDispatch();
  const location = useLocation();
  const departureOrDestination = useSelector(
    (state: ReduxState) => state.global.departureOrDestination
  );
  const chainSearch = useSelector(
    (state: ReduxState) => state.global.chainSearch
  );
  // const from = useSelector((state: ReduxState) => state.global.from);
  // const to = useSelector((state: ReduxState) => state.global.to);
  const show = useSelector((state: ReduxState) => state.global.showChainModal);
  const [fromChains, setFromChains] = useState(chains);
  const [toChains, setToChains] = useState(chains);
  const [selectedFrom, setSelectedFrom] = useState("All chains");
  const [selectedTo, setSelectedTo] = useState("All chains");

  useEffect(() => {
    //@ts-ignore
    if (fromChains.length <= 5 || toChains.length <= 5) {
      setReached(true);
    } else {
      setReached(false);
    }
  }, [fromChains, toChains]);

  const handleClose = () => {
    dispatch(setChainModal(false));
    dispatch(setDepartureOrDestination(""));
    dispatch(setSwitchDestination(false));
    dispatch(setChainSearch(""));
  };

  const chainSelectHandlerFrom = async (chain: any) => {
    setSelectedFrom(chain.text);
    if (chain.text === selectedTo && chain.text !== "All chains") {
      switchChains();
    } else {
      dispatch(setFrom(chain.text));
      dispatch(setEventsQueryStringFrom(chain.text));
    }
    handleClose();
  };

  const chainSelectHandlerTo = async (chain: any) => {
    setSelectedTo(chain.text);
    if (chain.text === selectedFrom && chain.text !== "All chains") {
      switchChains();
    } else {
      dispatch(setTo(chain.text));
      dispatch(setEventsQueryStringTo(chain.text));
    }
    handleClose();
  };

  useEffect(() => {
    let sorted;
    if (chainSearch && departureOrDestination === "departure") {
      sorted = chains.filter((chain) =>
        chain.text.toLowerCase().includes(chainSearch.toLowerCase())
      );
      setFromChains(sorted);
    } else {
      setFromChains(chains);
    }
    if (chainSearch && departureOrDestination === "destination") {
      sorted = chains.filter((chain) =>
        chain.text.toLowerCase().includes(chainSearch.toLowerCase())
      );
      setToChains(sorted);
    } else {
      setToChains(chains);
    }
  }, [chainSearch]);

  useEffect(() => {
    // debugger
    let filteredChains = chains;
    const withNew = filteredChains
      .filter((chain) => chain.newChain)
      .sort((a, b) => a.order - b.order);
    const withComing = filteredChains
      .filter((chain) => chain.coming && !chain.newChain)
      .sort((a, b) => b.order - a.order);
    const withMaintenance = filteredChains.filter(
      (chain) => chain.maintenance && !chain.newChain
    );
    const noComingNoMaintenance = filteredChains
      .filter((chain) => !chain.coming && !chain.maintenance && !chain.newChain)
      .sort((a, b) => a.order - b.order);
    let sorted = [
      ...withNew,
      ...noComingNoMaintenance,
      ...withMaintenance,
      ...withComing,
    ];
    setToChains(sorted);
    setFromChains(sorted);
  }, [selectedFrom, departureOrDestination, selectedTo]);

  const switchChains = () => {
    let temp = selectedFrom;
    setSelectedFrom(selectedTo);
    dispatch(setFrom(selectedTo));
    dispatch(setEventsQueryStringFrom(selectedTo));
    setSelectedTo(temp);
    dispatch(setTo(temp));
    dispatch(setEventsQueryStringTo(temp));
  };

  const handleScroll = (e: any) => {
    //@ts-ignore
    const { scrollTop, scrollHeight, clientHeight } = nftChainListRef.current;
    if (nftChainListRef?.current) {
      if (
        Math.ceil(scrollTop) + clientHeight === scrollHeight ||
        Math.ceil(scrollTop) - 1 + clientHeight === scrollHeight
      ) {
        setReached(true);
      } else setReached(false);
    }
  };

  return (
    <Modal
      animation={false}
      show={show}
      onHide={handleClose}
      className="ChainModal"
    >
      <Modal.Header>
        <Modal.Title>
          {`Select ${
            departureOrDestination === "destination"
              ? "destination"
              : "departure"
          } chain`}
        </Modal.Title>
        <span className="CloseModal" onClick={handleClose}>
          <div className="close-modal"></div>
        </span>
      </Modal.Header>
      <Modal.Body>
        <div className="nftChainListBox">
          <ChainSearch />
          <ul
            className="nftChainList scrollSty"
            onScroll={handleScroll}
            ref={nftChainListRef}
          >
            <li
              className="nftChainItem"
              onClick={() =>
                departureOrDestination === "departure"
                  ? chainSelectHandlerFrom({ text: "All chains" })
                  : chainSelectHandlerTo({ text: "All chains" })
              }
            >
              <img className="modalSelectOptionsImage" src={showAll} alt="" />
              <div className="modalSelectOptionsText">Select All Chains</div>
            </li>
            {departureOrDestination === "departure" &&
              fromChains.map((chain) => {
                const { image, text, key } = chain;
                return (
                  <li
                    className="nftChainItem"
                    onClick={() => chainSelectHandlerFrom(chain)}
                  >
                    <img
                      className="modalSelectOptionsImage"
                      src={image.src}
                      alt=""
                    />
                    <div className="modalSelectOptionsText">
                      {text === "xDai" ? "Gnosis" : text}
                    </div>
                  </li>
                );
              })}
            {departureOrDestination === "destination" &&
              toChains.map((chain) => {
                const { image, text, key } = chain;
                return (
                  <li
                    className="nftChainItem"
                    onClick={() => chainSelectHandlerTo(chain)}
                  >
                    <img
                      className="modalSelectOptionsImage"
                      src={image.src}
                      alt=""
                    />
                    <div className="modalSelectOptionsText">
                      {text === "xDai" ? "Gnosis" : text}
                    </div>
                  </li>
                );
              })}
          </ul>
          {/* <div className="mobileOnly"> */}
          {!reached && <ScrollArrows />}
          {/* </div> */}
        </div>
      </Modal.Body>
    </Modal>
  );
};
