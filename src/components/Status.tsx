import { FC } from "react";
import completedIcon from "../assets/icons/completed.svg";
import failedIcon from "../assets/icons/failed.svg";
import pendingIcon from "../assets/icons/pending.svg";
import canceledIcon from "../assets/icons/canceled.svg";

export const Status: FC<{ status: string }> = ({ status }) => {
  if (status === "Completed")
    return (
      <div className="flex space-x-1 text-xs text-green-600">
        <img src={completedIcon} alt="completed icon" />
        <h1>Completed</h1>
      </div>
    );

  if (status === "Pending")
    return (
      <div className="flex space-x-1 text-xs text-purple-600">
        <img src={pendingIcon} alt="pending icon" />
        <h1>Pending</h1>
      </div>
    );

  if (status === "Failed")
    return (
      <div className="flex space-x-1 text-xs text-orange-600">
        <img src={failedIcon} alt="failed icon" />
        <h1>Failed</h1>
      </div>
    );

  if (status === "Canceled")
    return (
      <div className="flex space-x-1 text-xs text-orange-600">
        <img src={canceledIcon} alt="canceled icon" />
        <h1>Canceled</h1>
      </div>
    );

  return <div>N/A</div>;
};
