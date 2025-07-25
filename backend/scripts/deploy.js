const hre = require("hardhat");

async function main() {
  const Contract = await hre.ethers.getContractFactory("MediaVault");
  const contract = await Contract.deploy();
  await contract.waitForDeployment();
  console.log(`Contract deployed at: ${contract.target}`);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9