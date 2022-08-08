import { IEvent } from "../ExplorerEvents";
import { chains } from "../../constants";
import { ethers } from "ethers";
import BigNumber from "bignumber.js";
import axios from "axios";


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
      // const metadata = await fetchNtf(data);

      return {
        imgUri: "", //metadata.image as string,
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
  console.log(data)
  try {
    let cachRes;
    if (data.type && data.type === "Transfer" && data.tokenId && data.fromChain) {
      cachRes = await axios(`https://nft-cache.herokuapp.com/nft/data/?tokenId=${data.tokenId}&chainId=${data.fromChain}&contract=${data.fromChain === "2" ? "" : data.contract ? data.contract : ""}`)

      if (cachRes && cachRes.data !== 'no NFT with that data was found') {
        console.log("CACHE WORKED", data.fromHash, `https://nft-cache.herokuapp.com/nft/data/?tokenId=${data.tokenId}&chainId=${data.fromChain}&contract=${data.fromChain === "2" ? "" : data.contract ? data.contract : ""}`)
        return cachRes.data;
      } else {
        console.log("Didnt Find Data Inside Cache", data.fromHash)
      }

    } else if (data.type && data.type !== "Transfer" && data.originalTokenId && data.originalChainNonce) {
      cachRes = await axios(`https://nft-cache.herokuapp.com/nft/data/?tokenId=${data.originalTokenId}&chainId=${data.originalChainNonce}&contract=${data.originalChainNonce === "2" ? "" : data.originalContract ? data.originalContract : ""}`)
      if (cachRes && cachRes.data !== 'no NFT with that data was found') {
        console.log("CACHE WORKED", data.fromHash, `https://nft-cache.herokuapp.com/nft/data/?tokenId=${data.tokenId}&chainId=${data.fromChain}&contract=${data.originalChainNonce === "2" ? "" : data.originalContract ? data.originalContract : ""}`)
        return cachRes.data;
      } else {
        console.log("Didnt Find Data Inside Cache", data.fromHash, `https://nft-cache.herokuapp.com/nft/data/?tokenId=${data.tokenId}&chainId=${data.fromChain}&contract=${data.originalChainNonce === "2" ? "" : data.originalContract ? data.originalContract : ""}`)
      }
    }
    // let nakedResult = await tryNakedIFPS(data.nftUri);
    // if (nakedResult) return nakedResult;

    // const res = data.nftUri.isIPFS()
    //   ? await fetch(transformIPFS(data.nftUri))
    //   : await fetch(data.nftUri);

    // let metadata = await res.json();


    // if (metadata?.data?.image) {
    //   return {
    //     ...metadata,
    //     image: metadata?.data?.image
    //   }
    // }

    // nakedResult = await tryNakedIFPS(metadata.image || metadata.displayUri);
    // if (nakedResult) return nakedResult;

    // if (metadata.image?.isIPFS()) {

    //   const image = await fetchIPFS(metadata.image);
    //   // console.log(image);

    //   return {
    //     ...metadata,
    //     image: image ? image : transformIPFS(metadata.image, false),
    //   };
    // }

    // if (metadata.displayUri) {
    //   return {
    //     image: metadata.displayUri.isIPFS()
    //       ? transformIPFS(metadata.displayUri)
    //       : (metadata.displayUri as string),
    //     ...metadata,
    //   };
    // }

    // return metadata;
  } catch (e: any) {
    console.log(data.fromHash)
    console.log(e?.meesage)
    //@ts-ignore
    // if (e.message === "Failed to fetch") {
    //   let image = "";
    //   const res = await fetch(
    //     `https://sheltered-crag-76748.herokuapp.com/${data.nftUri}`
    //   );
    //   let metadata = await res.json();
    //   // console.log(metadata, "after fail");
    //   if (metadata.image.isIPFS()) {
    //     //const ipfs = await (await fetch(transformIPFS(metadata.image))).json();
    //     const ipfs = await (await fetch(transformIPFS(metadata.image))).json();
    //     /*image = ipfs.headers.get("content-type")?.includes("image")
    //       ? metadata.image
    //       : (await ipfs.json()).imageUrl;*/

    //     image = ipfs.imageUrl;
    //   } else {
    //     image = metadata.image;
    //   }

    //   //const image = await fetch(`https://sheltered-crag-76748.herokuapp.com/${ipfs.imageUrl}`);

    //   return {
    //     ...metadata,
    //     image,
    //   };
    // }
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

export const formatFees = (event: IEvent) => {
  if (isNaN(+event.txFees)) return 0;

  const chain = chains.find(
    (c) => c.name.toLowerCase() === event.fromChainName?.toLowerCase()
  );

  if (event.fromChain === "9") {
    return Number(new BigNumber(event.txFees).shiftedBy(-6).toString());
  }

  if (chain?.notConvert) return +event.txFees;

  return Number(ethers.utils.formatEther(event.txFees));
};

// const tryNakedIFPS = async (url: string) => {
//   if (url[0] === "Q") {
//     const res = await (await fetch("https://ipfs.io/ipfs/" + url)).json();
//     return {
//       ...res,
//       image: "https://ipfs.io/ipfs/" + res.image,
//     };
//   }
// };

// const fetchIPFS = async (ipfsUrl: string) => {
//   try {
//     const ipfs = await (await fetch(transformIPFS(ipfsUrl))).json();
//     console.log(ipfs.image, 'd');
//     if (ipfs.image[0] === "Q") {
//       return `https://ipfs.io/ipfs/${ipfs.image}`;
//     }
//     if (ipfs.displayUri.isIPFS()) {
//       return transformIPFS(ipfs.displayUri);
//     } else {
//       return ipfs.displayUri;
//     }
//   } catch (e) { }
// };

// const transformIPFS = (uri: string, cut: boolean = true) => {
//   if (!uri) return ''
//   // const base = `https://ipfs.io/ipfs/${uri.split("://")[1]}`;

//   //const trail = uri.includes('.png')? base :

//   if (!cut || /\.json|\.jpe?g/.test(uri)) {
//     return `https://ipfs.io/ipfs/${uri?.split("://")[1]}`;
//   }


//   return `https://ipfs.io/ipfs/${uri?.split("://")[1]?.split("/")[0]}`;
// };

export const extractHash = (hash: string) =>
  hash?.split("-")[hash?.split("-")?.length - 1];
