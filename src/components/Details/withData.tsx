import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import { IEvent } from "../ExplorerEvents";
import { fetchNtf } from "./helpers";
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
          setEvent({
            ...data.events[0],
          });
          setLoading(false);
        });
    }, []);

    useEffect(() => {
      
      event && fetchNtf(event).then(md =>  setMetadata(md)) 

  
    }, [event]);

    return <Wrapped data={{ event, metadata, loading }} />;
  };
};
