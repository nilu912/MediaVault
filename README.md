# 🧿 NFT Media Vault

**NFT Media Vault** is a decentralized application (dApp) that allows users to mint NFTs of their **media files** — including images, videos, PDFs, and documents — and store them **permanently on the blockchain**.  

Built using **React**, **Solidity**, and **Hardhat**, and deployed on the **Ethereum Sepolia Testnet**.

---

## 🚀 Features

- 🔐 **NFT Minting** — Upload media files (image, video, pdf, document) and mint them as NFTs.
- 🧠 **Smart Contract Integration** — Securely written in Solidity and deployed on the Ethereum network.
- 🧾 **Token Dashboard**  
  - View your **minted NFTs**  
  - Explore **all minted NFTs** on the platform
- 🏠 **Home Page** — Simple landing page with navigation to all sections.
- 📦 **Permanent Storage** — Files are uploaded to IPFS using **Pinata**.

---

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|---------------|
| Frontend | React (Vite) |
| Smart Contract | Solidity, Hardhat |
| Blockchain | Ethereum (Sepolia Testnet) |
| Storage | IPFS (via Pinata) |
| Deployment | Infura RPC Endpoint |

---

## 📁 Folder Structure

nft-media-vault/
│
├── backend/
│ ├── contracts/
│ ├── scripts/
│ ├── test/
│ ├── .env.example
│ └── hardhat.config.js
│
├── frontend/
│ ├── src/
│ ├── public/
│ ├── .env.example
│ └── vite.config.js
│
└── README.md

---

## ⚙️ Environment Variables

### 🔹 Backend `.env` Example
```env
PRIVATE_KEY=
PORT=
PINATA_API_KEY=
PINATA_SECRET_API_KEY=
PINATA_JWT=
INFURA_API_KEY=
```

### 🔹 Frontend `.env` Example
```env
VITE_CONTRACT_ADDRESS=
VITE_PINATA_API_KEY=
VITE_PINATA_SECRET_API_KEY=
VITE_PORT=
```

🧩 Installation & Setup
1. Clone the Repository
git clone https://github.com/your-username/nft-media-vault.git
cd nft-media-vault

2. Install Dependencies

Backend

cd backend
npm install


Frontend

cd ../frontend
npm install

3. Configure Environment Variables

Create .env files in both backend and frontend using the examples above.

4. Compile & Deploy Smart Contract
npx hardhat compile
npx hardhat run scripts/deploy.js --network sepolia


After deployment, copy the contract address and paste it into your frontend .env as:

VITE_CONTRACT_ADDRESS=your_contract_address_here

5. Run the Application

Backend

npm run dev


Frontend

npm run dev

🪙 Smart Contract Details

Network: Ethereum Sepolia Testnet

Standard: ERC-721

Tools: Hardhat, Ethers.js

👨‍💻 Author

Nilu Panchal
MSc Blockchain Technology | MERN & Web3 Developer
📧 panchalnilu91@gmail.com
🌐 (https://www.linkedin.com/in/nilu912/)

🪄 License

This project is licensed under the MIT License — feel free to use, modify, and distribute with attribution.



