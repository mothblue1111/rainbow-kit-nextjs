import { ChainId, Fetcher, JSBI, Pair, Percent, Route, Token, TokenAmount, Trade, TradeType } from '@uniswap/sdk';

import { ethers } from 'ethers';

async function main() {
const provider = new ethers.JsonRpcProvider("https://polygon-mumbai.infura.io/v3/952063985f82462c88e42f4ed150b486");
const network = await provider.getNetwork();
const chainId = network.chainId;
const signer = await provider.getSigner();
const walletAddress = await signer.getAddress(); 

async function getTokenBalances() {
  const tokens: Token[] = [];

  // Fetch token data for each token address
  for (const tokenAddress of tokenAddress) {
    const token = await Fetcher.fetchTokenData(chainId, tokenAddress, provider);
    tokens.push(token);
  }

  // Get token balances
  const tokenBalances: TokenAmount[] = [];
  for (const token of tokens) {
    const balance = await token.balanceOf(walletAddress);
    tokenBalances.push(balance);
  }

  // Print token balances
  tokenBalances.forEach(balance => {
    console.log(`${balance.toSignificant(6)} ${balance.token.symbol}`);
  });
}

  await getTokenBalances();
}

main().catch(console.error);
