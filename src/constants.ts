import GT from "./assets/icons/gate.svg";
import Tron from "./assets/chains/tron.svg";
import Vechain from "./assets/icons/vechain.png";
import Algorand from "./assets/chains/algorand.svg";
import Secret from "./assets/icons/secret.svg";
import Moonbeam from "./assets/icons/moonbeam.svg";
import Abeychain from "./assets/icons/Abey.svg";
import Dfinity from "./assets/icons/dfinity.svg";
import Skale from "./assets/icons/skale.svg";
import Ton from "./assets/chains/ton.svg";
import Caduceus from "./assets/icons/caduceus.svg";
import OKC from "./assets/icons/OKC.svg";
import Arbitrum from "./assets/icons/arbitrum.svg";
import NearWallet from "./assets/icons/NearWallet.svg";
import Multi from "./assets/icons/elrond.svg";
import Solana from "./assets/icons/solana.svg";
import Hedera from "./assets/icons/Hedera.svg";
import Aptos from "./assets/icons/aptos.svg";
import optimism from "./assets/icons/optimism.svg";

import casper from "./assets/icons/casper.svg";

export const currency: any = {
    "4": "BNB",
    "19": "VLX",
    "14": "xDAI",
    "2": "EGLD",
    "20": "IOTX",
    "16": "Fuse",
    "6": "AVAX",
    "21": "AETH",
    "7": "MATIC",
    "5": "ETH",
    "8": "FTM",
    "12": "ONE",
    "18": "TEZ",
    "23": "GT",
    "9": "TRX",
    "25": "VET",
    "15": "ALGOS",
    "22": "CKB",
    "24": "SCRT",
    "32": "GLMR",
    "33": "ABEY",
    "28": "ICP",
    "27": "TON",
    "35": "CMP",
    "37": "ETH",
    "31": "Near",
    "26": "SOL",
    "29": "HBAR",
    "34": "APT",
    "40": "ETH",
    "38": "ETH",
    "39": "CSPR",
};

export const txExplorers: any = {
    "2": "https://testnet-explorer.elrond.com/transactions/",

    "4": "https://testnet.bscscan.com/tx/",
    "5": "https://goerli.etherscan.io/tx/",
    "6": "https://testnet.snowtrace.io/tx/",
    "7": "https://mumbai.polygonscan.com/tx/",
    "8": "https://testnet.ftmscan.com/tx/",
    "9": "https://shasta.tronscan.org/#/transaction/",

    "12": "https://explorer.testnet.harmony.one/tx/",

    "14": "https://blockscout.com/xdai/testnet/tx/",
    "15": "https://testnet.algoexplorer.io/tx/",
    "16": "https://explorer.fusespark.io/tx/",

    "18": "https://ghostnet.tzkt.io/",
    "19": "https://explorer.testnet.velas.com/tx/",
    "20": "https://testnet.iotexscan.io/tx/",
    "21": "hhttps://testnet.aurorascan.dev/tx/",
    "22": "https://v1.testnet.gwscan.com/tx/",
    "23": "https://gatescan.org/testnet/tx/",
    "24": "https://secretnodes.com/pulsar/transactions/",
    "25": "https://explore-testnet.vechain.org/transactions/",
    "27": "https://testnet.tonscan.org/tx/",
    "28": "https://dashboard.internetcomputer.org/account/",
    "29": "https://hashscan.io/testnet/transactionsById/",
    "30": "https://rapping-zuben-elakrab.explorer.staging-v2.skalenodes.com/tx/",
    "31": "https://explorer.testnet.near.org/transactions/",
    "32": "https://moonbase.moonscan.io/tx/",
    "33": "https://testnet-explorer.abeychain.com/tx/",
    "34": "https://explorer.aptoslabs.com/txn/",
    "35": "https://galaxy.scan.caduceus.foundation/tx/",
    "36": "https://www.oklink.com/okc-test/",
    "37": "https://goerli-rollup-explorer.arbitrum.io/tx/",
    "38": "https://testnet-explorer.brisescan.com/tx/",
    "39": "https://testnet.cspr.live/deploy/",
    "40": "https://goerli-optimism.etherscan.io/tx/",
    "41": "https://explorer.zetachain.com/cc/tx/",
    "42": "https://explorer.test.energi.network/tx/",
    "43": "https://goerli.basescan.org/tx/",
};

