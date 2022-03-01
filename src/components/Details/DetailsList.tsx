
import {DetailsCard} from './DetailsCard'
import ReactTooltip from "react-tooltip";
import CopyWithTooltip from './CopyWithTooltop';
import { Status } from "../Status";
import moment from 'moment'
import { truncate } from './helpers';
import useIsMobile from '../../hooks/isMobile';
import { useMemo } from 'react';
 
const DetailsList = ({data, copyProps } : DetailsCard) => {

    const {loading : dataLoad, event} = data
    const {setTooltipCopy, tooltipCopy, tooltips} = copyProps

    const isMobile = useIsMobile()
    const truncateSize = useMemo(() => isMobile? 30: 60, [isMobile])   

    console.log(isMobile);

    return <div  className="flex flex-col w-full">
             <div className="flex items-start justify-start gap-2 border-b py-4 detailsListRow">
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
            <div className="font-medium w-32">Dest Hash:</div>
            <p className={`md:pl-14 break-words shrink w-[calc(100%-8rem)] md:w-fit ${dataLoad? 'loadingWrapper' : 'loadedWrapper'}`}>
            {!dataLoad && <CopyWithTooltip copyValue={event?.fromChainName} copyProps={copyProps} copyIdx={6}/>}
              <span className="text-[#235EF5]">{truncate(event?.toHash, truncateSize) || "N/A"}</span>
            </p>
          
          </div>
          <div className="flex items-start justify-start gap-2 border-b py-4 detailsListRow">
            <div className="font-medium w-32">Source Chain:</div>
            <p className={`md:pl-14 break-words shrink w-[calc(100%-8rem)] md:w-fit ${dataLoad? 'loadingWrapper' : 'loadedWrapper'}`}>
              <span>{event?.fromChainName || "N/A"}</span>
            </p>
          </div>
          <div className={`flex items-start justify-start gap-2 border-b py-4 detailsListRow`}>
            <div className="font-medium w-32">Dest Chain:</div>
            <p className={`md:pl-14 break-words shrink w-[calc(100%-8rem)] md:w-fit ${dataLoad? 'loadingWrapper' : 'loadedWrapper'}`}>
              <span>{event?.toChainName || "N/A"}</span>
            </p>
          </div>
          <div className="flex items-start justify-start gap-2 border-b py-4 detailsListRow">
            <div className="font-medium w-32">From:</div>
            <p className={`md:pl-14 break-words shrink w-[calc(100%-8rem)] md:w-fit ${dataLoad? 'loadingWrapper' : 'loadedWrapper'}`}>
            {!dataLoad && <CopyWithTooltip copyValue={event?.targetAddress}  copyProps={copyProps} copyIdx={7}/>}
              <span className="text-[#235EF5]">
                {truncate(event?.senderAddress, truncateSize) || "N/A"}
              </span>
            </p>
         
          </div>
          <div className="flex items-start justify-start gap-2 border-b py-4 detailsListRow">
            <div className="font-medium w-32">To:</div>
            <p className={`md:pl-14 break-words shrink w-[calc(100%-8rem)] md:w-fit ${dataLoad? 'loadingWrapper' : 'loadedWrapper'}`}>
            {!dataLoad && <CopyWithTooltip copyValue={event?.targetAddress} copyProps={copyProps} copyIdx={8}/>}
              <span className="text-[#235EF5]">
                {truncate(event?.targetAddress, truncateSize) || "N/A"}
              </span>
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