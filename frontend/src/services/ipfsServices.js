import axios from "axios";

const pinataBaseURL = "https://api.pinata.cloud/pinning";

const pinFileToIPFS = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const metadata = JSON.stringify({
    name: file.name,
  });
  formData.append("pinataMetadata", metadata);

  const option = JSON.stringify({
    cidVersion: 1,
  });
  formData.append("pinataOptions", option);
  console.log(
    import.meta.env.VITE_PINATA_API_KEY,
    import.meta.env.VITE_PINATA_SECRET_API_KEY
  );
  const res = await axios.post(`${pinataBaseURL}/pinFileToIPFS`, formData, {
    maxBodyLength: "infinity",
    headers: {
      "Content-Type": "multipart/form-data",
      pinata_api_key: import.meta.env.VITE_PINATA_API_KEY,
      pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET_API_KEY,
    },
  });
  return `ipfs://${res.data.IpfsHash}`;
};

const pinJSONToIPFS = async (jsonData) => {
  const res = await axios.post(`${pinataBaseURL}/pinJSONToIPFS`, jsonData, {
    headers: {
      pinata_api_key: import.meta.env.VITE_PINATA_API_KEY,
      pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET_API_KEY,
    },
  });
  return `ipfs://${res.data.IpfsHash}`;
};

export { pinFileToIPFS, pinJSONToIPFS };
