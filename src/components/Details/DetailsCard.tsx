import ReactTooltip from "react-tooltip";
import CopyWithTooltip from "./CopyWithTooltop";
import useIsMobile from "../../hooks/isMobile";
import { truncate } from "./helpers";
import { IEvent } from "../ExplorerEvents";
import { useEffect, useMemo, useRef, useState } from "react";
import { txExplorers } from "../../constants";
import SoundOnIcon from "../../assets/icons/sound-on.svg";
import SoundOffIcon from "../../assets/icons/sound-off.svg";
import { ImgOrFail } from "../elements/ImgOrFail";
import { LoaderRow } from "../elements/LoaderRow";
import { extractHash } from "./helpers";

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
  const [soundOn, setSoundOn] = useState(false);
  const [hasSound, setHasSound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sexyClass, setSexyClass] = useState("rounded-lg  nftImage aspect-square ");
  const nftVideo = useRef<HTMLVideoElement | null>(null);

  const isMobile = useIsMobile();
  const truncateSize = useMemo(() => (isMobile ? 33 : 60), [isMobile]);

  // @ts-ignore
  const toggleSound = () => {
    nftVideo.current!.muted = soundOn;
    setSoundOn(!soundOn);
  };

  const hasAudio = (video: any) => {
    return (
      video?.mozHasAudio ||
      Boolean(video?.webkitAudioDecodedByteCount) ||
      Boolean(video?.audioTracks && video?.audioTracks.length)
    );
  };
  useEffect(() => {
    if (data) {
      // console.log(data, "md");
      // console.log(nftVideo);
      // nftVideo?.current?.addEventListener("loadeddata", videoHandler);
      // console.log(hasAudio(nftVideo));
      setHasSound(hasAudio(nftVideo?.current));
      nftVideo?.current?.play();
      checkSexyness()
    }
  }, [isLoading,metadata]);

  const checkSexyness = () :void =>{
    if(metadata !== undefined){
    const uri  = metadata?.properties?.external_url || metadata?.image ;
    const isNftSexy = uri?.includes("treatdao");
    const blurClass =  isNftSexy? "rounded-lg  nftImage aspect-square blur" : "rounded-lg  nftImage aspect-square";
    setSexyClass(blurClass)
  }
  }

  return (
    <div className="text-[#222222] overflow-hidden sm:border p-1 sm:p-5 md:p-6 rounded-xl detailsCard">
      <h1 className="text-base font-medium">{metadata?.name}</h1>
      <hr className="mb-5 mt-3" />

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col ">
          <div
            className={`nftWrapper aspect-square  ${
              isLoading ? "loadingWrapper" : "loadedWrapper"
            }`}
          >
            {metadata?.animation_url ? (
              <div className="relative rounded-lg overflow-hidden nftImage">
                <video
                  ref={nftVideo}
                  poster={metadata?.image}
                  className="z-10 aspect-square"
                  playsInline
                  autoPlay
                  muted
                  loop
                  style={{ display: isLoading ? "none" : "block" }}
                  onLoadStart={() => {
                    setIsLoading(true);
                  }}
                  onLoadedData={() => {
                    setIsLoading(false);
                  }}
                >
                  <source src={metadata?.animation_url} type="video/mp4" />
                </video>
                {hasSound && (
                  <button
                    onClick={toggleSound}
                    className="absolute z-20 h-7 w-7 flex items-center justify-center top-2 right-2 bg-white rounded-full"
                  >
                    <img
                      src={soundOn ? SoundOnIcon : SoundOffIcon}
                      alt="sound button"
                      width={14}
                      onLoadStart={() => {
                        setIsLoading(true);
                      }}
                      onLoadedData={() => {
                        setIsLoading(false);
                      }}
                    />
                  </button>
                )}
              </div>
            ) : (
              metadata?.image && (
                <ImgOrFail
                  alt="nft preview"
                  className={sexyClass}
                  src={metadata?.image}
                  width={3}
                  height={3}
                />
              )
            )}
          </div>
        </div>
        <div className="flex flex-col  md:p-5  infoTextContainer desktopOnly">
          <div
            className={`flex w-full ${
              dataLoad ? "loadingWrapper" : "loadedWrapper"
            }`}
          >
            <div className="font-medium w-32">Collection Name:</div>
            <p className="break-words w-[calc(100%-8rem)] md:w-fit infoTextWrap"></p>
          </div>
          {false && (
            <div
              className={`flex w-full ${
                dataLoad ? "loadingWrapper" : "loadedWrapper"
              }`}
            >
              <div className="font-medium w-32">Collection Name:</div>
              <p className="break-words w-[calc(100%-8rem)] md:w-fit infoTextWrap"></p>
            </div>
          )}
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
                dataLoad || !metadata ? "loadingWrapper" : "loadedWrapper"
              }`}
            >
               Collection Name:
            </div>
            <div className={`break text-[#222222] w-full mobileCollection ${
                dataLoad || !metadata ? "loadingWrapper" : "loadedWrapper"
              }`}>
              {/* {console.log(metadata)} */}
              {dataLoad || !metadata? "loading..." : metadata?.nftContract || metadata?.name || 'unknown'}
            </div>
          </div>

          {false && (
            <div className="flex w-full loadedWrapper">
              <div
                className={`mobileOnly  ${
                  dataLoad ? "loadingWrapper" : "loadedWrapper"
                }`}
              >
                Collection Name:
              </div>
              <div className="break text-[#222222] w-full">
                {dataLoad ? "" : metadata?.name}
              </div>
            </div>
          )}

          <div className="flex w-full loadedWrapper">
            <div
              className={`mobileOnly  ${
                dataLoad ? "loadingWrapper" : "loadedWrapper"
              }`}
            >
              ID:
            </div>
            <div className="text-[#222222] w-32">
              {dataLoad ? "" : event.tokenId}
            </div>
          </div>
          {!dataLoad && (
            <div className="flex items-start justify-start loadedWrapper trxWrapper">
              <ReactTooltip
                effect="solid"
                className={`${tooltipCopy ? "copyTip copied" : "copyTip"}`}
              />

              <div className="mobileOnly boldTxt">Transaction Hash:</div>
              <div className="copyBtnWrapper ">
                <a
                  href={`${
                    event?.fromChain && txExplorers[event?.fromChain]
                  }${extractHash(event?.fromHash)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#222222] w-32 trxHash"
                >
                  {truncate(extractHash(event?.fromHash), truncateSize)}
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
