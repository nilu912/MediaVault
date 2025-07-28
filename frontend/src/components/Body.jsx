import React, { useEffect, useState } from "react";
import { useWallet } from "../context/WalletContext";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import axios from "axios";

const Body = () => {
  const { walletAddress, connectWallet } = useWallet();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative h-auto w-screen flex flex-col items-center justify-center overflow-hidden">
        <section className="text-center mt-8 h-screen flex flex-col justify-center items-center bg-darkBackground text-white max-h-screen overflow-hidden">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Explore Your Digital Assets
          </h1>
          <p className="text-lg sm:text-xl text-white/70 mb-8">
            Decentralized NFT Viewer Powered by Blockchain
          </p>
          <button
            className="bg-[#6EE7B7] text-black px-6 py-2 rounded-full font-semibold hover:bg-white transition"
            onClick={connectWallet}
          >
            {walletAddress
              ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
              : `Connect Wallet`}
          </button>
        </section>
        <section className="py-16 bg-white w-full text-black text-center">
          <h2 className="text-3xl font-bold mb-4">About Our Platform</h2>
          <p className="max-w-2xl mx-auto text-lg">
            This platform allows users to view, explore, and access NFTs
            directly from the blockchain. It supports multiple file types
            including images, audio, video, and documents stored via IPFS.
          </p>
        </section>
      </div>
    </motion.div>
  );
};

export default Body;
