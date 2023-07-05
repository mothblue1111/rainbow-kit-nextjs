import { ChainId, Fetcher, Token } from '@uniswap/sdk';

import { ethers } from 'ethers';

// Detect the injected Ethereum provider (e.g., MetaMask)
const provider = new ethers.providers.Web3Provider(window.ethereum);

async function fetchTokenBalances() {
  // Request access to the user's accounts
  await provider.send('eth_requestAccounts', []);

  // Get the connected wallet address
  const signer = provider.getSigner();
  const walletAddress = await signer.getAddress();

  // Specify the token addresses you want to retrieve balances for
  const tokenAddresses = ['0xTokenAddress1', '0xTokenAddress2', '0xTokenAddress3'];

  // Get the chain ID from the provider
  const network = await provider.getNetwork();
  const chainId = network.chainId;

  // Fetch token data and retrieve balances
  const tokens = await Promise.all(
    tokenAddresses.map(async (tokenAddress) => {
      const token = await Fetcher.fetchTokenData(chainId, tokenAddress, provider);
      const balance = await token.balanceOf(walletAddress);
      
      
      return {
        address: token.address,
        symbol: token.symbol,
        name: token.name,
        balance: balance.toString(),
      };
    })
  );

  console.log('Token Balances:', tokens);
}

fetchTokenBalances();
