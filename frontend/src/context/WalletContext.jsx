import { createContext, useContext, useEffect, useState } from "react";
import { ethers, BrowserProvider } from "ethers";
const WalletContext = createContext();
export const useWallet = () => useContext(WalletContext);

const WalletProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [provider, setProvider] = useState(null);
  const [isConnected, setIsConnected] = useState();

  useEffect(() => {
    console.log("ethers.providers");
  }, []);
  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Metamaks not installed, please install it!");
      return;
    }
    try {
      const ethProvider = new BrowserProvider(window.ethereum);
      const signer = await ethProvider.getSigner();
      const address = await signer.getAddress();
        console.log(address)
      setProvider(ethProvider);
      setWalletAddress(address);
      setIsConnected(true);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <WalletContext.Provider
      value={{ walletAddress, provider, isConnected, connectWallet }}
    >
      {children}
    </WalletContext.Provider>
  );
};
export default WalletProvider;
