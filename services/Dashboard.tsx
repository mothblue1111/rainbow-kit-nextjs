import React, { useEffect, useState } from 'react';
import UniswapDataProviderImpl, { LiquidityPosition } from '../app/uniswapDataProvider'; // Import LiquidityPosition
import { gql, request } from 'graphql-request';

import { JsonRpcProvider } from 'ethers';
import { getLiquidityPositions } from '../app/uniswapRetrieval';

const GRAPH_API_ENDPOINT = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2';
const providerUrl = 'https://polygon-mumbai.infura.io/v3/952063985f82462c88e42f4ed150b486';
const uniswapDataProvider = new UniswapDataProviderImpl(GRAPH_API_ENDPOINT, providerUrl);

function Dashboard(){
    const [liquidityPositions, setLiquidityPositions] = useState<LiquidityPosition[]>([]);

    useEffect(() => {
        async function fetchData(){
            const connectedWalletAddress = await uniswapDataProvider.getConnectedWalletAddress();
            const positions = await uniswapDataProvider.getLiquidityPositions(connectedWalletAddress);
            setLiquidityPositions(positions);
        }
        fetchData();
    }, []);

    return (
        <div>
            <h1>Liquidity Dashboard </h1>
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

export default Dashboard;