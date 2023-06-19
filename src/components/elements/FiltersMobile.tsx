import React, { useEffect, useState } from "react";
import { Dropdown, DropdownButton, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import filter from "../../assets/img/filter.svg";
import { ReduxState } from "../../store";
import {
    setChainModal,
    setDepartureOrDestination,
    setEventsQueryString,
    setEventsQueryStringFrom,
    setEventsQueryStringTo,
    setEventsQueryStringType,
    setFilterModal,
    setFrom,
    setShowByCollection,
    setStatusFilter,
    setTo,
} from "../../store/global";

import { DropDown } from "./DropDown";

import { chains as Chains } from "../../constants";
import { StatusFilter } from "./StatusFilter";

export default function FiltersMobile() {
    // const [fromChains, setFromChains] = useState(chains);
    // const [toChains, setToChains] = useState(chains);
    const from = useSelector((state: ReduxState) => state.global.from);
    const to = useSelector((state: ReduxState) => state.global.to);

    const show = useSelector(
        (state: ReduxState) => state.global.showfilterModal
    );

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
            from === "All chains" &&
            to === "All chains" &&
            value === "Show All" &&
            statusValue === "Show All"
        ) {
            setShowClearBtn(false);
        }
    }, [from, to, value, statusValue]);

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
    };

    useEffect(() => {
        setFromIconSrc("");
        setToIconSrc("");
        Chains.map((chain) => {
            if (chain.name.toLowerCase() === from.toLowerCase()) {
                setFromIconSrc(chain.icon.slice(1));
            }
            if (chain.name.toLowerCase() === to.toLowerCase()) {
                setToIconSrc(chain.icon.slice(1));
            }
        });
    }, [from, to]);

    const handleClearAll = () => {
        setFilterModal(false);
        dispatch(setFrom("All chains"));
        dispatch(setEventsQueryStringFrom("All chains"));
        dispatch(setEventsQueryStringTo("All chains"));
        dispatch(setTo("All chains"));
        dispatch(setEventsQueryStringType(undefined));
        dispatch(setStatusFilter(undefined));
        dispatch(setEventsQueryString(""));
        dispatch(setShowByCollection(""));
        setShowClearBtn(false);
    };

    const handleShowFilterResults = () => {
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
                            <div className="dropDownContainer">
                                <div className="dropDownWrapper">
                                    <div className="dropDownTitle">
                                        <p>From</p>
                                    </div>
                                    <div
                                        onClick={handleFromChainSwitch}
                                        className="chain-switch"
                                    >
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
                                                {from === "xDai"
                                                    ? "Gnosis"
                                                    : from}
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
                                    <div
                                        onClick={handleToChainSwitch}
                                        className="chain-switch"
                                    >
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
                                        <div className="arrow-down"></div>
                                    </div>
                                </div>
                            </div>
                            <DropDown />
                            <StatusFilter />
                            <div className="filterBtnsWrapper">
                                <button
                                    className="csvBtn clearFilterBtnModal"
                                    onClick={handleClearAll}
                                    style={{ visibility: "visible" }}
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
