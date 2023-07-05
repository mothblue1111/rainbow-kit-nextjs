"use client";

import "@rainbow-me/rainbowkit/styles.css";
import {
  ConnectButton,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, polygon, goerli, bsc, bscTestnet } from "wagmi/chains";
import type { AppProps } from "next/app";

import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
const { chains, publicClient } = configureChains(
  [mainnet, polygon, goerli],
  [
    alchemyProvider({ apiKey: "9MFVlO2p9rDZ9L3NDEhCBQEgwl_JfQPk" }),
    publicProvider(),
  ]
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

export function getRainbowKitProvider(
  Component: React.ComponentType<AppProps["Component"]>,
  pageProps: AppProps["pageProps"]
) {
  const chains = [goerli];

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
