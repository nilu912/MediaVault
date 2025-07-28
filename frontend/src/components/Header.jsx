import React from "react";
import { Link } from "react-router-dom";
import { useWallet } from "../context/WalletContext";

const Header = () => {
  const { isConnected, walletAddress, connectWallet, disconnectWallet } =
    useWallet();

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/5 backdrop-blur-md border-b border-blue-500/20 shadow-[0_0_20px_#3B82F6]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex justify-between items-center text-white font-mono">
        {/* Logo */}
        <h1 className="text-2xl md:text-3xl font-bold text-[#6EE7B7] drop-shadow-[0_0_6px_#3B82F6] animate-pulse tracking-wider">
          🚀 NeonVault
        </h1>

        {/* Navigation */}
        <nav className="flex items-center space-x-6 text-sm sm:text-base">
          {[
            { to: "/", label: "Home" },
            { to: "/my-nfts", label: "My NFTs" },
            { to: "/explore", label: "Explore" },
            { to: "/mint", label: "Mint NFT" },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="relative px-1 py-0.5 group transition-all duration-300 hover:scale-[103%]"
            >
              <span className="relative z-10 group-hover:text-[#6EE7B7]">
                {label}
              </span>
              <span className="absolute left-0 bottom-0 h-[2px] w-0 group-hover:w-full bg-[#6EE7B7] transition-all duration-500"></span>
            </Link>
          ))}
        </nav>
        <div className="flex gap-4">
          {/* Wallet Button */}
          <button
            onClick={connectWallet}
            className="ml-4 px-4 py-2 rounded-md border border-[#6EE7B7] text-[#6EE7B7] hover:bg-[#6EE7B7]/20 transition-all duration-300 shadow-[0_0_10px_#6EE7B7] hover:shadow-[0_0_20px_#6EE7B7] hover:scale-[103%]"
          >
            {!isConnected
              ? "Connect Wallet"
              : `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`}
          </button>

          {isConnected && (
            <button
              onClick={disconnectWallet}
              className="px-3 py-2 text-sm rounded-md bg-red-500/10 text-red-400 border border-red-400 hover:bg-red-500/20 transition-all"
            >
              Disconnect
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
