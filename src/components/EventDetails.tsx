import { Container } from "./Container";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { IEvent } from "./ExplorerEvents";
import { Status } from "./Status";
import CopyIcon from "../assets/icons/copy.svg";

import ClipboardJS from "clipboard";
import moment from "moment";

import ReactTooltip from "react-tooltip";

import { FromLink } from "./elements/ExplorerLink";

export const EventDetails = () => {
    let params = useParams();
    const [event, setEvent] = useState<IEvent>();
    const [metadata, setMetadata] = useState<any>();
    const [tooltipCopy, setTooltipCopy] = useState<number | null>(null);

    useEffect(() => {
        new ClipboardJS(".copy-btn");

        fetch(
            `https://dev-explorer-api.herokuapp.com/?fromHash=${params.fromHash}`
        ) //https://dev-explorer-api.herokuapp.com
            .then((res) => res.json())
            .then((data) => {
                setEvent(data[0]);
            });
    }, []);

    // TODO: fetch metadata from nftUri
    useEffect(() => {
        try {
            fetch(event?.nftUri!)
                .then((res) => res.json())
                .then((metadata) => {
                    setMetadata(metadata);
                });
        } catch (err) {
            console.error(err);
        }
    }, [event]);

    let tooltips: any = useRef([]);

    useEffect(() => {
        if (tooltipCopy) {
            ReactTooltip.rebuild();
            ReactTooltip.show(tooltips.current[tooltipCopy]);
            setTimeout(() => setTooltipCopy(null), 500);
        } else {
            ReactTooltip.rebuild();
            ReactTooltip.hide();
        }
    }, [tooltipCopy]);

    return (
        <Container>
            <div className="p-4 bg-white mt-5 sm:rounded-2xl rounded-lg shadow-[0_1px_15px_0px_#2F303214]">
                <h1 className="text-base font-medium">Sent Item</h1>
                <hr className="mb-4 mt-2" />
                <div className="flex items-start sm:border sm:p-5 sm:rounded-2xl flex-col sm:flex-row gap-5 sm:">
                    <div className="flex flex-col sm:flex-row">
                        <img
                            className="rounded-lg sm:max-w-[8rem]"
                            src={
                                metadata?.image ||
                                "https://via.placeholder.com/128?text=No+Image"
                            }
                            alt="nft preview"
                        />
                    </div>
                    <div className="w-full">
                        <div className="grid sm:grid-cols-8 gap-3 py-3 border-b sm:border-0">
                            <div className="sm:col-span-2 font-medium text-sm">
                                NFT:
                            </div>
                            <div className="sm:col-span-6 text-sm">
                                {metadata?.name || "N/A"}
                            </div>
                        </div>
                        <div className="grid items-center sm:grid-cols-8 gap-3 py-3 border-b sm:border-0">
                            <div className="sm:col-span-2 font-medium text-sm">
                                Token ID:
                            </div>
                            <div className="sm:col-span-6 text-sm">
                                {metadata?.id || "N/A"}
                            </div>
                        </div>
                        <div className="grid sm:grid-cols-8 gap-3 py-3 border-b sm:border-0 ">
                            <div className="sm:col-span-2 font-medium text-sm">
                                Transaction Hash:
                            </div>
                            <div className="sm:col-span-6 break-all text-sm text-[#235EF5]">
                                <span className="hidden sm:inline">
                                    {event && <FromLink event={event} />}
                                </span>
                                <span className="sm:hidden">
                                    {event && <FromLink event={event} />}
                                </span>
                                <ReactTooltip
                                    effect="solid"
                                    className={`${
                                        tooltipCopy
                                            ? "copyTip copied"
                                            : "copyTip"
                                    }`}
                                />
                                <button
                                    className={`copy-btn ml-1`}
                                    data-tip={
                                        tooltipCopy
                                            ? `Сopied to clipboard`
                                            : "Copy"
                                    }
                                    data-clipboard-text={event?.fromHash}
                                    ref={(node) => (tooltips.current[1] = node)}
                                    onClick={() => {
                                        setTooltipCopy(1);
                                    }}
                                >
                                    <img
                                        src={CopyIcon}
                                        width={15}
                                        alt="copy button"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full sm:my-5">
                    <div className="grid sm:grid-cols-6 gap-3 py-4 sm:px-4 border-b">
                        <div className="sm:col-span-1 font-medium text-sm">
                            Source Hash:
                        </div>
                        <div className="sm:col-span-5 break-all text-sm text-[#235EF5]">
                            <span className="hidden sm:inline">
                                {event?.fromHash || "N/A"}
                            </span>
                            <span className="sm:hidden">
                                {event?.fromHash?.slice(0, 6)}...
                                {event?.fromHash?.slice(-15)}
                            </span>
                            <ReactTooltip
                                effect="solid"
                                className={`${
                                    tooltipCopy ? "copyTip copied" : "copyTip"
                                }`}
                            />
                            <button
                                className={`copy-btn ml-2`}
                                data-tip={
                                    tooltipCopy ? `Сopied to clipboard` : "Copy"
                                }
                                data-clipboard-text={event?.fromHash}
                                ref={(node) => (tooltips.current[2] = node)}
                                onClick={() => {
                                    setTooltipCopy(2);
                                }}
                            >
                                <img
                                    src={CopyIcon}
                                    width={15}
                                    alt="copy button"
                                />
                            </button>
                        </div>
                    </div>
                    <div className="grid items-center sm:grid-cols-6 gap-3 py-4  sm:px-4  border-b">
                        <div className="sm:col-span-1 font-medium text-sm">
                            Dest Hash:
                        </div>
                        <div className="sm:col-span-5 break-all text-sm text-[#235EF5]">
                            <span className="hidden sm:inline">
                                {event?.toHash || "N/A"}
                            </span>
                            <span className="sm:hidden">
                                {event?.toHash?.slice(0, 6)}...
                                {event?.toHash?.slice(-15)}
                            </span>
                            <ReactTooltip
                                effect="solid"
                                className={`${
                                    tooltipCopy ? "copyTip copied" : "copyTip"
                                }`}
                            />
                            <button
                                className={`copy-btn ml-2`}
                                data-tip={
                                    tooltipCopy ? `Сopied to clipboard` : "Copy"
                                }
                                data-clipboard-text={event?.toHash}
                                ref={(node) => (tooltips.current[3] = node)}
                                onClick={() => {
                                    setTooltipCopy(3);
                                }}
                            >
                                <img
                                    src={CopyIcon}
                                    width={15}
                                    alt="copy button"
                                />
                            </button>
                        </div>
                    </div>
                    <div className="grid sm:grid-cols-6 gap-3 py-4 sm:px-4  border-b ">
                        <div className="sm:col-span-1 font-medium text-sm">
                            Source Chain:
                        </div>
                        <div className="sm:col-span-5 break-all text-sm">
                            {event?.fromChainName || "N/A"}
                        </div>
                    </div>
                    <div className="grid sm:grid-cols-6 gap-3 py-4 sm:px-4  border-b ">
                        <div className="sm:col-span-1 font-medium5 text-sm">
                            Dest Chain:
                        </div>
                        <div className="sm:col-span-5 break-all text-sm">
                            {event?.toChainName || "N/A"}
                        </div>
                    </div>
                    <div className="grid sm:grid-cols-6 gap-3 py-4 sm:px-4  border-b ">
                        <div className="sm:col-span-1 font-medium5 text-sm">
                            From:
                        </div>
                        <div className="sm:col-span-5 break-all text-sm text-[#235EF5]">
                            <span className="hidden sm:inline">
                                {event?.senderAddress || "N/A"}
                            </span>
                            <span className="sm:hidden">
                                {event?.senderAddress?.slice(0, 6)}...
                                {event?.senderAddress?.slice(-15)}
                            </span>
                            <ReactTooltip
                                effect="solid"
                                className={`${
                                    tooltipCopy ? "copyTip copied" : "copyTip"
                                }`}
                            />
                            <button
                                className={`copy-btn ml-2`}
                                data-tip={
                                    tooltipCopy ? `Сopied to clipboard` : "Copy"
                                }
                                data-clipboard-text={event?.senderAddress}
                                ref={(node) => (tooltips.current[4] = node)}
                                onClick={() => {
                                    setTooltipCopy(4);
                                }}
                            >
                                <img
                                    src={CopyIcon}
                                    width={15}
                                    alt="copy button"
                                />
                            </button>
                        </div>
                    </div>
                    <div className="grid sm:grid-cols-6 gap-3 py-4 sm:px-4  border-b ">
                        <div className="sm:col-span-1 font-medium5 text-sm">
                            To:
                        </div>
                        <div className="sm:col-span-5 break-all text-sm text-[#235EF5]">
                            <span className="hidden sm:inline">
                                {event?.targetAddress || "N/A"}
                            </span>
                            <span className="sm:hidden">
                                {event?.targetAddress?.slice(0, 6)}...
                                {event?.targetAddress?.slice(-15)}
                            </span>
                            <ReactTooltip
                                effect="solid"
                                className={`${
                                    tooltipCopy ? "copyTip copied" : "copyTip"
                                }`}
                            />
                            <button
                                className={`copy-btn ml-2`}
                                data-tip={
                                    tooltipCopy ? `Сopied to clipboard` : "Copy"
                                }
                                data-clipboard-text={event?.targetAddress}
                                ref={(node) => (tooltips.current[5] = node)}
                                onClick={() => {
                                    setTooltipCopy(5);
                                }}
                            >
                                <img
                                    src={CopyIcon}
                                    width={15}
                                    alt="copy button"
                                />
                            </button>
                        </div>
                    </div>
                    <div className="grid items-center sm:grid-cols-6 gap-3 py-4 sm:px-4  border-b">
                        <div className="sm:col-span-1 font-medium5 text-sm">
                            Date:
                        </div>
                        <div className="sm:col-span-5 text-sm">
                            {moment(event?.createdAt).format(
                                "YYYY/MM/DD H:mm"
                            ) ?? "N/A"}
                        </div>
                    </div>
                    <div className="grid items-center sm:grid-cols-6 gap-3 py-4 sm:px-4  sm:border-b">
                        <div className="sm:col-span-1 font-medium 5 text-sm">
                            Status:
                        </div>
                        <div className="sm:col-span-5 text-sm">
                            <Status status={event?.status} />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};
