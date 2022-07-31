import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { ImgOrFail } from "../elements/ImgOrFail";
import { IEvent } from "../ExplorerEvents";
import ImgBroken from "../../assets/img-broken.png";
import { Loader } from "../elements/Loader";
import { fetchNtf } from "../Details/helpers";

export const RowNFT = ({ event }: { event: IEvent }) => {
  const nftrow = useRef(null);
  const [isVisible, setVisible] = useState(false);
  const [imgUrl, setLoaded] = useState("");
  const [fetching, setFetching] = useState(true);
  const isNftSexy = event?.nftUri?.includes("treatdao")
  const specificTokenId = event?.tokenId === "30517440993403660343476421412" ? true : false
  const blurClass = isNftSexy || specificTokenId? "rounded-lg  blurList" : "rounded-lg "

  const observer = new IntersectionObserver(async (entries) => {

    const [entry] = entries;
      setVisible(entry.isIntersecting)
  }, {
    root: document.getElementById("#root"),
    threshold: .1,
  });

  useEffect(() => {
    nftrow.current && observer.observe(nftrow.current);
    return () => console.log('OPULUS');
  }, [nftrow]);

  useEffect(() => {
    if (isVisible && !imgUrl) {
      if (!event.nftUri) return  setFetching(false)
      fetchNtf(event).then(metadata => {
        if (metadata.image) {
          return setLoaded(metadata.image)
        }
     }).catch((e) => {
        setFetching(false)
     })
    }
  }, [isVisible])

  return (
    <div className="nftRow" ref={nftrow}>
      <div className={`${fetching ? "loadingWrapper rowNftWrapper": ""}`}>
        <ImgOrFail
          className={blurClass} 
          setFetching={setFetching}
          src={imgUrl || event?.nftUri}
          width={38}
          height={38}
          alt={""}
        />
      </div>
    </div>
  );
};
