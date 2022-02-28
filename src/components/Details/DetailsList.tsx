
import {DetailsCard} from './DetailsCard'
import ReactTooltip from "react-tooltip";
import CopyIcon from "../../assets/icons/copy.svg";

interface DetailsList extends DetailsCard{
    
}
 
const DetailsList = ({data, copyProps } : DetailsCard) => {

    const {loading : dataLoad, event, metadata} = data
    const {setTooltipCopy, tooltipCopy, tooltips} = copyProps


    return <div  className="flex flex-col w-full">
             <div className="flex items-start justify-start gap-2 border-b py-4">
            <div className="font-medium w-32">Source Hash:</div>
            <p
              // style={{ width: "calc(100% - 6rem)" }}
              className={`md:pl-14 break-words shrink w-[calc(100%-8rem)] md:w-fit  ${dataLoad? 'loadingWrapper' : 'loadedWrapper'}`}
            >
                   <ReactTooltip
                  effect="solid"
                  className={`${tooltipCopy ? "copyTip copied" : "copyTip"}`}
                />
                <button
                  className={`copy-btn`}
                  data-tip={tooltipCopy ? `Сopied to clipboard` : "Copy"}
                  data-clipboard-text={'TEST COPY TEXT'}
                  ref={(node) => (tooltips.current[1] = node)}
                  onClick={() => {
                    setTooltipCopy(1);
                  }}
                >
                  <img src={CopyIcon} alt="copy button" />
                </button>
              <span className="text-[#235EF5]">{'0x1036291556ac582965d45905e5d87011e41a575c92de18b28972486a173fa92e' || "N/A"}</span>
            </p>
            </div>
    </div>
}
 
export default DetailsList