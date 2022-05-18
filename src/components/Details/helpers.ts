import { IEvent } from "../ExplorerEvents";
import {chains} from '../../constants' 
import { ethers } from "ethers";

export const truncate = function (
  fullStr: string | undefined,
  strLen: number,
  separator?: string
) {
  if (!fullStr) return;
  if (fullStr.length <= strLen) return fullStr;

  separator = separator || "...";

  var sepLen = separator.length,
    charsToShow = strLen - sepLen,
    frontChars = Math.ceil(charsToShow / 2),
    backChars = Math.floor(charsToShow / 2);

  return (
    fullStr.substr(0, frontChars) +
    separator +
    fullStr.substr(fullStr.length - backChars)
  );
};

export const loadImages = async (
  data: IEvent[],
  setEvents: (events: IEvent[]) => void
) => {
  const newEvents = data.map(async (data: IEvent) => {
    try {
      const metadata = await fetchNtf(data);

      /*if (metadata.displayUri) {
          return {
            imgUri: /^ipfs:\/\//.test(metadata.displayUri)
              ? `https://ipfs.io/ipfs/${
                metadata.displayUri.split("ipfs://")[1]
                }`
              : (metadata.displayUri as string),
            ...data,
          };
        }*/

      return {
        imgUri: metadata.image as string,
        ...data,
      };
    } catch (e: any) {
      console.log(e);
      return { imgUri: "", ...data };
    }
  });
  setEvents(await Promise.all(newEvents));
};

export const fetchNtf = async (data: IEvent) => {
  try {
    const res = data.nftUri.isIPFS()
      ? await fetch(`https://ipfs.io/ipfs/${data.nftUri.split("://")[1]}`)
      : await fetch(data.nftUri);

    let metadata = await res.json();

    // if (metadata.wrapped) {
    //metadata = await fetch(metadata.image).then(res => res.json());
    //}
////////////////////////////////////////////////
    if (metadata.image.isIPFS()) {
      const image = await fetchIPFS(metadata.image)
      console.log(image,' image');
  
      return {
        ...metadata,
        image
      }
    }

    if (metadata.displayUri) {
      return {
        image: metadata.displayUri.isIPFS()
          ? `https://ipfs.io/ipfs/${metadata.displayUri.split("ipfs://")[1]}`
          : (metadata.displayUri as string),
        ...metadata,
      };
    }

    return metadata;
  } catch (e) {
    //@ts-ignore
    if (e.message === 'Failed to fetch') {

      let image = ''
      const res = await fetch(`https://sheltered-crag-76748.herokuapp.com/${data.nftUri}`);
      let metadata = await res.json();

      if (metadata.image.includes("ipfs://")) {
         const ipfs = await (await fetch(`https://ipfs.io/ipfs/${metadata.image.split("://")[1].split('/')[0]}`)).json();
         image = ipfs.imageUrl
      } else {
          image = metadata.image
      }
  
      //const image = await fetch(`https://sheltered-crag-76748.herokuapp.com/${ipfs.imageUrl}`);
      
      
      return {
        ...metadata,
        image
      }
    }
  }
};

export const debounce = (cb: Function, delay: number) => {
  let tm: NodeJS.Timeout | undefined = undefined;

  return (...args: any) => {
    tm && clearTimeout(tm);
    tm = setTimeout(() => {
      cb(...args);
    }, delay);
  };
};

export const compose =
  (...funcs: Function[]) =>
  (comp: React.FC<any>) => {
    return funcs.reduceRight((wrapped, func) => func(wrapped), comp);
  };



  export const formatFees = (event: IEvent) =>  {

    if (isNaN(+event.txFees)) return 0;

    const chain = chains.find(c => c.name.toLowerCase() === event.fromChainName?.toLowerCase() )

    if (chain?.notConvert) return +event.txFees;

    return Number(ethers.utils.formatEther(event.txFees))
  }

const fetchIPFS = async (ipfsUrl:string) => {
  try {
      const ipfs = await (await fetch(`https://ipfs.io/ipfs/${ipfsUrl.split("://")[1].split('/')[0]}`)).json();
      console.log(ipfs, 'ipfs');
      if (ipfs.displayUri.isIPFS()) {
          return 'https://ipfs.io/ipfs/' + ipfs.displayUri.split('ipfs://')[1]
      } else {
        return ipfs.displayUri
      }

  } catch (e) {

  }
}