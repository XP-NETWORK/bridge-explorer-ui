import React from "react";
import { ReduxState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { setChainModal, setDepartureOrDestination, setSwitchDestination } from "../../store/global";
import "./Buttons.css";

export const ChainSwitch = ({ assignment }: { assignment: any }) => {
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
          <span
            // style={walletconnect || nonEVM ? OFF : {}}
            onClick={handleFromChainSwitch}
            className="chain-switch"
          >
            {from === "xDai" ? "Gnosis" : from}
            <div className="arrow-down"></div>
          </span>
        );
      case "to":
        return (
          <span onClick={handleSwitchChain} className="chain-switch">
            {to === "xDai" ? "Gnosis" : to}
            <div className="arrow-down"></div>
          </span>
        );
      default:
        break;
    }
  };

  return show();
};
