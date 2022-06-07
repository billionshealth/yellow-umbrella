// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const fs = require('fs');

async function main() {

  const GeneticNFT = await hre.ethers.getContractFactory("GeneticNFTFactory");
  const geneticNFT = await GeneticNFT.deploy();
  await geneticNFT.deployed();
  console.log("genetic NFT contract deployed to:", geneticNFT.address);
  fs.writeFileSync('./src/config.js', `
  export const geneticNFTAddress = "${geneticNFT.address}"
  `)

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
