import { gql, request } from 'graphql-request';

import { ethers } from 'ethers';

const GRAPH_API_ENDPOINT = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2';

const provider = new ethers.JsonRpcProvider("https://polygon-mumbai.infura.io/v3/952063985f82462c88e42f4ed150b486");

    async function getConnectedWalletAddress() {
      const signer = await provider.getSigner();
      const walletAddress = await signer.getAddress(); 
      return walletAddress;
    }

interface LiquidityPositionsData {
  liquidityPositions: {
    liquidityTokenBalance: string;
    pair: {
      token0: {
        symbol: string;
      };
      token1: {
        symbol: string;
      };
    };
  }[];
}

 export async function getLiquidityPositions(walletAddress: string) {
  const query = gql`
    query GetLiquidityPositions($walletAddress: String!) {
      liquidityPositions(where: { user: $walletAddress }) {
        liquidityTokenBalance
        pair {
          token0 {
            symbol
          }
          token1 {
            symbol
          }
        }
      }
    }
  `;

  const variables = {
    walletAddress: walletAddress.toLowerCase(),
  };

  try {
    const data = await request<LiquidityPositionsData>(GRAPH_API_ENDPOINT, query, variables);
    const liquidityPositions = data.liquidityPositions;

    liquidityPositions.forEach((position) => {
      const token0Symbol = position.pair.token0.symbol;
      const token1Symbol = position.pair.token1.symbol;
      const liquidityTokenBalance = position.liquidityTokenBalance;
      console.log(`${liquidityTokenBalance} LP Tokens (${token0Symbol}-${token1Symbol})`);
    });
  } catch (error) {
    console.error('Failed to retrieve liquidity positions:', error);
  }
}

// Usage
(async () => {
  const connectedWalletAddress = await getConnectedWalletAddress();
  getLiquidityPositions(connectedWalletAddress);
})();