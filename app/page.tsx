"use client";
import "@rainbow-me/rainbowkit/styles.css";
import AnimatedBanner from "./animatedBanner";
import Image from "next/image";
import dynamic from "next/dynamic";
// import  {getRainbowKitProvider}  from './rainbowKit';
import layout from "./layout";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import uniswap from "./uniswap.png";
import { ConnectButton, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, polygon, goerli, bsc, bscTestnet } from "wagmi/chains";
import type { AppProps } from "next/app";

import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import IsMounted from "./components/isMounted";
const { chains, publicClient } = configureChains(
  [mainnet, polygon, goerli],
  [publicProvider()]
);
const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains,
});
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});
// const RainbowKitWrapper = dynamic(() => import('./rainbowKit').then((module) => module.getRainbowKitProvider), {
//   ssr: false, // Prevents server-side rendering of this component
//   loading: () => <div>Loading...</div> // Custom loading component
// });

function Page() {
  const mounted = IsMounted();
  if (!mounted) return;
  return (
    <>
      {/*<RainbowKitWrapper>*/}
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          <div>
            <div>
              <ConnectButton />
            </div>
            <div className="uniswap">All in one Tracker for your Wallet</div>
            <div
              className="grid grid-cols-3 grid-rows-1"
              style={{ gridTemplateColumns: ".5fr .5fr 1fr" }}
            >
              <div className="curved-box">
                <span className="leftBox">User Wallet Info:</span>
                <span className="leftBox1">You have 196 transactions</span>
              </div>
              <div className="curved-box1">
                <div className="uniswap1">
                  <span>UNISWAP</span>
                </div>
                <span className="saysc">See all your staked crypto</span>
              </div>
              <div className="curved-box2 flex">
                <div className="image flex">
                  <Image
                    src={uniswap}
                    alt="Uniswap logo"
                    width={200}
                    height={200}
                  />
                  <span className="liquid flex-grow">{">"}Liquid Staking</span>
                </div>
              </div>
            </div>
          </div>
        </RainbowKitProvider>
      </WagmiConfig>
      {/*</RainbowKitWrapper>*/}
    </>
  );
}
export default Page;
