import React from "react";
import { ReduxState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { setChainModal, setDepartureOrDestination, setSwitchDestination } from "../../store/global";
import "./Buttons.css";

export const ChainSwitch = () => {
  const from = useSelector((state: ReduxState) => state.global.from);
  const to = useSelector((state: ReduxState) => state.global.to);
  const dispatch = useDispatch();

  function handleSwitchChain() {
    dispatch(setDepartureOrDestination("destination"));
    dispatch(setSwitchDestination(true));
  }

  const handleFromChainSwitch = () => {
    dispatch(setDepartureOrDestination("departure"));
    dispatch(setChainModal(true));
  };

  const handleToChainSwitch = () => {
    dispatch(setDepartureOrDestination("destination"));
    dispatch(setChainModal(true));
  };

  const show = () => {
    return (
      <div className="modalBtnWrapper">
        <div onClick={handleFromChainSwitch} className="chain-switch">
          <div className="nameWrapper">
            <span className="name"> {from === "xDai" ? "Gnosis" : from}</span>
            <div className="arrow-down"></div>
          </div>
        </div>
        <div onClick={handleToChainSwitch} className="chain-switch">
          <div className="nameWrapper">
            <span className="name"> {to === "xDai" ? "Gnosis" : to}</span>
            <div className="arrow-downTo"></div>
          </div>
        </div>
      </div>
    );
  };

  return show() || null;
};
