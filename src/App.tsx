import "./App.css";

import Navigate from "./routes/Navigate";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme/theme";
import { polygonMumbai } from "wagmi/chains";
import { walletConnectProvider, modalConnectors } from "@web3modal/ethereum";
import { configureChains, createClient, WagmiConfig } from "wagmi";

const chains = [polygonMumbai];

const projectId = String(process.env.REACT_APP_WC_PROJECT_ID);

// Wagmi client
const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId: projectId }),
]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: "web3Modal", chains }),
  provider,
});

export default function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <WagmiConfig client={wagmiClient}>
          <Navigate />
        </WagmiConfig>
      </ThemeProvider>
    </>
  );
}