export const addressExplorers: any = {
    "2": "https://testnet-explorer.elrond.com/address/",

    "4": "https://testnet.bscscan.com/address/",
    "5": "https://goerli.etherscan.io/address/",
    "6": "https://testnet.snowtrace.io/address/",
    "7": "https://mumbai.polygonscan.com/address/",
    "8": "https://testnet.ftmscan.com/address/",
    "9": "https://shasta.tronscan.org/#/address/",

    "12": "https://explorer.testnet.harmony.one/address/",

    "14": "https://blockscout.com/xdai/testnet/address/",
    "15": "https://testnet.algoexplorer.io/address/",
    "16": "https://explorer.fusespark.io/address/",

    "18": "https://ghostnet.tzkt.io/",
    "19": "https://explorer.testnet.velas.com/address/",
    "20": "https://testnet.iotexscan.io/address/",
    "21": "https://testnet.aurorascan.dev/address",
    "22": "https://v1.testnet.gwscan.com/account/",
    "23": "https://gatescan.org/testnet/address/",
    "24": "https://secretnodes.com/pulsar/accounts/",
    "25": "https://explore-testnet.vechain.org/accounts/",

    "27": "https://testnet.tonscan.org/address/",
    "28": "https://dashboard.internetcomputer.org/account/",
    "29": "https://hashscan.io/testnet/account/",
    "30": "https://rapping-zuben-elakrab.explorer.staging-v2.skalenodes.com/address/",
    "31": "https://explorer.testnet.near.org/accounts/",
    "32": "https://moonbase.moonscan.io/address/",
    "33": "https://testnet-explorer.abeychain.com/address/",
    "34": "https://explorer.aptoslabs.com/account/",
    "35": "https://galaxy.scan.caduceus.foundation/address/",
    "36": "https://www.oklink.com/en/okc-test/address/",
    "37": "https://goerli-rollup-explorer.arbitrum.io/address/",
    "38": "https://testnet-explorer.brisescan.com/address/",
    "39": "https://testnet.cspr.live/address/",
    "40": "https://goerli-optimism.etherscan.io/address/",
    "41": "https://explorer.zetachain.com/address/",
    "42": "https://explorer.test.energi.network/address/",
    "43": "https://goerli.basescan.org/address/",
};

export const collectionExplorers: any = {
    ...Object.entries(addressExplorers).reduce(
        (acc: Object, [k, v]) => ({
            ...acc,
            [k]: (v as string).replace(/(address|accounts?)\/$/, "token/"),
        }),
        {}
    ),
    "25": "https://explore-testnet.vechain.org/account/",
    "22": "https://v1.testnet.gwscan.com/nft-collection/",
    "14": "https://blockscout.com/xdai/testnet/address/",
    "20": "https://testnet.iotexscan.io/address/",
    "9": "https://shasta.tronscan.org/#/contract/",
    "39": "https://testnet.cspr.live/contract-package/",
};

export const chainNoncetoName: any = {
    "0": "Unknown",
    "4": "BSC",
    "19": "Velas",
    "14": "Gnosis",
    "2": "Elrond",
    "20": "Iotex",
    "6": "Avalanche",
    "16": "Fuse",
    "21": "Aurora",
    "7": "Polygon",
    "5": "Ethereum",
    "8": "Fantom",
    "12": "Harmony",
    "18": "Tezos",
    "23": "GateChain",
    "9": "Tron",
    "25": "Vechain",
    "15": "Algorand",
    "22": "Godwoken",
    "24": "Secret",
    "32": "Moonbeam",
    "33": "ABEYCHAIN",
    "28": "Internet Computer",
    "30": "Skale",
    "27": "Ton",
    "35": "Caduceus",
    "36": "OKC",
    "37": "Arbitrum",
    "31": "Near",
    "26": "Solana",
    "29": "Hedera",
    "34": "Aptos",
    "40": "Optimism",
    "39": "Casper",
};

