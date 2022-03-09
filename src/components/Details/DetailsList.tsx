
import {DetailsCard} from './DetailsCard'
import ReactTooltip from "react-tooltip";
import CopyWithTooltip from './CopyWithTooltop';
import { Status } from "../Status";
import moment from 'moment'
import { truncate } from './helpers';
import useIsMobile from '../../hooks/isMobile';
import { useMemo } from 'react';
import { txExplorers, addressExplorers } from '../../constants'; 


const DetailsList = ({data, copyProps } : DetailsCard) => {

    const {loading : dataLoad, event} = data
    const {setTooltipCopy, tooltipCopy, tooltips} = copyProps

    const isMobile = useIsMobile()
    const truncateSize = useMemo(() => isMobile? 33: 60, [isMobile])   

    console.log(isMobile);

    return <div  className="flex flex-col w-full">
             <div className="flex items-start justify-start gap-2 border-b py-4 detailsListRow" style={{display: 'none'}}>
            <div className="font-medium w-32">Source Hash:</div>
            <p
              // style={{ width: "calc(100% - 6rem)" }}
              className={`md:pl-14 break-words  md:w-fit  ${dataLoad? 'loadingWrapper' : 'loadedWrapper'}`}
            >
                   <ReactTooltip
                  effect="solid"
                  className={`${tooltipCopy ? "copyTip copied" : "copyTip"}`}
                />
               {!dataLoad && <CopyWithTooltip copyValue={event?.fromHash} copyProps={copyProps} copyIdx={5}/>}
              <span className="text-[#235EF5]">{truncate(event?.fromHash, truncateSize) || "N/A"}</span>
            </p>
            </div>

            <div className="flex items-start justify-start gap-2 border-b py-4 detailsListRow">
            <div className="font-medium w-32">Destination Hash:</div>
            <p className={`md:pl-14 break-words shrink w-[calc(100%-8rem)] md:w-fit ${dataLoad? 'loadingWrapper' : 'loadedWrapper'}`}>
              <a href={`${event?.toChain && txExplorers[event?.toChain]}${event?.toHash}`} target="_blank" rel="noreferrer" className={`text-[#235EF5] ${event?.toHash ? '' : 'nonactive '}`}>{truncate(event?.toHash, truncateSize) || "N/A"}</a>
            {!dataLoad && event?.toChain &&  <CopyWithTooltip copyValue={event?.toHash} copyProps={copyProps} copyIdx={6}/>}
            </p>
                    
          </div>
          <div className="flex items-start justify-start gap-2 border-b py-4 detailsListRow">
            <div className="font-medium w-32">Departure Chain:</div>
            <p className={`md:pl-14 break-words shrink w-[calc(100%-8rem)] md:w-fit ${dataLoad? 'loadingWrapper' : 'loadedWrapper'}`}>
              <span>{event?.fromChainName || "N/A"}</span>
            </p>
          </div>
          <div className={`flex items-start justify-start gap-2 border-b py-4 detailsListRow`}>
            <div className="font-medium w-32">Destination Chain:</div>
            <p className={`md:pl-14 break-words shrink w-[calc(100%-8rem)] md:w-fit ${dataLoad? 'loadingWrapper' : 'loadedWrapper'}`}>
              <span>{event?.toChainName || "N/A"}</span>
            </p>
          </div>
          <div className="flex items-start justify-start gap-2 border-b py-4 detailsListRow">
            <div className="font-medium w-32">From:</div>

                <p className={`md:pl-14 break-words shrink w-[calc(100%-8rem)] md:w-fit ${dataLoad? 'loadingWrapper' : 'loadedWrapper'}`}>
              
                  <span className="text-[#235EF5]">
                    <a target="_blank" rel="noreferrer"    href={`${event?.fromChain && addressExplorers[event?.fromChain]}${
                        event?.senderAddress
                      }`}>{truncate(event?.senderAddress, truncateSize) || "N/A"}</a>
                  </span>
                  {!dataLoad && <CopyWithTooltip copyValue={event?.senderAddress}  copyProps={copyProps} copyIdx={7}/>}
                </p>

          </div>
          <div className="flex items-start justify-start gap-2 border-b py-4 detailsListRow">
            <div className="font-medium w-32">To:</div>
            <p className={`md:pl-14 break-words shrink w-[calc(100%-8rem)] md:w-fit ${dataLoad? 'loadingWrapper' : 'loadedWrapper'}`}>
            <a target="_blank" rel="noreferrer" href={`${event?.toChain && addressExplorers[event?.toChain]}${event?.targetAddress}`}>
                  <span className="text-[#235EF5]">
                    {truncate(event?.targetAddress, truncateSize) || "N/A"}
                  </span>
              </a>
              {!dataLoad && <CopyWithTooltip copyValue={event?.targetAddress} copyProps={copyProps} copyIdx={8}/>}
            </p>
            
          </div>
          <div className="flex items-start justify-start gap-2 border-b py-4 detailsListRow">
            <div className="font-medium w-32">Date:</div>
            <p className={`md:pl-14 break-words shrink w-[calc(100%-8rem)] md:w-fit ${dataLoad? 'loadingWrapper' : 'loadedWrapper'}`}>
              <span>
                {moment(event?.createdAt).format("YYYY/MM/DD H:mm") ?? "N/A"}
              </span>
            </p>
          </div>

          <div className="flex items-start justify-start gap-2 border-b py-4 detailsListRow">
            <div className="font-medium w-32">Status:</div>
            <p className={`md:pl-14 break-words shrink w-[calc(100%-8rem)] md:w-fit ${dataLoad? 'loadingWrapper' : 'loadedWrapper'}`}>
              <Status status={event?.status} />
            </p>
          </div>
    </div>
}
 
export default DetailsList