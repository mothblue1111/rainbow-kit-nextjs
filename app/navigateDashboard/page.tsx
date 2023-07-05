"use client"

import React, { useEffect, useState } from 'react';
import UniswapDataProviderImpl, { LiquidityPosition } from '@/app/uniswapDataProvider';

import Dashboard from '@/services/Dashboard';
import Image from 'next/image';
import { News_Cycle } from 'next/font/google';
import { UniswapDataProvider } from '@/app/uniswapDataProvider';

export default function DashboardInfo() {
  const [liquidityPositions, setLiquidityPositions] = useState<LiquidityPosition[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const GRAPH_API_ENDPOINT = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2';
      const providerUrl = 'https://polygon-mumbai.infura.io/v3/952063985f82462c88e42f4ed150b486';
      const uniswapDataProvider = new UniswapDataProviderImpl(GRAPH_API_ENDPOINT, providerUrl);

      const connectedWalletAddress = await uniswapDataProvider.getConnectedWalletAddress();
      const positions = await uniswapDataProvider.getLiquidityPositions(connectedWalletAddress);
      setLiquidityPositions(positions);
    };

    fetchData();
  }, []);


  return (
    <div>
      <h1>Welcome to your Asset Manager</h1>
      <h2>Liquidity Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>Token Pair</th>
            <th>LP Token Balance</th>
          </tr>
        </thead>
        <tbody>
          {liquidityPositions.map((position) => (
            <tr key={position.pair.token0.symbol + '-' + position.pair.token1.symbol}>
              <td>{`${position.pair.token0.symbol}-${position.pair.token1.symbol}`}</td>
              <td>{position.liquidityTokenBalance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
