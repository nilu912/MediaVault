import React, { useState } from "react";
import { useWallet } from "../context/WalletContext";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import axios from "axios";

const Body = () => {
  const { walletAddress, connectWallet } = useWallet();

  const handleConnectWallet = () => {
    connectWallet();
  }


  return (
    <div className="relative min-h-screen w-screen flex flex-col items-center justify-center px-4 gap-10">
      <section className="text-center py-20 bg-darkBackground text-white mt-50 h-[30rem]">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Explore Your Digital Assets
        </h1>
        <p className="text-lg sm:text-xl text-white/70 mb-8">
          Decentralized NFT Viewer Powered by Blockchain
        </p>
        <button className="bg-[#6EE7B7] text-black px-6 py-2 rounded-full font-semibold hover:bg-white transition" onClick={connectWallet}>
          {walletAddress ? `${walletAddress.slice(0,6)}...${walletAddress.slice(-4)}`: `Connect Wallet`}
        </button>
      </section>
      <section className="py-16 bg-white w-full text-black text-center px-6">
        <h2 className="text-3xl font-bold mb-4">About Our Platform</h2>
        <p className="max-w-2xl mx-auto text-lg">
          This platform allows users to view, explore, and access NFTs directly
          from the blockchain. It supports multiple file types including images,
          audio, video, and documents stored via IPFS.
        </p>
      </section>
    </div>
  );
};

export default Body;
