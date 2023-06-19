import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chains } from "../../values.js";
import {
    setChainModal,
    setFrom,
    setTo,
    setDepartureOrDestination,
    setSwitchDestination,
    setChainSearch,
} from "../../store/global";
// import {Chain} from "./Chain";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Modal } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ReduxState } from "../../store";
import "./Chain.css";
import "./Modal.css";
import ChainSearch from "./ChainSearch";
import showAll from "../../assets/icons/all.svg";
import ScrollArrows from "./ScrollArrows";

export const ChainListBox = () => {
    const [reached, setReached] = useState(false);
    const nftChainListRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const departureOrDestination = useSelector(
        (state: ReduxState) => state.global.departureOrDestination
    );
    const chainSearch = useSelector(
        (state: ReduxState) => state.global.chainSearch
    );
    const show = useSelector(
        (state: ReduxState) => state.global.showChainModal
    );
    const [fromChains, setFromChains] = useState(chains);
    const [toChains, setToChains] = useState(chains);
    const [selectedFrom, setSelectedFrom] = useState("All chains");
    const [selectedTo, setSelectedTo] = useState("All chains");
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);

    useEffect(() => {
        //@ts-ignore
        if (fromChains.length <= 5 || toChains.length <= 5) {
            setReached(true);
        } else {
            setReached(false);
        }
    }, [fromChains, toChains]);

    const handleClose = () => {
        dispatch(setChainModal(false));
        dispatch(setDepartureOrDestination(""));
        dispatch(setSwitchDestination(false));
        dispatch(setChainSearch(""));
    };

    const chainSelectHandlerFrom = async (chain: any) => {
        handleClose();
        dispatch(setFrom(chain.text));
        console.log(chain);
        params.delete("bar");
        chain.text === "All chains"
            ? params.delete("chainName")
            : params.set("chainName", chain?.key?.toUpperCase());

        navigate(
            (String(url).includes("search") ? `?` : `search?`) +
                params.toString()
        );
    };

    const chainSelectHandlerTo = async (chain: any) => {
        handleClose();
        dispatch(setTo(chain.text));
        console.log(chain);
        params.delete("bar");

        chain.text === "All chains"
            ? params.delete("toChainName")
            : params.set("toChainName", chain?.key?.toUpperCase());

        navigate(
            (String(url).includes("search") ? `?` : `search?`) +
                params.toString()
        );
    };

    useEffect(() => {
        let sorted;
        if (chainSearch && departureOrDestination === "departure") {
            sorted = chains.filter((chain) =>
                chain.text.toLowerCase().includes(chainSearch.toLowerCase())
            );
            setFromChains(sorted);
        } else {
            setFromChains(chains);
        }
        if (chainSearch && departureOrDestination === "destination") {
            sorted = chains.filter((chain) =>
                chain.text.toLowerCase().includes(chainSearch.toLowerCase())
            );
            setToChains(sorted);
        } else {
            setToChains(chains);
        }
    }, [chainSearch]);

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
            .filter(
                (chain) =>
                    !chain.coming && !chain.maintenance && !chain.newChain
            )
            .sort((a, b) => a.order - b.order);
        let sorted = [
            ...withNew,
            ...noComingNoMaintenance,
            ...withMaintenance,
            ...withComing,
        ];
        setToChains(sorted);
        setFromChains(sorted);
    }, [selectedFrom, departureOrDestination, selectedTo]);

    const handleScroll = (e: any) => {
        //@ts-ignore
        const { scrollTop, scrollHeight, clientHeight } =
            nftChainListRef.current;
        if (nftChainListRef?.current) {
            if (
                Math.ceil(scrollTop) + clientHeight === scrollHeight ||
                Math.ceil(scrollTop) - 1 + clientHeight === scrollHeight
            ) {
                setReached(true);
            } else setReached(false);
        }
    };

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
                    <ChainSearch />
                    <ul
                        className="nftChainList scrollSty"
                        onScroll={handleScroll}
                        ref={nftChainListRef}
                    >
                        <li
                            className="nftChainItem"
                            onClick={() =>
                                departureOrDestination === "departure"
                                    ? chainSelectHandlerFrom({
                                          text: "All chains",
                                      })
                                    : chainSelectHandlerTo({
                                          text: "All chains",
                                      })
                            }
                        >
                            <img
                                className="modalSelectOptionsImage"
                                src={showAll}
                                alt=""
                            />
                            <div className="modalSelectOptionsText">
                                Select All Chains
                            </div>
                        </li>
                        {departureOrDestination === "departure" &&
                            fromChains.map((chain, inedx) => {
                                const { image, text, key } = chain;
                                return (
                                    <li
                                        key={inedx}
                                        className="nftChainItem"
                                        onClick={() =>
                                            chainSelectHandlerFrom(chain)
                                        }
                                    >
                                        <img
                                            className="modalSelectOptionsImage"
                                            src={image.src}
                                            alt=""
                                        />
                                        <div className="modalSelectOptionsText">
                                            {text === "xDai"
                                                ? "Gnosis"
                                                : text === "Elrond"
                                                ? "MultiverseX"
                                                : text}
                                        </div>
                                    </li>
                                );
                            })}
                        {departureOrDestination === "destination" &&
                            toChains.map((chain, index) => {
                                const { image, text, key } = chain;
                                return (
                                    <li
                                        className="nftChainItem"
                                        onClick={() =>
                                            chainSelectHandlerTo(chain)
                                        }
                                        key={index}
                                    >
                                        <img
                                            className="modalSelectOptionsImage"
                                            src={image.src}
                                            alt=""
                                        />
                                        <div className="modalSelectOptionsText">
                                            {text === "xDai"
                                                ? "Gnosis"
                                                : text === "Elrond"
                                                ? "MultiverseX"
                                                : text}
                                        </div>
                                    </li>
                                );
                            })}
                    </ul>
                    {!reached && <ScrollArrows />}
                </div>
            </Modal.Body>
        </Modal>
    );
};
