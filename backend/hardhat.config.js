/** @type import('hardhat/config').HardhatUserConfig */
// require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ethers");


module.exports = {
  solidity: "0.8.28",
  networks: {
    hardhat: {
      chainId: 31337, // Hardhat's default
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337, // Must match MetaMask
    },
  },
};
