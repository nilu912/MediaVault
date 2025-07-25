import React from "react";
import { useWallet } from "../context/WalletContext";

const Body = () => {
  const { val } = useWallet();
  return (
    <div className="flex flex-col items-center h-screen">
      <div className="bg-red-100 w-1/2 p-2 mt-30 h-[20rem] flex flex-col justify-top items-left gap-5 p-5 pt-10">
        <h4>Select file to upload</h4>
        <h1>{val}</h1>
        <input type="file" className="border-2 p-3 bg-blue-100" />
        <button className="bg-blue-500 p-3 text-white w-[10rem]">Upload</button>
      </div>
    </div>
  );
};
export default Body;
