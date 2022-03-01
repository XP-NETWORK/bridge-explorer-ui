
import ReactTooltip from "react-tooltip";
import CopyWithTooltip from "./CopyWithTooltop";
import useIsMobile from '../../hooks/isMobile';
import { truncate } from "./helpers";
import {IEvent} from '../ExplorerEvents'
import { useMemo } from 'react';


export interface DetailsCard {
    data: {
        loading: boolean;
        event: IEvent;
        metadata: any;
    },
    copyProps : {
        tooltips:any;
        tooltipCopy:number;
        setTooltipCopy:Function;
    }
 
}
 
const DetailsCard = ({data, copyProps } : DetailsCard) => {

    const {loading : dataLoad, event, metadata} = data
    const { tooltipCopy} = copyProps

    const isMobile = useIsMobile()
    const truncateSize = useMemo(() => isMobile? 30: 60, [isMobile])   



    return <div className="text-[#222222] sm:border p-1 sm:p-5 md:p-6 rounded-xl detailsCard">
               <h1 className="text-base font-medium">Send Item {}</h1>
          <hr className="mb-5 mt-3" />


          <div className="flex flex-col sm:flex-row gap-4">

          <div className="flex flex-col ">
              <div className={`nftWrapper  ${dataLoad? 'loadingWrapper' : 'loadedWrapper'}`}>
             {!dataLoad && metadata && <img
              className="rounded-lg  nftImage"
              src={metadata?.image}
              alt="nft preview"
            />}
              </div>
           </div>
            <div className="flex flex-col  md:p-5  infoTextContainer desktopOnly">
              <div className={`flex w-full ${dataLoad? 'loadingWrapper' : 'loadedWrapper'}`}>
                <div className="font-medium w-32">NFT Name:</div>
                <p
                  className="break-words w-[calc(100%-8rem)] md:w-fit infoTextWrap"
                >
                  {''}
                </p>
              </div>
              <div className={`flex w-full  ${dataLoad? 'loadingWrapper' : 'loadedWrapper'}`}>
                <div className="font-medium w-32">ID:</div>
                <p
                  className="break-words w-[calc(100%-8rem)] md:w-fit infoTextWrap"

                >
                  {''}
                </p>
              </div>
              <div className={`flex items-start justify-start ${dataLoad? 'loadingWrapper' : 'loadedWrapper'}`}>
                <div className="font-medium w-32 ">Transaction Hash:</div>
                <p className="break-words shrink w-[calc(100%-8rem)] md:w-fit infoTextWrap">
                  <span className="text-[#235EF5]">
                    {''}
                  </span>
                </p>
              </div>
            </div>



            <div className="flex flex-col gap-3 md:p-5  w-full infoTextContainer longCol" >
              <div className="flex w-full loadedWrapper">
                <div className={`mobileOnly  ${dataLoad? 'loadingWrapper' : 'loadedWrapper'}`}>NFT Name:</div>
                <div className="font-medium w-32">{dataLoad ? '': '2.86' }</div>
            
              </div>
              <div className="flex w-full loadedWrapper">
                <div className={`mobileOnly  ${dataLoad? 'loadingWrapper' : 'loadedWrapper'}`}>ID:</div>
                <div className="font-medium w-32">{dataLoad ? '': '2.86' }</div>

              </div>
             {!dataLoad &&  <div className="flex items-start justify-start loadedWrapper">
              <ReactTooltip
                  effect="solid"
                  className={`${tooltipCopy ? "copyTip copied" : "copyTip"}`}
                />
           
                <div className="mobileOnly">Transaction Hash:</div>
                <div className="copyBtnWrapper"> {!dataLoad && <CopyWithTooltip copyValue={event?.fromHash} copyProps={copyProps} copyIdx={1}/>}
                <div className="font-medium w-32 trxHash">{truncate('0x1036291556ac582965d45905e5d87011e41a575c92de18b28972486a173fa92e', truncateSize)}</div>
                </div>
             
              </div>}
            </div>
          </div>
    </div>
}
 
export default DetailsCard