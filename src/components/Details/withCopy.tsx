import React, {useState, useEffect, useRef} from 'react';
import ClipboardJS from "clipboard";
import ReactTooltip from "react-tooltip";

export const withCopy = function (Wrapped: React.FC<any>) {
  
  return function (props:any) {

    const [tooltipCopy, setTooltipCopy] = useState<number | null>(null);
    let tooltips: any = useRef([]);

    useEffect(() => {
        new ClipboardJS(".copy-btn");
    }, [])

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
    

    return <Wrapped copyProps = {{tooltips, tooltipCopy, setTooltipCopy}}  {...props}/>
}
}