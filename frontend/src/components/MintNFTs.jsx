import React, { useState, useEffect } from "react";
import { useWallet } from "../context/WalletContext";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import axios from "axios";
import Alert from "@mui/material/Alert";
import { AnimatePresence } from "framer-motion";

const MintNFTs = () => {
  const { walletAddress, mintNFT, isConnected } = useWallet();
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    tname: "",
    description: "",
  });
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [localPreview, setLocalPreview] = useState(null);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const MAX_FILE_SIZE_MB = 100; // change this to whatever limit you want
  const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles, rejectedFiles) => {
      // Handle rejections (wrong type or too large)
      if (rejectedFiles.length > 0) {
        const reason = rejectedFiles[0].errors[0].code;
        if (reason === "file-too-large") {
          setAlert({
            type: "error",
            message: `File too large! Max size is ${MAX_FILE_SIZE_MB}MB.`,
          });
        } else if (reason === "file-invalid-type") {
          setAlert({
            type: "error",
            message: "Unsupported file type. Please upload a valid NFT file.",
          });
        } else {
          setAlert({
            type: "error",
            message: "File rejected. Please try another file.",
          });
        }
        return;
      }
      if (acceptedFiles.length > 0) {
        const selected = acceptedFiles[0];
        setFile(selected);
        setFileUrl("");
        if (localPreview) URL.revokeObjectURL(localPreview);
        setLocalPreview(URL.createObjectURL(selected));
      }
    },
    accept: {
      // Images
      "image/png": [],
      "image/jpeg": [],
      "image/gif": [],
      "image/webp": [],
      "image/svg+xml": [],
      "image/tiff": [],
      "image/bmp": [],
      // Video
      "video/mp4": [],
      "video/webm": [],
      "video/ogg": [],
      "video/quicktime": [], // .mov
      // Audio
      "audio/mpeg": [], // .mp3
      "audio/wav": [],
      "audio/ogg": [],
      "audio/flac": [],
      "audio/aac": [],
      // Documents (viewable in browser, useful for NFT certificates/art)
      "application/pdf": [],
      // 3D Models
      "model/gltf-binary": [], // .glb
      "model/gltf+json": [], // .gltf
      // Archives (for NFT bundles — supported by some platforms)
      "application/zip": [],
    },
    maxSize: MAX_FILE_SIZE_BYTES,
    multiple: false,
  });

  const removeFile = () => {
    if (localPreview) URL.revokeObjectURL(localPreview);
    setFile(null);
    setLocalPreview(null);
  };

  const handleInputData = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToUpload = async () => {
    if (!file || !data.tname || !data.description) {
      if (!isConnected) {
        setAlert({
          type: "info",
          message: "Please connect your wallet first!",
        });

        // alert("Please Connect Wallet First!");
        return;
      }
      setAlert({
        type: "info",
        message: "Please fill data and select a file!",
      });
      // Name validation
      if (!data.tname.trim()) {
        setAlert({ type: "warning", message: "NFT name is required." });
        return;
      }
      if (data.tname.trim().length < 3) {
        setAlert({
          type: "warning",
          message: "NFT name must be at least 3 characters.",
        });
        return;
      }
      if (data.tname.trim().length > 50) {
        setAlert({
          type: "warning",
          message: "NFT name must be under 50 characters.",
        });
        return;
      }
      // Description validation
      if (!data.description.trim()) {
        setAlert({ type: "warning", message: "Description is required." });
        return;
      }
      if (data.description.trim().length < 10) {
        setAlert({
          type: "warning",
          message: "Description must be at least 10 characters.",
        });
        return;
      }
      if (data.description.trim().length > 500) {
        setAlert({
          type: "warning",
          message: "Description must be under 500 characters.",
        });
        return;
      }
      // File check
      if (!file) {
        setAlert({ type: "warning", message: "Please select a file to mint." });
        return;
      }
      //   alert("Please fill data and select a file!");
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
        }),
      );

      const result = await axios.post(
        `${import.meta.env.VITE_PORT}/upload`,
        formData,
      );
      try {
        const hash = await mintNFT(`ipfs://${result.data.metadataHash}`);
        // console.log("transacition hash", hash);
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
  useEffect(() => {
    if (alert.message) {
      const timeout = setTimeout(() => {
        setAlert({ type: "", message: "" });
      }, 4000);
      return () => clearTimeout(timeout);
    }
  }, [alert]);

  return (
    <>
      <AnimatePresence>
        {alert.message && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-md"
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
            maxLength={50}
            value={data.tname}
            className="w-full px-4 py-3 mb-4 rounded-lg bg-white/10 text-white placeholder-white/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#6EE7B7] transition-all hover:shadow-[0_8px_30px_rgba(1,1,1,0.1)] hover:scale-[101%]"
            required
          />
          <p
            className={`text-xs text-right mb-3 ${data.tname.length > 45 ? "text-red-400" : "text-white/30"}`}
          >
            {data.tname.length}/50
          </p>

          {/* NFT Description Input */}
          <textarea
            name="description"
            onChange={handleInputData}
            placeholder="Description"
            value={data.description}
            maxLength={500}
            className="w-full px-4 py-3 mb-4 rounded-lg bg-white/10 text-white placeholder-white/70 border border-white/20 resize-none h-24 focus:outline-none focus:ring-2 focus:ring-[#6EE7B7] transition-all hover:shadow-[0_8px_30px_rgba(1,1,1,0.1)] hover:scale-[101%]"
            required
          />
          <p
            className={`text-xs text-right mb-3 ${data.description.length > 450 ? "text-red-400" : "text-white/30"}`}
          >
            {data.description.length}/500
          </p>

          {/* Dropzone Upload */}
          {/* <div
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
              <p>Drag & drop file or click to select</p>
            )}
          </div> */}
          {/* Dropzone Upload */}
          {!file ? (
            <div
              {...getRootProps()}
              className={`cursor-pointer px-6 py-8 mb-6 text-center text-white border-2 border-dashed rounded-xl transition-all duration-300 ${
                isDragActive
                  ? "border-[#6EE7B7] bg-[#6EE7B7]/10"
                  : "border-white/30 bg-white/5 hover:border-[#6EE7B7] hover:bg-white/10"
              }`}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p className="text-[#6EE7B7]">Drop your image here...</p>
              ) : (
                <>
                  <p className="text-white/80 mb-1">
                    Drag & drop file or click to select
                  </p>
                  <p className="text-white/40 text-xs">
                    PNG, JPG, GIF, WEBP, SVG supported
                  </p>
                </>
              )}
            </div>
          ) : (
            <div className="mb-6 rounded-xl border border-white/20 bg-white/5 p-4">
              {/* Preview */}
              <div className="flex items-center gap-4">
                <a
                  href={localPreview}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Click to view file"
                >
                  {file.type.startsWith("image/") ? (
                    <img
                      src={localPreview}
                      alt="Preview"
                      className="w-16 h-16 object-cover rounded-lg border border-white/20 flex-shrink-0 cursor-pointer hover:opacity-80 hover:scale-105 transition-all"
                    />
                  ) : file.type.startsWith("video/") ? (
                    <div className="w-16 h-16 rounded-lg border border-white/20 flex-shrink-0 bg-white/10 flex items-center justify-center text-2xl cursor-pointer hover:opacity-80 hover:scale-105 transition-all">
                      🎬
                    </div>
                  ) : file.type.startsWith("audio/") ? (
                    <div className="w-16 h-16 rounded-lg border border-white/20 flex-shrink-0 bg-white/10 flex items-center justify-center text-2xl cursor-pointer hover:opacity-80 hover:scale-105 transition-all">
                      🎵
                    </div>
                  ) : file.type === "application/pdf" ? (
                    <div className="w-16 h-16 rounded-lg border border-white/20 flex-shrink-0 bg-white/10 flex items-center justify-center text-2xl cursor-pointer hover:opacity-80 hover:scale-105 transition-all">
                      📄
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-lg border border-white/20 flex-shrink-0 bg-white/10 flex items-center justify-center text-2xl cursor-pointer hover:opacity-80 hover:scale-105 transition-all">
                      📦
                    </div>
                  )}
                </a>
                <div className="flex-1 min-w-0">
                  <p className="text-green-400 font-medium text-sm truncate">
                    ✅ {file.name}
                  </p>
                  <p className="text-white/40 text-xs mt-0.5">
                    {(file.size / 1024).toFixed(1)} KB ·{" "}
                    {file.type.split("/")[1].toUpperCase()}
                  </p>
                </div>
              </div>
              {/* Actions */}
              <div className="flex gap-2 mt-3">
                {/* Change file button — re-opens the dropzone picker */}
                <div {...getRootProps()} className="flex-1">
                  <input {...getInputProps()} />
                  <button
                    type="button"
                    className="w-full text-xs py-1.5 px-3 rounded-lg border border-white/20 text-white/70 hover:text-white hover:border-[#6EE7B7] transition-all"
                  >
                    🔄 Change File
                  </button>
                </div>
                {/* Remove file button */}
                <button
                  type="button"
                  onClick={removeFile}
                  className="flex-1 text-xs py-1.5 px-3 rounded-lg border border-red-400/40 text-red-400 hover:bg-red-400/10 hover:border-red-400 transition-all"
                >
                  🗑 Remove
                </button>
              </div>
            </div>
          )}

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
    </>
  );
};

export default MintNFTs;
