import { createContext, useContext, useEffect, useState } from "react";
import { ethers, BrowserProvider } from "ethers";
const WalletContext = createContext();
export const useWallet = () => useContext(WalletContext);
const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
import contractABI from "../contract/MediaVault.json"

const WalletProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [provider, setProvider] = useState(null);
  const [isConnected, setIsConnected] = useState();
  const [contract, setContract] = useState(null);
  const [signer, setSigner] = useState(null)

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

      const contractOBJ = new ethers.Contract(contractAddress, contractABI.abi, signer);

      console.log(address);
      setProvider(ethProvider);
      setWalletAddress(address);
      setIsConnected(true);
      setContract(contractOBJ)
      setSigner(signer)
    } catch (err) {
      console.error(err);
    }
  };

  const mintNFT = async (tokenURI) => {
    try{
      const tx = await contract.safeMint(signer.address, tokenURI);
      await tx.wait();
      console.log("Minted:", tx.hash)
      return tx.hash;
    }catch(err){
      console.error(err)
    }
  }
  return (
    <WalletContext.Provider
      value={{ walletAddress, provider, isConnected, connectWallet, mintNFT, contract }}
    >
      {children}
    </WalletContext.Provider>
  );
};
export default WalletProvider;
