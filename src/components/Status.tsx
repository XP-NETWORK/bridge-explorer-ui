import { FC } from "react";
import completedIcon from "../assets/icons/completed.svg";
import failedIcon from "../assets/icons/failed.svg";
import pendingIcon from "../assets/icons/pending.svg";
import info from "../assets/icons/info.svg";
import processing from "../assets/icons/proccess.svg"
import ReactTooltip from "react-tooltip";



export const Status: FC<{ status?: string }> = ({ status }) => {
  <ReactTooltip
              
  />

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
        <span data-tip="Halted by the validators <br/>  Please be patient 💙"><img src={info} alt="" /></span>
       
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
