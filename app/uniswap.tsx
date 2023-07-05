import { ChainId } from '@uniswap/sdk/dist/constants';
import { Fetcher } from '@uniswap/sdk/dist/fetcher';
import { Token } from '@uniswap/sdk';
import { ethers } from 'ethers';
import { useEffect } from 'react';

const provider = new ethers.JsonRpcProvider("https://polygon-mumbai.infura.io/v3/952063985f82462c88e42f4ed150b486");

export async function fetchTokenData(tokenAddress: string) {

  const network = await provider.getNetwork();
  const chainId = ChainId.MAINNET;
  const token = new Token(chainId, tokenAddress, 18, 'TOKEN SYMBOL', 'TOKEN NAME');
  const tokenWithInfo = await Fetcher.fetchTokenData(chainId, tokenAddress);

  const { name, symbol, decimals } = tokenWithInfo;

  return {
    address: tokenAddress,
    name,
    symbol,
    decimals,
  };
}

function ShowData() {
  useEffect(() => {
    async function fetchData() {
      const tokenAddress = '0x2791bca1f2de4661ed88a30c99a7a9449aa84174';
      const tokenData = await fetchTokenData(tokenAddress);
      console.log(tokenData);
    }
    fetchData();
  }, []);

  return <div>Data</div>;
}

export default ShowData;
