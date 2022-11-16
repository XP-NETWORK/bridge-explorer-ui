import axios from "axios";

import { IEvent } from "../components/ExplorerEvents";

class CacheService {
  service = "https://nft-cache.herokuapp.com"; //"https://nft-cache.herokuapp.com";//http://localhost:3030

  getParams(event: IEvent) {
    const {
      type,
      tokenId,
      fromChain,
      contract,
      originalTokenId,
      originalChainNonce,
      originalContract,
      nftUri
    } = event;
    let chain, token, collectionIdent;
    switch (type) {
      case "Transfer":
        if (tokenId && fromChain) {
          chain = fromChain;
          token = tokenId;
          collectionIdent = contract;
          break;
        }
        break;

      case "Unfreeze":
        if ( originalChainNonce && originalTokenId ) {
          chain = originalChainNonce;
          token = originalTokenId;
          collectionIdent = originalContract;
          break;
        }
        break;
    }

    return { chain, token, collectionIdent, nftUri };
  }

  async get(event: IEvent) {
    const { chain, token, collectionIdent, nftUri } = this.getParams(event);

    if (chain === "27") {
      return axios
        .get(
          `${this.service}/nft/uri/?uri=${encodeURIComponent(nftUri)}`
        )
        .then((res) => res.data)
        .catch(() => { });

    } else {
      return axios
        .get(
          `${this.service}/nft/data/?tokenId=${token}&chainId=${chain}&contract=${collectionIdent}`
        )
        .then((res) => res.data)
        .catch(() => { });
    }
  }

  async add(event: IEvent) {
    let { chain, token, collectionIdent } = this.getParams(event);

    let uri, origin, native;

    const { originalUri, nftUri } = event;

    if (originalUri) {
      uri = originalUri;
      origin = chain;
      native = {
        tokenId: token,
        contract: collectionIdent,
      };
    } else {
      if (/(wnfts\.xp\.network|nft\.xp\.network)/.test(nftUri)) {
        console.log("here");
        const res = await axios(nftUri);

        const wrapped = res.data?.wrapped;

        collectionIdent = wrapped?.contract;
        uri = wrapped?.original_uri;
        origin = wrapped?.origin;
        native = wrapped;
      } else {
        uri = nftUri;
        origin = chain;
        native = {
          tokenId: token,
          contract: collectionIdent,
        };
      }
    }

    const nft = {
      collectionIdent,
      uri,
      native: {
        ...native,
        chainId: origin,
      },
    };

    const parsed = await axios.post(`${this.service}/nft/add`, {
      nft,
      account: "",
      whitelisted: true,
    });

    const { data: parsedData } = parsed;

    return parsedData.metaData || parsedData;
  }
}

export default () => new CacheService();
