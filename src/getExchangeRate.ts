export const getExchangeRates = async (ids: string[]) => {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${ids.join(
      ","
    )}&vs_currencies=usd`
  );
  console.log(await res.json());
  return await res.json();
};
