import Ethereum from "./assets/icons/ethereum.svg";
import Ton from "./assets/icons/ton.svg";
import Multi from "./assets/icons/elrond.svg";
import Binance from "./assets/icons/bsc.svg";
import Cardano from "./assets/icons/cardano.svg";
import Algorand from "./assets/icons/algarand.svg";
import Tron from "./assets/icons/tron.svg";
import Polygon from "./assets/icons/polygon.svg";
import Avalanche from "./assets/icons/avalanche.svg";
import Fantom from "./assets/icons/fantom.svg";
import Gnosis from "./assets/icons/gnosis.png";
import Solana from "./assets/icons/solana.svg";
import Fuse from "./assets/icons/fuse.svg";
import Velas from "./assets/icons/velas.svg";
import Tezos from "./assets/icons/tezos.svg";
import Iotex from "./assets/icons/iotx.svg";
import One from "./assets/icons/one.svg";
import Aurora from "./assets/icons/aurora.svg";
import GT from "./assets/icons/gateChain.svg";
import VET from "./assets/icons/vechain.png";

import SCRT from "./assets/icons/secret.svg";
import CKB from "./assets/icons/godwoken.svg";
import Moon from "./assets/icons/moonbeam.svg";
import Abey from "./assets/icons/Abey.svg";
import InternetComputer from "./assets/icons/dfinity.svg";
import SKL from "./assets/icons/skale.svg";

import okx from "./assets/icons/OKC.svg";
import Caduceus from "./assets/icons/caduceus.svg";
import arbitrum from "./assets/icons/arbitrum.svg";
import near from "./assets/icons/NearWallet.svg";
import HBAR from "./assets/icons/Hedera.svg";
import arbitrumTestNet from "./assets/icons/arbitrumTN.svg";

import Aptos from "./assets/icons/aptos.svg";
import brise from "./assets/icons/brise.png";
import casper from "./assets/icons/casper.svg";

export const EVM = "EVM";
export const ELROND = "MultiversX";
export const TEZOS = "TEZOS";

export const biz =
    window.location.hostname.includes("localhost") ||
    window.location.hostname.includes("staging") ||
    window.location.hostname.includes("development");

