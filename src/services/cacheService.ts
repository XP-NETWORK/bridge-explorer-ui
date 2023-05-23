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
            toChain,
        } = event;
        let chain, token, collectionIdent, uri;
        switch (type) {
            case "Transfer":
                if (tokenId && fromChain) {
                    chain = fromChain;
                    token = tokenId;
                    collectionIdent =
                        toChain === "24" ? contract?.split(",")[1] : contract;
                    break;
                }
                break;

            case "Unfreeze":
                if (originalChainNonce && originalTokenId) {
                    chain = originalChainNonce;
                    token = originalTokenId;
                    collectionIdent = originalContract;
                    break;
                }
                break;
        }
        console.log(token, "token");
        return { chain, token, collectionIdent, uri };
    }

    async get(event: IEvent) {
        // console.log(event);
        switch (true) {
            // case event?.type === "Transfer" && event.chainName === "TON":
            //   return this.getByUri(event?.nftUri)

            case event?.type === "Unfreeze" &&
                event.originalChainNonce === "27":
                return this.getByData({
                    chain: event.originalChainNonce,
                    token: event.originalContract,
                    collectionIdent: event.originalContract,
                });

            default:
                const { chain, token, collectionIdent } = this.getParams(event);
                return this.getByData({ chain, token, collectionIdent });
        }
    }

    async getByUri(uri: string | undefined) {
        // console.log({ uri });

        return axios
            .get(
                `${this.service}/nft/uri/?uri=${encodeURIComponent(uri || "")}`
            )
            .then((res) => res.data)
            .catch(() => {});
    }

    async getByData(params: any) {
        return axios
            .get(
                `${this.service}/nft/data/?tokenId=${params.token}&chainId=${params.chain}&contract=${params.collectionIdent}`
            )
            .then((res) => res.data)
            .catch(() => {});
    }

    // async add(event: IEvent) {
    //   let { chain, token, collectionIdent } = this.getParams(event);

    //   let uri, origin, native;

    //   const { originalUri, nftUri } = event;

    //   if (originalUri) {
    //     uri = originalUri;
    //     origin = chain;
    //     native = {
    //       tokenId: token,
    //       contract: collectionIdent,
    //     };
    //   } else {
    //     if (/(wnfts\.xp\.network|nft\.xp\.network)/.test(nftUri)) {
    //       console.log("here");
    //       const res = await axios(nftUri);

    //       const wrapped = res.data?.wrapped;

    //       collectionIdent = wrapped?.contract;
    //       uri = wrapped?.original_uri;
    //       origin = wrapped?.origin;
    //       native = wrapped;
    //     } else {
    //       uri = nftUri;
    //       origin = chain;
    //       native = {
    //         tokenId: token,
    //         contract: collectionIdent,
    //       };
    //     }
    //   }

    //   const nft = {
    //     collectionIdent,
    //     uri,
    //     native: {
    //       ...native,
    //       chainId: origin,
    //     },
    //   };

    //   const parsed = await axios.post(`${this.service}/nft/add`, {
    //     nft,
    //     account: "",
    //     whitelisted: true,
    //   });

    //   const { data: parsedData } = parsed;

    //   return parsedData.metaData || parsedData;
    // }
}

export default () => new CacheService();
