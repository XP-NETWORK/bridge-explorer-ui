export const getExchangeRates = async (ids: string[]) => {
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${ids.join(
        ","
      )}&vs_currencies=usd`
    );

    return await res?.json();
  } catch (error: any) {
    console.log(error.message);
    return {
      "algorand": {
        "usd": 0.273256
      },
      "aurora-near": {
        "usd": 0.293486
      },
      "avalanche-2": {
        "usd": 19.89
      },
      "binancecoin": {
        "usd": 321.28
      },
      "caduceus": {
        "usd": 0.118553
      },
      "elrond-erd-2": {
        "usd": 46.69
      },
      "ethereum": {
        "usd": 1684.99
      },
      "fantom": {
        "usd": 0.5754
      },
      "fuse-network-token": {
        "usd": 0.083108
      },
      "gatechain-token": {
        "usd": 4.6
      },
      "gnosis": {
        "usd": 114.8
      },
      "harmony": {
        "usd": 0.02662631
      },
      "iotex": {
        "usd": 0.03107261
      },
      "matic-network": {
        "usd": 1.36
      },
      "moonbeam": {
        "usd": 0.470123
      },
      "nervos-network": {
        "usd": 0.00423459
      },
      "oec-token": {
        "usd": 27.8
      },
      "secret": {
        "usd": 0.798233
      },
      "skale": {
        "usd": 0.057568
      },
      "tezos": {
        "usd": 1.16
      },
      "the-open-network": {
        "usd": 2.36
      },
      "tron": {
        "usd": 0.070813
      },
      "vechain": {
        "usd": 0.0255242
      },
      "velas": {
        "usd": 0.02706262
      }
    }
  }
};
