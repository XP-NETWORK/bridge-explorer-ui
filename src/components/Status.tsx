import { FC } from "react";
import completedIcon from "../assets/icons/completed.svg";

import revertedIcont from "../assets/icons/revert.svg";
import pendingIcon from "../assets/icons/pending.svg";
import info from "../assets/icons/info.svg";
import processing from "../assets/icons/proccess.svg";
import ReactTooltip from "react-tooltip";

export const Status: FC<{ status?: string }> = ({ status }) => {
    <ReactTooltip multiline backgroundColor="red" />;

    if (status === "Completed")
        return (
            <div className="flex min-w-[5rem] flex-nowrap space-x-1 text-xs text-[#10B67A]">
                <img
                    src={completedIcon}
                    className="aspect-square"
                    alt="completed icon"
                    width={15}
                />
                <div>Completed</div>
            </div>
        );

    if (status === "Pending")
        return (
            <div className="flex min-w-[5rem] space-x-1 text-xs text-[#C058FF]">
                <img src={pendingIcon} alt="pending icon" />
                <h1>Pending</h1>
            </div>
        );

    if (status === "Failed")
        return (
            <div className="flex min-w-[5rem] space-x-1 text-xs text-[#6D7A92] statusWrapper">
                <img src={processing} alt="failed icon" />
                <h1>Processing...</h1>
                <span
                    className="status-tip"
                    data-tip="Halted by the validators <br/>  Please be patient 💙"
                >
                    <img src={info} alt="" />
                </span>
            </div>
        );

    if (status === "Reverted")
        return (
            <div className="flex min-w-[5rem] space-x-1 text-xs text-[#DE710C] staus-wrapper">
                <img src={revertedIcont} alt="pending icon" />
                <h1>Reverted</h1>
                <span
                    className="status-tip"
                    data-tip="NFTs cannot be transferred to smart contact addresses <br/> The transaction has been reverted and the NFT was sent<br/> back to the sender"
                >
                    <img src={info} alt="" />
                </span>
            </div>
        );

    if (status === "Canceled")
        return (
            <div className="flex min-w-[5rem] space-x-1 text-xs text-[#D7600A]">
                <img src={processing} alt="canceled icon" />
                <h1>Processing...</h1>
            </div>
        );

    return <div>N/A</div>;
};
