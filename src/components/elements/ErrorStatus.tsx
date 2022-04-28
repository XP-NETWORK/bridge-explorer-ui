import React from "react";
import ReactTooltip from "react-tooltip";

export const ErrorStatus = () => {
  return (
    <span
      data-tip="<span className='text-left'>Transaction failed.</br>
      Use tools tab above for details.</span>"
      data-place="right"
      data-html="true"
      className="rounded-full w-fit cursor-pointer bg-[#E314321A] text-[#E31432] text-xs py-1 px-2"
    >
      Error
    </span>
  );
};
