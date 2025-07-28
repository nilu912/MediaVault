import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useWallet } from "../context/WalletContext";
import axios from "axios";
import { Slab } from "react-loading-indicators";

const MyNFTs = () => {
  const { walletAddress, getAllMyNfts } = useWallet();
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!walletAddress) {
      setLoading(false);
      return;
    }

    const fetchNFTs = async () => {
      setLoading(true);
      try {
        const nftsData = await getAllMyNfts();
        console.log("nftsData", nftsData);

        const arr = await Promise.all(
          nftsData.map(async (url) => {
            const res = await axios.get(url);
            return res.data;
          })
        );

        setNfts(arr);
      } catch (err) {
        console.error("Error fetching NFTs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNFTs();
  }, [walletAddress]);

  if (loading) {
    return (
      <div className="flex h-screen w-screen justify-center items-center bg-[#0f2027]">
        <Slab
          color="#319fcc"
          size="medium"
          text="Please wait..."
          textColor=""
        />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen pt-24 px-4 bg-gradient-to-tr from-[#0f2027] via-[#203a43] to-[#2c5364] text-white overflow-x-hidden">
      {/* Background Animation */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full z-0 blur-[120px] opacity-20"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
        style={{
          background:
            "radial-gradient(circle at 30% 30%, #6EE7B7, transparent 40%), radial-gradient(circle at 70% 70%, #3B82F6, transparent 40%)",
        }}
      />

      <motion.h2
        className="relative z-10 text-4xl font-bold text-center mb-10 text-[#6EE7B7] drop-shadow-[0_0_10px_#6EE7B7]"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Your Minted NFTs
      </motion.h2>

      {/* NFT Grid */}
      <div className="relative z-10 grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {nfts.length > 0 ? (
          nfts.map((nft, index) => (
            <motion.div
              key={index}
              className="bg-white/10 backdrop-blur-lg p-4 rounded-xl border border-white/20 shadow-lg hover:shadow-xl transition-transform hover:scale-105"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <a
                href={nft.image}
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-400 underline"
              >
                📁 Open File
              </a>
              <div className="mt-4">
                <h3 className="text-xl font-semibold text-[#6EE7B7]">
                  Name: {nft.name}
                </h3>
                <p className="text-sm text-white/80 mt-1">
                  Description: {nft.description}
                </p>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center col-span-full text-white/70">
            {walletAddress
              ? "No NFTs found."
              : "Connect your wallet to view NFTs."}
          </p>
        )}
      </div>
    </div>
  );
};

export default MyNFTs;
