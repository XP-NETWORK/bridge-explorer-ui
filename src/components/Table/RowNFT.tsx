import React, { useEffect, useRef, useState } from "react";
import { ImgOrFail } from "../elements/ImgOrFail";
import { IEvent } from "../ExplorerEvents";
import { fetchNtf } from "../Details/helpers";

export const RowNFT = ({ event }: { event: IEvent }) => {
    const nftrow = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isVisible, setVisible] = useState(false);
    const [imgUrl, setLoaded] = useState({
        animation_url: "",
        image: "",
    });
    const [fetching, setFetching] = useState(true);
    const isNftSexy = event?.nftUri?.includes("treatdao");
    const specificTokenId =
        event?.tokenId === "30517440993403660343476421412" ? true : false;
    const blurClass =
        isNftSexy || specificTokenId ? "rounded-lg  blurList" : "rounded-lg ";

    const observer = new IntersectionObserver(
        async (entries) => {
            const [entry] = entries;
            setVisible(entry.isIntersecting);
        },
        {
            root: document.getElementById("#root"),
            threshold: 0.1,
        }
    );

    useEffect(() => {
        if (nftrow.current) observer.observe(nftrow.current);
        return () =>
            nftrow?.current ? observer.unobserve(nftrow.current) : undefined;
    }, [nftrow]);

    useEffect(() => {
        if (isVisible) {
            fetchNtf(event)
                .then((metadata) => {
                    if (metadata) {
                        return setLoaded(metadata);
                    }
                })
                .catch((e) => {
                    setFetching(false);
                });
        }
    }, [isVisible, event]);

    return (
        <div className="nftRow" ref={nftrow}>
            <div
                className={`${fetching ? "loadingWrapper rowNftWrapper" : ""}`}
            >
                {imgUrl?.image ? (
                    <ImgOrFail
                        className={blurClass}
                        setFetching={setFetching}
                        src={imgUrl?.image}
                        width={38}
                        height={38}
                        alt={""}
                    />
                ) : (
                    imgUrl?.animation_url && (
                        <div className="relative rounded-lg overflow-hidden nftImage">
                            <video
                                // ref={imgUrl?.animation_url}
                                poster={imgUrl?.image}
                                className="z-10 aspect-square"
                                playsInline
                                autoPlay
                                muted
                                loop
                                style={{
                                    display: isLoading ? "none" : "block",
                                }}
                                onLoadStart={() => {
                                    setIsLoading(true);
                                }}
                                onLoadedData={() => {
                                    setIsLoading(false);
                                }}
                            >
                                <source
                                    src={imgUrl?.animation_url}
                                    type="video/mp4"
                                />
                            </video>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};
