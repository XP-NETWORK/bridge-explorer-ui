import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import { IEvent } from "../ExplorerEvents";

import { url } from "../../constants";

export const withData = function (Wrapped: React.FC<any>) {
  return function () {
    const [event, setEvent] = useState<IEvent>();
    const [loading, setLoading] = useState(true);
    const [metadata, setMetadata] = useState<any>();

    let params = useParams();
    useEffect(() => {
      fetch(`${url}?fromHash=${params.fromHash}`)
        .then((res) => res.json())
        .then(async (data) => {
          // const res = data[0].nftUri.includes('ipfs://')? await fetch(`https://ipfs.io/ipfs/${data[0].nftUri.split('://')[1]}`) : await fetch(data[0].nftUri);
          //console.log(res, 'ds');
          //const metadata = await res.json();
          setEvent({
            ...data[0],
            // name:metadata.name
          });
          setLoading(false);
        });
    }, []);

    useEffect(() => {
      fetch(
        `${
          event?.nftUri.includes("ipfs://")
            ? "https://ipfs.io/ipfs/" + event?.nftUri.split("://")[1]
            : event?.nftUri
        }`
      )
        .then((res) => res.json())
        .then((metadata) => {
          metadata.image = /^ipfs:\/\//.test(metadata.image)
            ? `https://ipfs.io/ipfs/${metadata.image.split("ipfs://")[1]}`
            : metadata.image;
          setMetadata(metadata);
        });
    }, [event]);

    return <Wrapped data={{ event, metadata, loading }} />;
  };
};
