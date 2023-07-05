import { ChainId, Fetcher, Token, TokenAmount } from '@uniswap/sdk';

import { ethers } from 'ethers';

(async () => {

const provider = new ethers.JsonRpcProvider("https://polygon-mumbai.infura.io/v3/952063985f82462c88e42f4ed150b486");


async function getTokenBalances() {
    const chainId = ChainId.MAINNET; // Replace with the desired chain ID
    const tokenAddresses = ['TOKEN_ADDRESS_1', 'TOKEN_ADDRESS_2']; // Replace with the token addresses you want to check
    const signer = await provider.getSigner();
    const walletAddress = await signer.getAddress(); 
    const abi = ['ABI_ENTRY']; // Replace with the ABI of the token contract

    const tokenABIs = {
        TOKEN_ADDRESS_1: ['ABI_ENTRY_1'],
        TOKEN_ADDRESS_2: ['ABI_ENTRY_2'],
      };
  
      const tokens = await Promise.all(tokenAddresses.map(async (address) => {
        const token = await Fetcher.fetchTokenData(chainId, address, provider);
        token.abi = tokenABIs[address]; // Assign the ABI to the token object
        return token;
      }));
  
    const tokenBalances = await Promise.all(tokens.map(async (token) => {
        const contract = new ethers.Contract(token.address, token.abi, signer);
        const balance = await contract.balanceOf(walletAddress);
        return new TokenAmount(token, balance.toString());
    }
    ))


  // Print token balances
  tokenBalances.forEach((balance: TokenAmount, index: number) => {
    const tokenSymbol = tokens[index].symbol;
    console.log(`${balance.toSignificant(6)} ${tokenSymbol}`);
  });
}

getTokenBalances();
})();