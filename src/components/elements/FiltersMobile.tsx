import React, { useEffect, useState } from "react";
import { Dropdown, DropdownButton, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import filter from "../../assets/img/filter.svg";
import { ReduxState } from "../../store";
import {
  setEventsQueryStringFrom,
  setEventsQueryStringTo,
  setEventsQueryStringType,
  setFilterModal,
  setFrom,
  setTo,
} from "../../store/global";
import { chains } from "../../values";
import { DropDown } from "./DropDown";

export default function FiltersMobile() {
  // const [showFilters, setShowFilters] = useState();
  const departureOrDestination = useSelector(
    (state: ReduxState) => state.global.departureOrDestination
  );
  const from = useSelector((state: ReduxState) => state.global.from);
  const to = useSelector((state: ReduxState) => state.global.to);

  const [fromChains, setFromChains] = useState(chains);
  const [toChains, setToChains] = useState(chains);
  const show = useSelector((state: ReduxState) => state.global.showfilterModal);
  console.log("show", show);
  // const [fromChain, setFromChain] = useState("From");
  // const [toChain, setToChain] = useState("To");
  const [selectedFrom, setSelectedFrom] = useState("From");
  const [selectedTo, setSelectedTo] = useState("To");
  const [value, setValue] = useState("All Types");
  const dispatch = useDispatch();
  console.log("to chains", toChains);
  const handleClose = () => {
    dispatch(setFilterModal(false));
  };

  // const openFilters = () =>{
  //   dispatch(setFilterModal(true));
  // }

  const chainSelectHandlerFrom = (chain: any) => {
    console.log("selected chain", chain);
    setSelectedFrom(chain);
    setToChains(chains.filter((c) => c.text != chain));
    console.log("to chains new", toChains);
  };
  const chainSelectHandlerTo = (chain: any) => {
    setSelectedTo(chain);
    setFromChains(chains.filter((c) => c.text != chain));
  };

  const handleSelectType = (e: any) => {
    console.log(e);
    setValue(e);
  };

  const handleClearAll = () => {
    // dispatch(setEventsQueryStringType(undefined));
    setFilterModal(false);
    setSelectedFrom("From");
    setSelectedTo("To");
  };

  const handleShowFilterResults = () => {
    console.log("from,to", selectedFrom, selectedTo);

    if (selectedFrom === "From") {
      dispatch(setEventsQueryStringFrom(undefined));
    } else {
      dispatch(setFrom(selectedFrom));
      dispatch(setEventsQueryStringFrom(selectedFrom));
    }

    if (selectedTo === "To") {
      dispatch(setEventsQueryStringTo(undefined));
    } else {
      dispatch(setTo(selectedTo));
      dispatch(setEventsQueryStringTo(selectedTo));
    }
    dispatch(setFilterModal(false));

    if (value === "All Types") {
      dispatch(setEventsQueryStringType(undefined));
    } else {
      dispatch(setEventsQueryStringType(value));
    }
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
              <div className="modalBtnWrapper">
                <div className="dropDown">
                  <DropdownButton
                    onSelect={chainSelectHandlerFrom}
                    id="dropdown-basic-button"
                    title={selectedFrom}
                    size="sm"
                    variant=""
                  >
                    {fromChains.map((chain) => {
                      return (
                        <Dropdown.Item eventKey={chain.text}>
                          {chain.text}
                        </Dropdown.Item>
                      );
                    })}
                  </DropdownButton>
                </div>
                <div className="dropDown">
                  <DropdownButton
                    onSelect={chainSelectHandlerTo}
                    id="dropdown-basic-button"
                    title={selectedTo}
                    size="sm"
                    variant=""
                  >
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
                      <Dropdown.Item eventKey="All Types">
                        All Types
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
              <div className="filterBtnsWrapper">
                <button
                  className="csvBtn clearFilterBtnModal"
                  onClick={handleClearAll}
                >
                  Clear all
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
