import { createContext, useContext, useEffect, useState } from "react";
import { ethers, BrowserProvider } from "ethers";
const WalletContext = createContext();
export const useWallet = () => useContext(WalletContext);
const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
import contractABI from "../contract/MediaVault.json";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import Alert from "@mui/material/Alert";

const WalletProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [provider, setProvider] = useState(null);
  const [isConnected, setIsConnected] = useState();
  const [contract, setContract] = useState(null);
  const [signer, setSigner] = useState(null);
  const [alert, setAlert] = useState({ type: "", message: "" });

  useEffect(() => {
    if (alert.message) {
      const timeout = setTimeout(() => {
        setAlert({ type: "", message: "" });
      }, 4000);
      return () => clearTimeout(timeout);
    }
  }, [alert]);

  useEffect(() => {
    const reConnectWallet = async () => {
      if (window.ethereum && localStorage.getItem("wallet") != null) {
        const ethProvider = new BrowserProvider(window.ethereum);
        if ((await ethProvider.listAccounts()).length == 0) return;
        try {
          const signer = await ethProvider.getSigner();
          const address = await signer.getAddress();

          const Contract = new ethers.Contract(
            contractAddress,
            contractABI.abi,
            signer
          );
          setContract(Contract);

          setProvider(ethProvider);
          setSigner(signer);
          setWalletAddress(address);
          setIsConnected(true);
        } catch (err) {
          console.error(err);
        }
      }
    };
    reConnectWallet();

    try {
      const handleAccountChanged = () => {
        window.location.reload();
      };
      window.ethereum.on("accountsChanged", handleAccountChanged);
      window.ethereum.on("chainChanged", handleAccountChanged);
      return () => {
        window.ethereum.removeListener("accountsChanged", handleAccountChanged);
        window.ethereum.removeListener("chainChanged", handleAccountChanged);
      };
    } catch (err) {
      // console.error(err);
      return;
    }
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) {
      setAlert({
        type: "info",
        message: "Metamaks not installed, please install it!",
      });

      // alert("Metamaks not installed, please install it!");
      return;
    }
    try {
      const ethProvider = new BrowserProvider(window.ethereum);
      const signer = await ethProvider.getSigner();
      const address = await signer.getAddress();

      const contractOBJ = new ethers.Contract(
        contractAddress,
        contractABI.abi,
        signer
      );

      setProvider(ethProvider);
      setWalletAddress(address);
      setIsConnected(true);
      setContract(contractOBJ);
      setSigner(signer);
      localStorage.setItem("wallet", address);
    } catch (err) {
      console.error(err);
    }
  };

  const mintNFT = async (tokenURI) => {
    try {
      const tx = await contract.safeMint(signer.address, tokenURI);
      await tx.wait();
      // console.log("Minted:", tx.hash);
      return tx.hash;
    } catch (err) {
      console.error(err);
    }
  };
  const getAllMyNfts = async () => {
    let nfts = [];
    try {
      let i = 0;
      while (true) {
        try {
          const nftsRes = await contract.tokenURI(i);
          const ownerOf = await contract.ownerOf(i);
          i++;

          if (ownerOf != walletAddress) continue;
          nfts.push(nftsRes.replace("ipfs://", "https://ipfs.io/ipfs/"));
        } catch (err) {
          break;
        }
      }
    } catch (err) {
      return;
      console.error("err");
    } finally {
      return nfts;
    }
  };

  const getAllNfts = async () => {
    let nfts = [];
    try {
      let i = 0;
      while (true) {
        try {
          const nftsRes = await contract.tokenURI(i);
          nfts.push(nftsRes.replace("ipfs://", "https://ipfs.io/ipfs/"));
          i++;
        } catch (err) {
          break;
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      return nfts;
    }
  };
  const disconnectWallet = () => {
    setProvider(null);
    setIsConnected(false);
    setSigner(null);
    setWalletAddress(null);
    setContract(null);
    localStorage.removeItem("wallet");
  };
  return (
    <>
      <AnimatePresence>
        {alert.message && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 z-100 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-md"
          >
            <Alert
              severity={alert.type}
              onClose={() => setAlert({ type: "", message: "" })}
              variant="filled"
            >
              {alert.message}
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      <WalletContext.Provider
        value={{
          walletAddress,
          provider,
          isConnected,
          connectWallet,
          disconnectWallet,
          mintNFT,
          contract,
          getAllMyNfts,
          getAllNfts,
        }}
      >
        {children}
      </WalletContext.Provider>
    </>
  );
};
export default WalletProvider;