export const chains = [
    {
        type: "EVM",
        key: "Ethereum",
        text: "Ethereum",
        value: "Ethereum",
        nonce: 5,
        chainId: 1,
        tnChainId: 5,
        order: 1,
        image: { avatar: true, src: Ethereum },
        maintenance: false,
        testNet: true,
        mainnet: true,
    },
    {
        type: "EVM",
        key: "BSC",
        text: "BSC",
        value: "BSC",
        nonce: 4,
        chainId: 56,
        tnChainId: 97,
        order: 2,
        image: { avatar: true, src: Binance },
        maintenance: false,
        testNet: true,
        mainnet: true,
    },
    {
        type: "Tron",
        key: "Tron",
        text: "Tron",
        value: "Tron",
        nonce: 9,
        order: 12,
        image: { avatar: true, src: Tron },
        maintenance: false,
        testNet: true,
        mainnet: true,
        updated: false,
    },
    {
        type: "Elrond",
        key: "Elrond",
        text: ELROND,
        value: "Elrond",
        nonce: 2,
        order: 15,
        image: { avatar: true, src: Multi },
        maintenance: false,
        testNet: true,
        mainnet: true,
    },
    {
        type: "EVM",
        key: "Polygon",
        text: "Polygon",
        value: "Polygon",
        nonce: 7,
        chainId: 137,
        tnChainId: 80001,
        order: 3,
        image: { avatar: true, src: Polygon },
        maintenance: false,
        testNet: true,
        mainnet: true,
    },
    {
        type: "EVM",
        key: "Avalanche",
        text: "Avalanche",
        value: "Avalanche",
        nonce: 6,
        chainId: 43114,
        tnChainId: 43113,
        order: 11,
        image: { avatar: true, src: Avalanche },
        maintenance: false,
        testNet: true,
        mainnet: true,
    },
    {
        type: "EVM",
        key: "Fantom",
        text: "Fantom",
        value: "Fantom",
        nonce: 8,
        chainId: 250,
        order: 16,
        image: { avatar: true, src: Fantom },
        maintenance: false,
        testNet: false,
        mainnet: true,
    },
    {
        type: "Algorand",
        key: "Algorand",
        text: "Algorand",
        value: "Algorand",
        nonce: 15,
        order: 13,
        image: { avatar: true, src: Algorand },
        maintenance: false,
        testNet: true,
        mainnet: true,
        updated: false,
    },
    {
        type: "EVM",
        key: "xDAI",
        text: "Gnosis",
        value: "xDAI",
        nonce: 14,
        chainId: 100,
        order: 17,
        image: { avatar: true, src: Gnosis },
        maintenance: false,
        testNet: false,
        mainnet: true,
    },
    {
        type: "Solana",
        key: "Solana",
        text: "Solana",
        value: "Solana",
        chainId: undefined,
        order: -2,
        nonce: 26,
        coming: false,
        image: { avatar: true, src: Solana },
        maintenance: false,
        testNet: true,
        mainnet: true,
        newChain: true,
    },
    {
        type: "",
        key: "Cardano",
        text: "Cardano",
        value: "Cardano",

        order: -2,

        image: { avatar: true, src: Cardano },
        testNet: true,
        mainnet: true,
        coming: true,
        newChain: false,
        //chainId: ,
        //tnChainId: ,
    },
    {
        type: "TON",
        key: "TON",
        text: "TON",
        value: "TON",
        chainId: undefined,
        order: -1,
        nonce: 27,
        coming: false,
        image: { avatar: true, src: Ton },
        maintenance: false,
        testNet: true,
        mainnet: true,
        newChain: true,
    },
    {
        type: "EVM",
        key: "Fuse",
        text: "Fuse",
        value: "Fuse",
        nonce: 16,
        chainId: 122,
        order: 21,
        image: { avatar: true, src: Fuse },
        maintenance: false,
        testNet: false,
        mainnet: true,
    },
    {
        type: "EVM",
        key: "Velas",
        text: "Velas",
        value: "Velas",
        nonce: 19,
        chainId: 106,
        tnChainId: 0x6f,
        order: 20,
        image: { avatar: true, src: Velas },
        newChain: false,
        maintenance: false,
        testNet: true,
        mainnet: true,
    },
    {
        type: "Tezos",
        key: "Tezos",
        text: "Tezos",
        value: "Tezos",
        nonce: 18,
        order: 12,
        image: { avatar: true, src: Tezos },
        newChain: false,
        coming: false,
        maintenance: false,
        testNet: true,
        mainnet: true,
    },
    {
        type: "EVM",
        key: "Iotex",
        text: "Iotex",
        value: "Iotex",
        nonce: 20,
        chainId: 4689,
        tnChainId: 0x1252,
        order: 20,
        image: { avatar: true, src: Iotex },
        coming: false,
        maintenance: false,
        testNet: true,
        mainnet: true,
    },
    {
        type: "EVM",
        key: "Harmony",
        text: "Harmony",
        value: "Harmony",
        nonce: 12,
        chainId: 1666600000,
        tnChainId: 1666700000,
        order: 6,
        image: { avatar: true, src: One },
        maintenance: false,
        testNet: false,
        mainnet: true,
    },
    {
        type: "EVM",
        key: "Aurora",
        text: "Aurora",
        value: "Aurora",
        nonce: 21,
        chainId: 1313161554,
        tnChainId: 1313161555,
        order: 7,
        image: { avatar: true, src: Aurora },
        maintenance: false,
        testNet: true,
        mainnet: true,
    },
    {
        type: "EVM",
        key: "Godwoken",
        text: "Godwoken",
        value: "Godwoken",
        nonce: 22,
        chainId: 71402,
        tnChainId: 71401,
        order: 4,
        image: { avatar: true, src: CKB },
        maintenance: false,
        testNet: true,
        mainnet: true,
    },
    {
        type: "EVM",
        key: "GateChain",
        text: "GateChain",
        value: "GateChain",
        nonce: 23,
        tnChainId: 85,
        chainId: 86,
        order: 19,
        image: { avatar: true, src: GT },
        maintenance: false,
        testNet: false,
        mainnet: true,
    },
    {
        type: "EVM",
        key: "Moonbeam",
        text: "Moonbeam",
        value: "Moonbeam",
        nonce: 32,
        order: 3,
        chainId: 1284,
        tnChainId: 1287,
        image: { avatar: true, src: Moon },
        testNet: true,
        mainnet: true,
    },
    {
        type: "EVM",
        key: "Abeychain",
        text: "ABEY",
        value: "Abeychain",
        nonce: 33,
        order: 54,
        chainId: 179,
        tnChainId: 178,
        image: { avatar: true, src: Abey },
        testNet: true,
        mainnet: true,
        newChain: false,
        coming: false,
    },
    {
        type: "VeChain",
        key: "VeChain",
        text: "VeChain",
        value: "VeChain",
        nonce: 25,
        tnChainId: 39,
        chainId: undefined,
        order: 5,
        image: { avatar: true, src: VET },
        maintenance: false,
        mainnet: true,
        testNet: false,
    },
    {
        type: "Cosmos",
        key: "Secret",
        text: "Secret",
        value: "Secret",
        nonce: 24,
        order: -3,
        tnChainId: "pulsar-2",
        chainId: "secret-4",
        image: { avatar: true, src: SCRT },
        mainnet: true,
        testNet: true,
        test: false,
        newChain: true,
        coming: false,
    },
    {
        type: "Hedera",
        key: "Hedera",
        text: "Hedera",
        nonce: 29,
        order: -6,
        image: { avatar: true, src: HBAR },
        testNet: true,
        mainnet: true,
        newChain: true,
        coming: false,
    },
    {
        type: "EVM",
        key: "Skale",
        text: "SKALE",
        nonce: 30,
        order: 3,
        chainId: 1564830818,
        tnChainId: 344106930,
        image: { avatar: true, src: SKL },
        testNet: true,
        mainnet: true,
        newChain: false,
    },
    {
        type: "EVM",
        key: "Caduceus",
        text: "Caduceus",
        value: "Caduceus",
        nonce: 35,
        order: 6,
        chainId: 256256,
        tnChainId: 512512,
        image: { avatar: true, src: Caduceus },
        testNet: true,
        mainnet: true,
        newChain: false,
    },
    {
        type: "ICP",
        key: "ICP",
        text: "ICP",
        nonce: 28,
        order: -5,
        // chainId: 1564830818,
        //tnChainId: 1305754875840118,
        image: { avatar: true, src: InternetComputer },

        coming: !biz,
    },
    {
        type: "APTOS",
        key: "Aptos",
        text: "Aptos",
        nonce: 0x22,
        order: 0,
        image: { avatar: true, src: Aptos },
        testNet: false,
        mainnet: false,
        coming: true,
    },
    {
        type: "NEAR",
        key: "NEAR",
        text: "NEAR",
        value: "NEAR",
        nonce: 31,
        order: -4,
        image: { avatar: true, src: near },
        testNet: true,
        mainnet: true,
        newChain: true,
        coming: false,
    },
    {
        type: "EVM",
        key: "OKC",
        text: "OKC",
        value: "OKC",
        nonce: 0x24,
        order: 5,
        image: { avatar: true, src: okx },
        testNet: true,
        mainnet: true,
        coming: false,
        newChain: false,
        chainId: 66,
        tnChainId: 65,
    },
    {
        type: "EVM",
        key: "Arbitrum",
        text: window.location.href.includes("testnet")
            ? "Arbitrum"
            : "Arbitrum Nova",
        value: "Arbitrum",
        nonce: 0x25,
        order: 4,
        image: {
            avatar: true,
            src: window.location.href.includes("testnet")
                ? arbitrumTestNet
                : arbitrum,
        },
        testNet: true,
        mainnet: true,
        coming: false,
        newChain: true,
        chainId: 42170,
        tnChainId: 421613,
    },
    {
        type: "EVM",
        key: "Bitgert",
        text: "Bitgert",
        value: "Bitgert",
        nonce: 0x26,
        order: -1,
        image: { avatar: true, src: brise },
        testNet: true,
        mainnet: true,
        coming: true,
        newChain: false,
        chainId: 32520,
        tnChainId: 64668,
    },
    {
        type: "",
        key: "Casper",
        text: "Casper",
        value: "Casper",
        nonce: 0x26,
        order: -1,
        image: { avatar: true, src: casper },
        testNet: true,
        mainnet: true,
        coming: true,
        newChain: false,
        chainId: 32520,
        tnChainId: 64668,
    },
];
