import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chains } from "../../values.js";
import {
  setChainModal,
  setDepartureOrDestination,
  setTo,
  setFrom,
  setSwitchDestination,
  setTemporaryFrom,
} from "../../store/global";
// import {Chain} from "./Chain";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Modal } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { ReduxState } from "../../store";
import "./Chain.css";

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

  const handleClose = () => {
    dispatch(setChainModal(false));
    dispatch(setDepartureOrDestination(""));
    dispatch(setSwitchDestination(false));
  };

  const chainSelectHandler = async (chain: any) => {
    console.log(chain);
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
    const withMaintenance = filteredChains.filter((chain) => chain.maintenance && !chain.newChain);
    const noComingNoMaintenance = filteredChains
      .filter((chain) => !chain.coming && !chain.maintenance && !chain.newChain)
      .sort((a, b) => a.order - b.order);
    let sorted = [...withNew, ...noComingNoMaintenance, ...withMaintenance, ...withComing];
    setToChains(sorted);
  }, [from, departureOrDestination]);

  return (
    <Modal animation={false} show={show} onHide={handleClose} className="ChainModal">
      <Modal.Header className="text-left">
        <Modal.Title>
          {`Select ${departureOrDestination === "destination" ? "destination" : "departure"} chain`}
        </Modal.Title>
        <span className="CloseModal" onClick={handleClose}>
          <div className="close-modal"></div>
        </span>
      </Modal.Header>
      <Modal.Body>
        <div className="nftChainListBox">
          {/* <ChainSearch /> */}
          <ul className="nftChainList scrollSty">
            {departureOrDestination === "departure" &&
              fromChains.map((chain) => {
                const { image, text, key } = chain;
                return (
                  <li className="nftChainItem">
                    <img className="modalSelectOptionsImage" src={image.src} alt={text} />
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
                  <li className="nftChainItem">
                    <img className="modalSelectOptionsImage" src={image.src} alt={text} />
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
