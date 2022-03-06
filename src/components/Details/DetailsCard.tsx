import ReactTooltip from "react-tooltip";
import CopyWithTooltip from "./CopyWithTooltop";
import useIsMobile from "../../hooks/isMobile";
import { truncate } from "./helpers";
import { IEvent } from "../ExplorerEvents";
import { useEffect, useMemo, useRef, useState } from "react";
import { txExplorers } from "../../constants";
import SoundOnIcon from "../../assets/icons/sound-on.svg";
import SoundOffIcon from "../../assets/icons/sound-off.svg";

export interface DetailsCard {
  data: {
    loading: boolean;
    event: IEvent;
    metadata: any;
  };
  copyProps: {
    tooltips: any;
    tooltipCopy: number;
    setTooltipCopy: Function;
  };
}

const DetailsCard = ({ data, copyProps }: DetailsCard) => {
  const { loading: dataLoad, event, metadata } = data;
  const { tooltipCopy } = copyProps;
  const [soundOn, setSoundOn] = useState(true);
  const nftVideo = useRef<HTMLVideoElement | null>(null);

  const isMobile = useIsMobile();
  const truncateSize = useMemo(() => (isMobile ? 30 : 60), [isMobile]);

  useEffect(() => {
    console.log(metadata);
  }, [metadata]);

  // @ts-ignore
  const toggleSound = () => {
    nftVideo.current!.muted = soundOn;
    setSoundOn(!soundOn);
  };

  return (
    <div className="text-[#222222] sm:border p-1 sm:p-5 md:p-6 rounded-xl detailsCard">
      <h1 className="text-base font-medium">Sent Item {}</h1>
      <hr className="mb-5 mt-3" />

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col ">
          <div
            className={`nftWrapper  ${
              dataLoad ? "loadingWrapper" : "loadedWrapper"
            }`}
          >
            {!dataLoad && metadata && (
              <>
                {metadata?.animation_url ? (
                  <div className="relative rounded-lg overflow-hidden nftImage">
                    <video ref={nftVideo} className="z-10" autoPlay loop>
                      <source src={metadata?.animation_url} type="video/mp4" />
                    </video>
                    <button
                      onClick={toggleSound}
                      className="absolute z-20 h-10 w-10 flex items-center justify-center top-2 right-2 bg-gray-400 rounded-full"
                    >
                      <img
                        src={soundOn ? SoundOnIcon : SoundOffIcon}
                        alt="sound button"
                        width={20}
                      />
                    </button>
                  </div>
                ) : (
                  <img
                    className="rounded-lg  nftImage"
                    src={metadata?.image}
                    alt="nft preview"
                  />
                )}
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col  md:p-5  infoTextContainer desktopOnly">
          <div
            className={`flex w-full ${
              dataLoad ? "loadingWrapper" : "loadedWrapper"
            }`}
          >
            <div className="font-medium w-32">NFT Name:</div>
            <p className="break-words w-[calc(100%-8rem)] md:w-fit infoTextWrap">
              {""}
            </p>
          </div>
          <div
            className={`flex w-full  ${
              dataLoad ? "loadingWrapper" : "loadedWrapper"
            }`}
          >
            <div className="font-medium w-32">ID:</div>
            <p className="break-words w-[calc(100%-8rem)] md:w-fit infoTextWrap">
              {""}
            </p>
          </div>
          <div
            className={`flex items-start justify-start ${
              dataLoad ? "loadingWrapper" : "loadedWrapper"
            }`}
          >
            <div className="font-medium w-32 ">Transaction Hash:</div>
            <p className="break-words shrink w-[calc(100%-8rem)] md:w-fit infoTextWrap">
              <span className="text-[#235EF5]">{""}</span>
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 md:p-5  w-full infoTextContainer longCol">
          <div className="flex w-full loadedWrapper">
            <div
              className={`mobileOnly  ${
                dataLoad ? "loadingWrapper" : "loadedWrapper"
              }`}
            >
              NFT Name:
            </div>
            <div className="font-medium w-32">{dataLoad ? "" : "2.86"}</div>
          </div>
          <div className="flex w-full loadedWrapper">
            <div
              className={`mobileOnly  ${
                dataLoad ? "loadingWrapper" : "loadedWrapper"
              }`}
            >
              ID:
            </div>
            <div className="font-medium w-32">
              {dataLoad ? "" : event.tokenId}
            </div>
          </div>
          {!dataLoad && (
            <div className="flex items-start justify-start loadedWrapper">
              <ReactTooltip
                effect="solid"
                className={`${tooltipCopy ? "copyTip copied" : "copyTip"}`}
              />

              <div className="mobileOnly">Transaction Hash:</div>
              <div className="copyBtnWrapper ">
                <a
                  href={`${event?.fromChain && txExplorers[event?.fromChain]}${
                    event.fromHash
                  }`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium w-32 trxHash"
                >
                  {truncate(event.fromHash, truncateSize)}
                </a>
                <div className="copyBtnWrapper">
                  {" "}
                  {!dataLoad && (
                    <CopyWithTooltip
                      copyValue={event?.fromHash}
                      copyProps={copyProps}
                      copyIdx={1}
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsCard;
