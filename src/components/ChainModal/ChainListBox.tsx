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

export const ChainListBox = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const departureOrDestination = useSelector(
    (state: ReduxState) => state.global.departureOrDestination
  );
  const from = useSelector((state: ReduxState) => state.global.from);
  const to = useSelector((state: ReduxState) => state.global.to);
  const show = useSelector((state: ReduxState) => state.global.showChainModal);
  const [fromChains, setFromChains] = useState(chains);
  const [toChains, setToChains] = useState(chains);
  const [selectedFrom, setSelectedFrom] = useState("From");
  const [selectedTo, setSelectedTo] = useState("To");

  const handleClose = () => {
    dispatch(setChainModal(false));
    dispatch(setDepartureOrDestination(""));
    dispatch(setSwitchDestination(false));
  };

  const chainSelectHandlerFrom = async (chain: any) => {
    if (chain === "All chains") {
      dispatch(setFrom("All chains"));
      dispatch(setEventsQueryStringFrom(undefined));
      setSelectedFrom("All chains");
    } else {
      dispatch(setFrom(chain.text));
      dispatch(setEventsQueryStringFrom(chain.text));
      setSelectedFrom(chain.text);
    }

    handleClose();
  };
  const chainSelectHandlerTo = async (chain: any) => {
    if (chain === "All chains") {
      dispatch(setTo("All chains"));
      dispatch(setEventsQueryStringTo(undefined));
      setSelectedTo("All chains");
    } else {
      dispatch(setTo(chain.text));
      dispatch(setEventsQueryStringTo(chain.text));
      setSelectedTo(chain.text);
    }

    handleClose();
  };

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
  }, [from, departureOrDestination, to]);

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
          {/* <ChainSearch /> */}
          <ul className="nftChainList scrollSty">
            <li
              className="nftChainItem"
              onClick={() =>
                departureOrDestination === "departure"
                  ? chainSelectHandlerFrom("All chains")
                  : chainSelectHandlerTo("All chains")
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
