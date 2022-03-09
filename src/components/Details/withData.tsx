import React, {useState, useEffect, useRef} from 'react';
import { useParams } from 'react-router';
import { IEvent } from '../ExplorerEvents';

import { url } from '../../constants';

export const withData = function (Wrapped: React.FC<any>) {
    
    
    return function ()  {

      const [event, setEvent] = useState<IEvent>();
      const [loading, setLoading] = useState(true);
      const [metadata, setMetadata] = useState<any>();

      let params = useParams();
    useEffect(() => {
        fetch(`${url}?fromHash=${params.fromHash}`)
          .then((res) => res.json())
          .then(async (data) => {
            const res = await fetch(data[0].nftUri);
            const metadata = await res.json();
            setEvent({
              ...data[0],
              name:metadata.name
            });
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