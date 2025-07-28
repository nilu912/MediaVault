import React, { useState } from "react";
import { useWallet } from "../context/WalletContext";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import axios from "axios";

const MintNFTs = () => {
  const { walletAddress, mintNFT } = useWallet();
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    tname: "",
    description: "",
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => setFile(acceptedFiles[0]),
    // accept: { "image/*": [] },
    multiple: false,
  });

  const handleInputData = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToUpload = async () => {
    if (!file || !data.tname || !data.description) {
      alert("Please complete all fields and select a file!");
      return;
    }
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "metaDataReq",
        JSON.stringify({
          name: data.tname,
          description: data.description,
        })
      );

      const result = await axios.post(
        `${import.meta.env.VITE_PORT}/upload`,
        formData
      );
      try {
        const hash = await mintNFT(`ipfs://${result.data.metadataHash}`);
        console.log("transacition hash", hash);
      } catch (err) {
        console.error(err);
      } finally {
        setData({
          tname: "",
          description: "",
        });
        setFileUrl(result.data.imgHash);
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-screen flex items-center justify-center px-4">
      {/* Animated Background Blob */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full z-0 blur-[100px] opacity-30"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
        style={{
          background:
            "radial-gradient(circle at 30% 30%, #6EE7B7, transparent 40%), radial-gradient(circle at 70% 70%, #3B82F6, transparent 40%)",
        }}
      />

      {/* Card Container */}
      <motion.div
        className="relative z-10 bg-white/10 backdrop-blur-md rounded-3xl p-8 w-full max-w-lg shadow-2xl border border-white/20 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:scale-[101%]"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-white drop-shadow-md tracking-wide">
          Mint Your NFT
        </h2>

        {/* NFT Name Input */}
        <input
          type="text"
          name="tname"
          onChange={handleInputData}
          placeholder="NFT Name"
          value={data.tname}
          className="w-full px-4 py-3 mb-4 rounded-lg bg-white/10 text-white placeholder-white/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#6EE7B7] transition-all hover:shadow-[0_8px_30px_rgba(1,1,1,0.1)] hover:scale-[101%]"
        />

        {/* NFT Description Input */}
        <textarea
          name="description"
          onChange={handleInputData}
          placeholder="Description"
          value={data.description}
          className="w-full px-4 py-3 mb-4 rounded-lg bg-white/10 text-white placeholder-white/70 border border-white/20 resize-none h-24 focus:outline-none focus:ring-2 focus:ring-[#6EE7B7] transition-all hover:shadow-[0_8px_30px_rgba(1,1,1,0.1)] hover:scale-[101%]"
        />

        {/* Dropzone Upload */}
        <div
          {...getRootProps()}
          className={`cursor-pointer px-6 py-8 mb-6 text-center text-white border-2 border-dashed rounded-xl transition-all duration-300 ${
            isDragActive
              ? "border-[#6EE7B7] bg-[#6EE7B7]/10"
              : "border-white/30 bg-white/5 hover:border-[#6EE7B7] hover:bg-white/10"
          }`}
        >
          <input {...getInputProps()} />
          {file ? (
            <p className="text-green-400 font-medium">✅ {file.name}</p>
          ) : isDragActive ? (
            <p className="text-[#6EE7B7]">Drop your image here...</p>
          ) : (
            <p>Drag & drop an image or click to select</p>
          )}
        </div>

        {/* Upload Button */}
        <button
          onClick={handleToUpload}
          disabled={loading}
          className={`w-full font-semibold text-white py-3 rounded-lg transition-all hover:shadow-[0_8px_30px_rgba(1,1,1,0.3)] duration-300 ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-gradient-to-r from-[#6EE7B7] to-[#3B82F6] hover:scale-105 hover:shadow-lg"
          }`}
        >
          {loading ? "Uploading..." : "Upload & Mint"}
        </button>

        {/* Image Preview + IPFS Link */}
        {fileUrl && (
          <div className="mt-6 text-center">
            <p className="mb-2 text-white/80">✅ Uploaded to IPFS:</p>
            <a
              href={`https://gateway.pinata.cloud/ipfs/${fileUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-[#6EE7B7] hover:text-[#3B82F6] transition-colors"
            >
              View on IPFS
            </a>
            <div className="mt-4">
              <img
                src={`https://gateway.pinata.cloud/ipfs/${fileUrl}`}
                alt="Uploaded Preview"
                className="mx-auto w-40 h-40 object-cover rounded-lg shadow-md border border-white/20"
              />
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default MintNFTs;
