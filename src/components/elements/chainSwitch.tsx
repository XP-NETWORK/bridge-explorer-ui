import React from "react";
import { ReduxState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { setChainModal, setDepartureOrDestination, setSwitchDestination } from "../../store/global";
import "./Buttons.css";

export const ChainSwitch = ({ assignment }: { assignment: any }): any => {
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

  const show = () => {
    switch (assignment) {
      case "from":
        return (
          <div onClick={handleFromChainSwitch} className="chain-switch-from">
            <div className="nameWrapper">
              <span className="name"> {from === "xDai" ? "Gnosis" : from}</span>
              <div className="arrow-down"></div>
            </div>
          </div>
        );
      case "to":
        return (
          <div onClick={handleSwitchChain} className="chain-switch-to">
            <div className="nameWrapper">
              <span className="name"> {to === "xDai" ? "Gnosis" : to}</span>
              <div className="arrow-down"></div>
            </div>
          </div>
        );
      default:
        break;
    }
  };

  return show() || null;
};
