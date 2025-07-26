import React, { useState } from "react";
import { useWallet } from "../context/WalletContext";
import { pinFileToIPFS, pinJSONToIPFS } from "../services/ipfsServices";
import axios from "axios";

const Body = () => {
  const { walletAddress, mintNFT } = useWallet();
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
  const [data, setData] = useState({
    tname: "",
    description: "",
  });

  const handleFileChange = (e) => {
    // console.log(e.target.files[0])
    setFile(e.target.files[0]);
  };
  const handleInputData = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleToUpload = async () => {
    if (!file) {
      // console.log(file)
      alert("Please select a file firls!");
      return;
    }
    try {
      // const result = await pinFileToIPFS(file);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("metaDataReq", JSON.stringify({
        name: data.tname,
        description: data.description,
      }));
      const result = await axios.post(
        `${import.meta.env.VITE_PORT}/upload`,
        formData
      );
      const res = setFileUrl(result);
      mintNFT(`ipfs://${result.data.metadataHash}`)
      console.log("file pinned to ipfs", result);
      console.log(res)
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="flex flex-col items-center h-screen">
      <div className="bg-red-100 w-1/2 p-2 mt-30 h-[20rem] flex flex-col justify-top items-left gap-5 p-5 pt-10">
        <h4>Name</h4>
        <input
          type="text"
          name="tname"
          onChange={handleInputData}
          placeholder="Enter name"
        />
        <h4>Description</h4>
        <input
          type="text"
          name="description"
          onChange={handleInputData}
          placeholder="Enter description"
        />
        <h4>Select file to upload</h4>
        <input
          type="file"
          className="border-2 p-3 bg-blue-100"
          onChange={handleFileChange}
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
              href={`https://gateway.pinata.cloud/ipfs/${fileUrl.data.imgHash}`}
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