export const _headers = {
    Accept: "*",
    "Content-Type": "application/json",
};

// IDs from coingecko
export const chains = [
    {
        id: "ethereum",
        name: "Aurora",
        icon: "./assets/icons/aurora.svg",
    },
    { id: "binancecoin", name: "BSC", icon: "./assets/icons/bsc.svg" },
    { id: "ethereum", name: "Ethereum", icon: "./assets/icons/ethereum.svg" },
    { id: "velas", name: "Velas", icon: "./assets/icons/velas.svg" },
    {
        id: "matic-network",
        name: "Polygon",
        icon: "./assets/icons/polygon.svg",
    },
    {
        id: "avalanche-2",
        name: "Avalanche",
        icon: "./assets/icons/avalanche.svg",
    },
    { id: "iotex", name: "Iotex", icon: "./assets/icons/iotex.svg" },
    { id: "fantom", name: "Fantom", icon: "./assets/icons/fantom.svg" },
    // { id: "celo", name: "Celo", icon: "./assets/icons/celo.svg" },
    { id: "harmony", name: "Harmony", icon: "./assets/icons/harmony.svg" },
    { id: "xdai", name: "Gnosis", icon: "./assets/icons/gnosis.svg" },
    { id: "fuse-network-token", name: "Fuse", icon: "./assets/icons/fuse.svg" },
    // { id: "unique-one", name: "Unique", icon: "./assets/icons/unique.svg" }, // TODO: check if this is correct
    { id: "elrond-erd-2", name: "Elrond", icon: Multi },
    { id: "tezos", name: "Tezos", icon: "./assets/icons/tezos.svg" },
    { id: "gatechain-token", name: "GateChain", icon: GT },
    { id: "tron", name: "Tron", icon: Tron, dec: -6 },
    { id: "vechain", name: "Vechain", icon: Vechain },
    { id: "algorand", name: "Algorand", icon: Algorand, notConvert: true },
    {
        id: "nervos-network",
        name: "Godwoken",
        icon: "./assets/icons/godwoken.svg",
    },
    { id: "secret", name: "Secret", icon: Secret, dec: -6 },
    { id: "moonbeam", name: "Moonbeam", icon: Moonbeam },
    { id: "abeychain", name: "ABEYCHAIN", icon: Abeychain },
    { id: "ethereum", name: "Optimism", icon: optimism },
    { id: "skale", name: "Skale", icon: Skale },
    {
        id: "the-open-network",
        name: "Ton",
        icon: Ton,
        notConvert: true,
        dec: -9,
    },
    { id: "caduceus", name: "Caduceus", icon: Caduceus },
    { id: "oec-token", name: "OKC", icon: OKC },
    { id: "ethereum", name: "arbitrum", icon: Arbitrum },
    { id: "near", name: "Near", icon: NearWallet },
    { id: "solana", name: "Solana", icon: Solana, notConvert: true, dec: -9 },
    { id: "hedera-hashgraph", name: "Hedera", icon: Hedera, dec: -8 },
    { id: "aptos", name: "Aptos", icon: Aptos, dec: -8 },
    { id: "casper-network", name: "Casper", icon: casper, dec: -9 },
    {
        id: "internet-computer",
        name: "Internet Computer",
        icon: Dfinity,
        dec: -8,
    },
];

export const url = "https://testnet-explorer-api.herokuapp.com/";
export const socketUrl = "wss://testnet-explorer-api.herokuapp.com/";
//export const scraperSocketUrl = "wss://explorer-scraper.herokuapp.com/";
//export const destScraperSocketUrl = "wss://dest-scraper.herokuapp.com/";

// export const url = "http://localhost:3100/";
//export const socketUrl = "ws://localhost:3100";

/*export const setTelegram = async (destination: string, error: any) => {
    // console.log("got here")
    await axios.get(
        `https://api.telegram.org/bot5434178910:AAF7EpfcDyvsLG_pAIv-SXVRU6bYBqjlqKo/sendMessage?chat_id=-721145192&text=Error on ${destination} ,  Message : ${error}&parse_mode=HTML`
    );
};*/
