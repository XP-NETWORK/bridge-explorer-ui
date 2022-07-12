import GT from "./assets/icons/gate.svg";
import Tron from "./assets/chains/tron.svg";
import Vechain from "./assets/chains/Vechain.png";
import Algorand from "./assets/chains/algorand.svg";
import axios from "axios";

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
};

export const txExplorers: any = {
  "4": "https://bscscan.com/tx/",
  "19": "https://explorer.velas.com/tx/",
  "14": "https://blockscout.com/xdai/mainnet/tx/",
  "2": "https://explorer.elrond.com/transactions/",
  "20": "https://iotexscan.io/tx/",
  "6": "https://snowtrace.io/tx/",
  "16": "https://explorer.fuse.io/tx/",
  "21": "https://explorer.mainnet.aurora.dev/tx/",
  "7": "https://polygonscan.com/tx/",
  "5": "https://etherscan.io/tx/",
  "8": "https://ftmscan.com/tx/",
  "12": "https://explorer.harmony.one/tx/",
  "18": "https://tezblock.io/transaction/",
  "23": "https://gatescan.org/tx/",
  "9": "https://tronscan.org/#/transaction/",
  "25": "https://explore.vechain.org/transactions/",
  "15": "https://algoexplorer.io/tx/",
};

export const addressExplorers: any = {
  "4": "https://bscscan.com//address/",
  "19": "https://explorer.velas.com/address/",
  "14": "https://blockscout.com/xdai/mainnet/address/",
  "2": "https://explorer.elrond.com/accounts/",
  "20": "https://iotexscan.io/address/",
  "6": "https://snowtrace.io/address/",
  "16": "https://explorer.fuse.io/address/",
  "21": "https://explorer.mainnet.aurora.dev/address/",
  "7": "https://polygonscan.com/address/",
  "5": "https://etherscan.io/address/",
  "8": "https://ftmscan.com/address/",
  "12": "https://explorer.harmony.one/address/",
  "18": "https://tezblock.io/account/",
  "23": "https://gatescan.org/address/",
  "9": "https://tronscan.org/#/address/",
  "25": "https://explore.vechain.org/accounts/",
  "15": "https://algoexplorer.io/address/",
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
};

export const _headers = {
  Accept: "*",
  "Content-Type": "application/json",
};

// IDs from coingecko
export const chains = [
  {
    id: "aurora-near",
    name: "Aurora",
    icon: "./assets/icons/aurora.svg",
  },
  { id: "binancecoin", name: "BSC", icon: "./assets/icons/bsc.svg" },
  { id: "ethereum", name: "Ethereum", icon: "./assets/icons/ethereum.svg" },
  { id: "velas", name: "Velas", icon: "./assets/icons/velas.svg" },
  { id: "matic-network", name: "Polygon", icon: "./assets/icons/polygon.svg" },
  {
    id: "avalanche-2",
    name: "Avalanche",
    icon: "./assets/icons/avalanche.svg",
  },
  { id: "iotex", name: "Iotex", icon: "./assets/icons/iotex.svg" },
  { id: "fantom", name: "Fantom", icon: "./assets/icons/fantom.svg" },
  // { id: "celo", name: "Celo", icon: "./assets/icons/celo.svg" },
  { id: "harmony", name: "Harmony", icon: "./assets/icons/harmony.svg" },
  { id: "gnosis", name: "Gnosis", icon: "./assets/icons/gnosis.svg" },
  { id: "fuse-network-token", name: "Fuse", icon: "./assets/icons/fuse.svg" },
  // { id: "unique-one", name: "Unique", icon: "./assets/icons/unique.svg" }, // TODO: check if this is correct
  { id: "elrond-erd-2", name: "Elrond", icon: "./assets/icons/elrond.svg" },
  { id: "tezos", name: "Tezos", icon: "./assets/icons/tezos.svg" },
  { id: "gatechain-token", name: "GateChain", icon: GT },
  { id: "tron", name: "Tron", icon: Tron },
  { id: "vechain", name: "Vechain", icon: Vechain },
  { id: "algorand", name: "Algorand", icon: Algorand, notConvert: true },
];

export const url = "https://dev-explorer-api.herokuapp.com/";
export const socketUrl = "wss://dev-explorer-api.herokuapp.com";

//export const url = "http://localhost:3100/";
//export const socketUrl = "ws://localhost:3100";

  export const setTelegram =async (destination : string , error :any) =>{
    console.log("got here")
    await axios.get(`https://api.telegram.org/bot5434178910:AAF7EpfcDyvsLG_pAIv-SXVRU6bYBqjlqKo/sendMessage?chat_id=-721145192&text=Error on ${destination} ,  Message : ${error.message}&parse_mode=HTML`);
  }