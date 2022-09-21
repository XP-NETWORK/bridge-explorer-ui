import React, { useEffect, useState } from "react";
import { Dropdown, DropdownButton, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import filter from "../../assets/img/filter.svg";
import { ReduxState } from "../../store";
import {
  setChainModal,
  setDepartureOrDestination,
  setEventsQueryStringFrom,
  setEventsQueryStringTo,
  setEventsQueryStringType,
  setFilterModal,
  setFrom,
  setStatusFilter,
  setSwitchDestination,
  setTo,
} from "../../store/global";
import { chains } from "../../values";
import { DropDown } from "./DropDown";
import allIcon from "../../assets/icons/all.svg";
import { chains as Chains } from "../../constants";
import { StatusFilter } from "./StatusFilter";

export default function FiltersMobile() {
  const [fromChains, setFromChains] = useState(chains);
  const [toChains, setToChains] = useState(chains);
  const from = useSelector((state: ReduxState) => state.global.from);
  const to = useSelector((state: ReduxState) => state.global.to);

  const show = useSelector((state: ReduxState) => state.global.showfilterModal);

  const [selectedFrom, setSelectedFrom] = useState("All chains");
  const [selectedTo, setSelectedTo] = useState("All chains");
  const [value, setValue] = useState("Show All");
  const [statusValue, setStatusValue] = useState("Show All");
  const [fromIconSrc, setFromIconSrc] = useState("");
  const [toIconSrc, setToIconSrc] = useState("");
  const [showClearBtn, setShowClearBtn] = useState(false);

  const { eventsQueryString, collectionName } = useSelector(
    (state: ReduxState) => ({
      eventsQueryString: state.global.eventsQueryString,
      collectionName: state.global.showByCollection,
    })
  );

  useEffect(() => {
    if (
      (typeof eventsQueryString === "object" &&
        Object.keys(eventsQueryString).length > 0) ||
      collectionName !== ""
    ) {
      setShowClearBtn(true);
    }
  }, [eventsQueryString, collectionName]);

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setFilterModal(false));
    dispatch(setDepartureOrDestination(""));
    dispatch(setSwitchDestination(false));
  };

  useEffect(() => {
    console.log({ from });
    setFromIconSrc("");
    setToIconSrc("");
    Chains.map((chain) => {
      if (chain.name.toLowerCase() === from.toLowerCase()) {
        setFromIconSrc(chain.icon.slice(1));
        console.log(chain.icon.slice(1));
      }
      if (chain.name.toLowerCase() === to.toLowerCase()) {
        setToIconSrc(chain.icon.slice(1));
      }
    });
  }, [from, to]);

  const handleClearAll = () => {
    // dispatch(setEventsQueryStringType(undefined));
    setFilterModal(false);
    setSelectedFrom("All chains");
    setSelectedTo("All chains");
    setValue("Show All");
    setStatusValue("Show All");

    dispatch(setFrom(selectedFrom));
    dispatch(setEventsQueryStringFrom(selectedFrom));
    dispatch(setEventsQueryStringTo(selectedTo));
    dispatch(setTo(selectedTo));
    dispatch(setEventsQueryStringType(undefined));
    dispatch(setStatusFilter(undefined));
    setShowClearBtn(false);
    handleClose();
  };

  // const handleSelectType = (e: any) => {
  //   console.log(e);
  //   setValue(e);
  // };

  // const handleSelectStatus = (e: any) => {
  //   console.log(e);

  //   setStatusValue(e);
  // };

  // const chainSelectHandlerFrom = async (chain: any) => {
  //   setSelectedFrom(chain);
  //   if (chain === selectedTo && chain !== "All chains") {
  //     switchChains();
  //   }
  // };

  // const chainSelectHandlerTo = async (chain: any) => {
  //   setSelectedTo(chain);
  //   if (chain === selectedFrom && chain !== "All chains") {
  //     switchChains();
  //   }
  // };

  const switchChains = () => {
    // console.log("before switch", selectedFrom, selectedTo);
    let temp = selectedFrom;
    setSelectedFrom(selectedTo);
    // dispatch(setFrom(selectedTo));
    // dispatch(setEventsQueryStringFrom(selectedTo));
    setSelectedTo(temp);
    // dispatch(setTo(temp));
    // dispatch(setEventsQueryStringTo(temp));
    // console.log("chains switched", selectedFrom, selectedTo);
  };

  const handleShowFilterResults = () => {
    // dispatch(setFrom(selectedFrom));
    // dispatch(setEventsQueryStringFrom(selectedFrom));

    // dispatch(setTo(selectedTo));
    // dispatch(setEventsQueryStringTo(selectedTo));

    // if (value === "Show All") {
    //   dispatch(setEventsQueryStringType(undefined));
    // } else {
    //   dispatch(setEventsQueryStringType(value));
    // }

    // if (statusValue === "Show All") {
    //   //   dispatch(setStatusFilter(""));
    // } else if (statusValue === "Processing") {
    //   dispatch(setStatusFilter("Failed"));
    // } else if (statusValue === "Pending") {
    //   dispatch(setStatusFilter("Pending"));
    // } else {
    //   dispatch(setStatusFilter(statusValue));
    // }

    handleClose();
  };

  const handleFromChainSwitch = () => {
    dispatch(setDepartureOrDestination("departure"));
    dispatch(setChainModal(true));
  };

  const handleToChainSwitch = () => {
    dispatch(setDepartureOrDestination("destination"));
    dispatch(setChainModal(true));
  };

  return (
    <>
      <Modal
        animation={false}
        show={show}
        onHide={handleClose}
        className="ChainModal"
      >
        <Modal.Header>
          <Modal.Title>Filters</Modal.Title>
          <span className="CloseModal" onClick={handleClose}>
            <div className="close-modal"></div>
          </span>
        </Modal.Header>
        <Modal.Body>
          <div className="nftChainListBox">
            <div className="filterDropDown">
              {/* <div className="modalBtnWrapper"> */}
              <div className="dropDownContainer">
                <div className="dropDownWrapper">
                  <div className="dropDownTitle">
                    <p>From</p>
                  </div>
                  <div onClick={handleFromChainSwitch} className="chain-switch">
                    <div className="nameWrapper">
                      {fromIconSrc && (
                        <img
                          src={fromIconSrc}
                          alt=""
                          className="chainIconDropd"
                        />
                      )}
                      <span className="name">
                        {" "}
                        {from === "xDai" ? "Gnosis" : from}
                      </span>
                    </div>
                    <div className="arrow-down"></div>
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
                      {toIconSrc && (
                        <img
                          src={toIconSrc}
                          alt=""
                          className="chainIconDropd"
                        />
                      )}

                      <span className="name">
                        {" "}
                        {to === "xDai" ? "Gnosis" : to}
                      </span>
                    </div>
                    <div className="arrow-downTo"></div>
                  </div>
                </div>
              </div>

              {/* </div> */}
              {/* <div className="dropDownContainer">
                <div className="dropDownWrapper">
                  <div className="dropDownTitle">
                    <p> Tx Type</p>
                  </div>
                  <div className="dropDown">
                    <DropdownButton
                      onSelect={handleSelectType}
                      id="dropdown-basic-button"
                      title={value}
                      size="sm"
                      variant=""
                    >
                      <Dropdown.Item eventKey="Show All">
                        Show All
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Transfer">
                        Transfer
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Unfreeze">
                        Unfreeze
                      </Dropdown.Item>
                    </DropdownButton>
                  </div>
                </div>
              </div> */}
              <DropDown />

              {/* <div className="dropDownContainer">
                <div className="dropDownWrapper">
                  <div className="dropDownTitle">
                    <p> Status</p>
                  </div>
                  <div className="dropDown">
                    <DropdownButton
                      onSelect={handleSelectStatus}
                      id="dropdown-basic-button"
                      title={statusValue}
                      size="sm"
                      variant=""
                    >
                      <Dropdown.Item eventKey="Show All">
                        Show All
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Completed">
                        Completed
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Pending">Pending</Dropdown.Item>
                      <Dropdown.Item eventKey="Processing">
                        Processing
                      </Dropdown.Item>
                    </DropdownButton>
                  </div>
                </div>
              </div> */}
              <StatusFilter />

              <div className="filterBtnsWrapper">
                <button
                  className="csvBtn clearFilterBtnModal"
                  onClick={handleClearAll}
                  style={{ visibility: showClearBtn ? "visible" : "hidden" }}
                >
                  Clear filters
                </button>
                <button
                  className="csvBtn filterBtnModal"
                  onClick={handleShowFilterResults}
                >
                  Show results
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
