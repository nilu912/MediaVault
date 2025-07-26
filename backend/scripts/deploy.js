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

// 0xd10B257EbAFFbfbBd2BE7D9A65A0580aC125c558