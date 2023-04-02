import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
import { Web3Modal, Web3Button } from "@web3modal/react";
import { configureChains, createClient, WagmiConfig, useAccount } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import ReactGA from "react-ga";
import React from "react";
import { useNavigate } from "react-router-dom";

const chains = [polygonMumbai];

const projectId = String(process.env.REACT_APP_WC_PROJECT_ID);
const TRACKING_ID = String(process.env.REACT_APP_TRACKING_ID);

// Wagmi client
const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId: projectId }),
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: "web3Modal", chains }),
  provider,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);

export default function App() {
  return (
    <div className="App">
      <WagmiConfig client={wagmiClient}>
        <Web3Button />
        <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      </WagmiConfig>
    </div>
  );
}
