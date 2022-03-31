
import { IEvent } from "../ExplorerEvents";

export const truncate = function (fullStr:string | undefined, strLen:number, separator?: string) {
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


  export const loadImages = async (data: IEvent[], setEvents:(events: IEvent[]) => void  ) => {


    const newEvents = data.map(async (data:IEvent) => {

      try {
       
        const metadata = await fetchNtf(data)

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
          imgUri: (metadata.image as string),
          ...data,
        };
      } catch (e: any) {
        console.log(e);
        return { imgUri: "", ...data };
      }


    })
    setEvents(await Promise.all(newEvents));
  }


  export const fetchNtf = async (data: IEvent) => {
    const res = data.nftUri.includes("ipfs://")
    ? await fetch(
        `https://ipfs.io/ipfs/${data.nftUri.split("://")[1]}`
      )
    : await fetch(data.nftUri);


    const metadata = await res.json();

    if (metadata.displayUri) {
      return {
        image: /^ipfs:\/\//.test(metadata.displayUri)
          ? `https://ipfs.io/ipfs/${
            metadata.displayUri.split("ipfs://")[1]
            }`
          : (metadata.displayUri as string),
        ...metadata,
      };
    }

    return metadata
  }

  export const debounce = (cb:Function, delay: number) => {

    let tm : NodeJS.Timeout | undefined = undefined;
    
    return (...args:any) => {
       tm && clearTimeout(tm)
       tm = setTimeout(() => {
            cb(...args);
        }, delay)
    }
  }

  export const compose =
  (...funcs: Function[]) =>
  (comp: React.FC<any>) => {
    return funcs.reduceRight((wrapped, func) => func(wrapped), comp);
  };