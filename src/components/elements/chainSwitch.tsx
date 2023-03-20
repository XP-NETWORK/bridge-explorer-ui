import { useEffect, useState } from "react";
import { ReduxState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { setChainModal, setDepartureOrDestination } from "../../store/global";
import { chains } from "../../constants";
import "./Buttons.css";

export const ChainSwitch = () => {
  const from = useSelector((state: ReduxState) => state.global.from);
  const to = useSelector((state: ReduxState) => state.global.to);
  const dispatch = useDispatch();
  const [fromIconSrc, setFromIconSrc] = useState("");
  const [toIconSrc, setToIconSrc] = useState("");

  useEffect(() => {
    setFromIconSrc("");
    setToIconSrc("");
    chains.map(chain => {
      if (chain.name.toLowerCase() === from.toLowerCase()) {
        setFromIconSrc(chain.icon.slice(1));
      }
      if (chain.name.toLowerCase() === to.toLowerCase()) {
        setToIconSrc(chain.icon.slice(1));
      }
    });
  }, [from, to]);

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
      <>
        <div className="modalBtnWrapper desktopOnly">
          <div className="dropDownContainer">
            <div className="dropDownWrapper">
              <div className="dropDownTitle">
                <p>From</p>
              </div>
              <div onClick={handleFromChainSwitch} className="chain-switch">
                <div className="nameWrapper">
                  {fromIconSrc && <img src={fromIconSrc} alt="" className="chainIconDropd" />}
                  <span className="name">
                    {" "}
                    {from === "xDai" ? "Gnosis" : from === "Elrond" ? "MultiverseX" : from}
                  </span>
                  <div className="arrow-down"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="dropDownContainer">
            <div className="dropDownWrapper">
              <div className="dropDownTitle">
                <p>To</p>
              </div>
              <div onClick={handleToChainSwitch} className="chain-switch">
                <div className="nameWrapper">
                  {toIconSrc && <img src={toIconSrc} alt="" className="chainIconDropd" />}

                  <span className="name">
                    {" "}
                    {to === "xDai" ? "Gnosis" : to === "Elrond" ? "MultiverseX" : to}
                  </span>
                  <div className="arrow-downTo"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return show() || null;
};
