import { gql, request } from 'graphql-request';

import { JsonRpcProvider } from 'ethers';

export interface LiquidityPosition {
  liquidityTokenBalance: string;
  pair: {
    token0: {
      symbol: string;
    };
    token1: {
      symbol: string;
    };
  };
}

export interface LiquidityPositionsData {
  liquidityPositions: LiquidityPosition[];
}

export interface UniswapDataProvider {
  getConnectedWalletAddress(): Promise<string>;
  getLiquidityPositions(walletAddress: string): Promise<LiquidityPosition[]>;
}

class UniswapDataProviderImpl implements UniswapDataProvider {
  private readonly GRAPH_API_ENDPOINT: string;
  private readonly provider: JsonRpcProvider;

  constructor(graphApiEndpoint: string, providerUrl: string) {
    this.GRAPH_API_ENDPOINT = graphApiEndpoint;
    this.provider = new JsonRpcProvider(providerUrl);
  }

  async getConnectedWalletAddress(): Promise<string> {
    const signer = await this.provider.getSigner();
    const walletAddress = await signer.getAddress();
    return walletAddress;
  }

  async getLiquidityPositions(walletAddress: string): Promise<LiquidityPosition[]> {
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
      const data = await request<LiquidityPositionsData>(this.GRAPH_API_ENDPOINT, query, variables);
      const liquidityPositions = data.liquidityPositions;
      return liquidityPositions;
    } catch (error) {
      console.error('Failed to retrieve liquidity positions:', error);
      throw error; 
    }
  }
}

export default UniswapDataProviderImpl;
