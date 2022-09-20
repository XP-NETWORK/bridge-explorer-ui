import React, { useEffect, useState } from "react";
import { Dropdown, DropdownButton, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import filter from "../../assets/img/filter.svg";
import { ReduxState } from "../../store";
import {
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

export default function FiltersMobile() {
  const [fromChains, setFromChains] = useState(chains);
  const [toChains, setToChains] = useState(chains);
  const show = useSelector((state: ReduxState) => state.global.showfilterModal);

  const [selectedFrom, setSelectedFrom] = useState("All chains");
  const [selectedTo, setSelectedTo] = useState("All chains");
  const [value, setValue] = useState("Show All");
  const [statusValue, setStatusValue] = useState("Show All");

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setFilterModal(false));
    dispatch(setDepartureOrDestination(""));
    dispatch(setSwitchDestination(false));
  };

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
  };

  const handleSelectType = (e: any) => {
    console.log(e);
    setValue(e);
  };

  const handleSelectStatus = (e: any) => {
    console.log(e);

    setStatusValue(e);
  };

  const chainSelectHandlerFrom = async (chain: any) => {
    setSelectedFrom(chain);
    if (chain === selectedTo && chain !== "All chains") {
      switchChains();
    }
  };

  const chainSelectHandlerTo = async (chain: any) => {
    setSelectedTo(chain);
    if (chain === selectedFrom && chain !== "All chains") {
      switchChains();
    }
  };

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
    dispatch(setFrom(selectedFrom));
    dispatch(setEventsQueryStringFrom(selectedFrom));

    dispatch(setTo(selectedTo));
    dispatch(setEventsQueryStringTo(selectedTo));

    if (value === "Show All") {
      dispatch(setEventsQueryStringType(undefined));
    } else {
      dispatch(setEventsQueryStringType(value));
    }

    if (statusValue === "Show All") {
      //   dispatch(setStatusFilter(""));
    } else if (statusValue === "Processing") {
      dispatch(setStatusFilter("Failed"));
    } else if (statusValue === "Pending") {
      dispatch(setStatusFilter("Pending"));
    } else {
      dispatch(setStatusFilter(statusValue));
    }

    handleClose();
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
                  <div className="dropDown">
                    <DropdownButton
                      onSelect={chainSelectHandlerFrom}
                      id="dropdown-basic-button"
                      title={selectedFrom}
                      size="sm"
                      variant=""
                    >
                      <Dropdown.Item eventKey={"All chains"}>
                        All chains
                      </Dropdown.Item>
                      {fromChains.map((chain) => {
                        return (
                          <Dropdown.Item eventKey={chain.text}>
                            {chain.text}
                          </Dropdown.Item>
                        );
                      })}
                    </DropdownButton>
                  </div>
                </div>
              </div>
              <div className="dropDownContainer">
                <div className="dropDownWrapper">
                  <div className="dropDownTitle">
                    <p>To</p>
                  </div>
                  <div className="dropDown">
                    <DropdownButton
                      onSelect={chainSelectHandlerTo}
                      id="dropdown-basic-button"
                      title={selectedTo}
                      size="sm"
                      variant=""
                    >
                      <Dropdown.Item eventKey={"All chains"}>
                        All chains
                      </Dropdown.Item>
                      {toChains.map((chain) => {
                        return (
                          <Dropdown.Item eventKey={chain.text}>
                            {chain.text}
                          </Dropdown.Item>
                        );
                      })}
                    </DropdownButton>
                  </div>
                </div>
              </div>

              {/* </div> */}
              <div className="dropDownContainer">
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
              </div>

              <div className="dropDownContainer">
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
              </div>

              <div className="filterBtnsWrapper">
                <button
                  className="csvBtn clearFilterBtnModal"
                  onClick={handleClearAll}
                >
                  Clear filters
                </button>
                <button
                  className="csvBtn "
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
