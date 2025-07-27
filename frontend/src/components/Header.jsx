import React from "react";
import { useWallet } from "../context/WalletContext";
import { useEffect } from "react";

const Header = () => {
  const { isConnected, walletAddress, connectWallet } = useWallet();

  return (
    <div>
      <div className="w-screen p-2 bg-green-100 flex justify-between items-center pr-6 pl-6">
        <h1>Heading</h1>
        <button
          onClick={connectWallet}
          className="bg-gray-400 rounded-md border-1 w-[8rem] hover:bg-gray-200"
        >
          {!isConnected
            ? "Connect"
            : `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`}
        </button>
      </div>
    </div>
  );
};
export default Header;
