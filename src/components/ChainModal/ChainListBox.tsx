import { useEffect } from "react";
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

export const ChainListBox = () => {
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

  // useEffect(() => {
  //   // debugger
  //   let filteredChains = chains;
  //   const withNew = filteredChains
  //     .filter((chain) => chain.newChain)
  //     .sort((a, b) => a.order - b.order);
  //   const withComing = filteredChains
  //     .filter((chain) => chain.coming && !chain.newChain)
  //     .sort((a, b) => b.order - a.order);
  //   const withMaintenance = filteredChains.filter(
  //     (chain) => chain.maintenance && !chain.newChain
  //   );
  //   const noComingNoMaintenance = filteredChains
  //     .filter((chain) => !chain.coming && !chain.maintenance && !chain.newChain)
  //     .sort((a, b) => a.order - b.order);
  //   let sorted = [
  //     ...withNew,
  //     ...noComingNoMaintenance,
  //     ...withMaintenance,
  //     ...withComing,
  //   ];
  //   setToChains(sorted);
  //   setFromChains(sorted);
  // }, [from, departureOrDestination, to]);

  const switchChains = () => {
    console.log("before switch", selectedFrom, selectedTo);
    let temp = selectedFrom;
    setSelectedFrom(selectedTo);
    dispatch(setFrom(selectedTo));
    dispatch(setEventsQueryStringFrom(selectedTo));
    setSelectedTo(temp);
    dispatch(setTo(temp));
    dispatch(setEventsQueryStringTo(temp));
    console.log("chains switched", selectedFrom, selectedTo);
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
          <ul className="nftChainList scrollSty">
            <li
              className="nftChainItem"
              onClick={() =>
                departureOrDestination === "departure"
                  ? chainSelectHandlerFrom({ text: "All chains" })
                  : chainSelectHandlerTo({ text: "All chains" })
              }
            >
              <div className="modalSelectOptionsText">All Chains</div>
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
        </div>
      </Modal.Body>
    </Modal>
  );
};
