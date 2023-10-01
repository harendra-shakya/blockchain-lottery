import { useEffect, useState } from "react";
import { useInterval } from "usehooks-ts";
import { useProvider } from "wagmi";
import { fetchPriceFromUniswap } from "~~/utils/scaffold-eth";

const enablePolling = false;
const pollingTime = process.env.NEXT_PUBLIC_RPC_POLLING_INTERVAL
  ? parseInt(process.env.NEXT_PUBLIC_RPC_POLLING_INTERVAL)
  : 30_000;

/**
 * Get the price of ETH based on ETH/DAI trading pair from Uniswap SDK
 * @returns ethPrice: number
 */
export const useEthPrice = () => {
  const provider = useProvider({ chainId: 1 });
  const [ethPrice, setEthPrice] = useState(0);

  // Get the price of ETH from Uniswap on mount
  useEffect(() => {
    (async () => {
      const price = await fetchPriceFromUniswap(provider);
      setEthPrice(price);
    })();
  }, [provider]);

  // Get the price of ETH from Uniswap at a given interval
  useInterval(
    async () => {
      const price = await fetchPriceFromUniswap(provider);
      setEthPrice(price);
    },
    enablePolling ? pollingTime : null,
  );

  return ethPrice;
};
