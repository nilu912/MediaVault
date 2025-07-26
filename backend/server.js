const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");
const fs = require("fs");
const { error } = require("console");
const axios = require("axios");
const FormData = require("form-data");

dotenv.config();
const app = express();
app.use(cors());
const upload = multer({ dest: "uploads/" });

app.get("/api", (req, res) => {
  // console.log("click")
  res.status(200).json({ message: "Server is running" });
});
app.post("/api/upload", upload.single("file"), async (req, res, next) => {
  //   console.log("click");
  const { metaDataReq } = req.body;
  console.log(metaDataReq);
  //   return;
  const file = fs.createReadStream(req.file.path);

  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "pinataMetaData",
    JSON.stringify({ name: req.file.filename })
  );
  formData.append("pinataOptions", JSON.stringify({ cidVersion: 1 }));
  //   formData.append("metadata", metadata);

  try {
    const response = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        maxBodyLength: "infinity",
        headers: {
          ...formData.getHeaders(),
          pinata_api_key: process.env.PINATA_API_KEY,
          pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY,
        },
      }
    );
    console.log(response.data.IpfsHash);
    const metadata = {
      name: JSON.parse(metaDataReq).name,
      description: JSON.parse(metaDataReq).description,
      image: `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`,
    };
    console.log(metadata)
    const secResponse = await axios.post(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      metadata,
      {
        headers: {
          "Content-Type": "application/json",
          pinata_api_key: process.env.PINATA_API_KEY,
          pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY,
        },
      }
    );
    console.log(secResponse.data.IpfsHash);
    try {
      fs.unlinkSync(req.file.path);
    } catch (err) {
      console.err(err);
    }
    console.log(response.data.IpfsHash);
    res.status(200).json({
      imgHash: response.data.IpfsHash,
      metadataHash: secResponse.data.IpfsHash,
      metadata,
    });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({
      error: "Upload file failed",
    });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
