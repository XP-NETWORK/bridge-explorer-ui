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
  "5": "https://ethplorer.io/tx/",
  "8": "https://ftmscan.com/tx/",
  "12": "https://explorer.harmony.one/tx/",
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
  "5": "https://ethplorer.io/address/",
  "8": "https://ftmscan.com/address/",
  "12": "https://explorer.harmony.one/address/",
};

export const _headers = {
  Accept: "*",
  "Content-Type": "application/json",
};

// IDs from coingecko
export const chains = [
  {
    id: "aurora-near",
    name: "AURORA",
    icon: "./assets/icons/aurora.svg",
  },
  { id: "binancecoin", name: "BSC", icon: "./assets/icons/bsc.svg" },
  { id: "ethereum", name: "ETHEREUM", icon: "./assets/icons/ethereum.svg" },
  { id: "velas", name: "VELAS", icon: "./assets/icons/velas.svg" },
  { id: "matic-network", name: "POLYGON", icon: "./assets/icons/polygon.svg" },
  {
    id: "avalanche-2",
    name: "AVALANCHE",
    icon: "./assets/icons/avalanche.svg",
  },
  { id: "iotex", name: "IOTEX", icon: "./assets/icons/iotex.svg" },
  { id: "fantom", name: "FANTOM", icon: "./assets/icons/fantom.svg" },
  // { id: "celo", name: "CELO", icon: "./assets/icons/celo.svg" },
  { id: "harmony", name: "HARMONY", icon: "./assets/icons/harmony.svg" },
  { id: "gnosis", name: "GNOSIS CHAIN", icon: "./assets/icons/gnosis.svg" },
  { id: "fuse-network-token", name: "FUSE", icon: "./assets/icons/fuse.svg" },
  // { id: "unique-one", name: "UNIQUE", icon: "./assets/icons/unique.svg" }, // TODO: check if this is correct
  { id: "elrond-erd-2", name: "ELROND", icon: "./assets/icons/elrond.svg" },
];

export const url = "https://dev-explorer-api.herokuapp.com/";
export const socketUrl = "wss://dev-explorer-api.herokuapp.com";

//export const url = "http://localhost:3100/";
//export const socketUrl = "ws://localhost:3100";
