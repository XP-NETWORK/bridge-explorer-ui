import React, {useState, useEffect, useRef} from 'react';
import { useParams } from 'react-router';
import { IEvent } from '../ExplorerEvents';


export const withData = function (Wrapped: React.FC<any>) {
    
    
    return function ()  {

      const [event, setEvent] = useState<IEvent>();
      const [loading, setLoading] = useState(true);
      const [metadata, setMetadata] = useState<any>();

      let params = useParams();
    useEffect(() => {
        //fetch(`http://localhost:3100/?fromHash=${params.fromHash}`)
        fetch(`https://dev-explorer-api.herokuapp.com/?fromHash=${params.fromHash}`)
          .then((res) => res.json())
          .then((data) => {
            setEvent(data[0]);
           setLoading(false)
          });
      }, []);

      useEffect(() => {
        fetch(event?.nftUri!)
          .then((res) => res.json())
          .then((metadata) => {
            setMetadata(metadata);
          });
      }, [event]);

    return <Wrapped data={{event, metadata, loading}}/>
}
}