const hre = require("hardhat");
const fs = require('fs');

async function main() {

  const GeneticNFT = await hre.ethers.getContractFactory("GeneticNFTFactory");
  const geneticNFT = await GeneticNFT.deploy();
  await geneticNFT.deployed();
  console.log("genetic NFT contract deployed to:", geneticNFT.address);
 
  // Write deployment address to config.js file
  // fs.writeFileSync('./src/config.js', `
  // export const geneticNFTAddress = "${geneticNFT.address}"
  // `, {
  //   flag: 'a'
  // })
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
