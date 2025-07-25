import React, { useState } from "react";
import { useWallet } from "../context/WalletContext";
import { pinFileToIPFS, pinJSONToIPFS } from "../services/ipfsServices";

const Body = async () => {
  const { val } = useWallet();
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleToUpload = async () => {
    if (!file) {
      alert("Please select a file firls!");
      return;
    }
    try {
      const result = await pinFileToIPFS(file);
      setFileUrl(result);
      console.log("file pinned to ipfs", result);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="flex flex-col items-center h-screen">
      <div className="bg-red-100 w-1/2 p-2 mt-30 h-[20rem] flex flex-col justify-top items-left gap-5 p-5 pt-10">
        <h4>Select file to upload</h4>
        <input
          type="file"
          className="border-2 p-3 bg-blue-100"
          onClick={handleFileChange}
        />
        <button
          className="bg-blue-500 p-3 text-white w-[10rem]"
          onClick={handleToUpload}
        >
          Upload
        </button>
        {fileUrl && (
          <div className="mt-4">
            <p>File uploaded to IPFS: </p>
            <a
              href={`https://gateway.pinata.cloud/ipfs/${fileUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 underline"
            >
              View on IPFS
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
export default Body;
