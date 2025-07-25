const { expect } = require("chai");
const hre = require("hardhat");
describe("MediaVault", function(){
    let contract;
    let owner, user;
    let tokenURI = "ipfs://fake-ipfs-link/metadata.json";
    beforeEach(async function () {
        let Contract =  await hre.ethers.getContractFactory("MediaVault");
        [owner, user] = await ethers.getSigners();

        contract = await Contract.deploy();
        await contract.waitForDeployment();
    });

    it("should mint an NFT and assign it to the user", async function () {
        // const tokenURI = "ipfs://fake-ipfs-link/metadata.json";
        const mintTx = await contract.connect(user).safeMint(user.address, tokenURI);
        await mintTx.wait();
        
        const tokenOwner = await contract.ownerOf(0);
        expect(tokenOwner).to.equal(user.address);

        const returnURI = await contract.tokenURI(0);
        expect(tokenURI).to.equal(returnURI);
    })
    it("token owned by", async function(){
        const mintTx = await contract.connect(user).safeMint(user.address, tokenURI);
        await mintTx.wait();
        
        const tokendata = await contract.tokenURI(0);
        expect(tokendata).to.equal(tokenURI);
    })
});