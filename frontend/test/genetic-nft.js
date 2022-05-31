const { ethers } = require('hardhat');
const { use, expect } = require('chai');
const { solidity, MockProvider } = require('ethereum-waffle');

describe("GeneticNFT", function() {
    let geneticNFTFactory;

    it("Should deploy geneticNFTfactory", async function () {
     const geneticNFTContract = await ethers.getContractFactory('GeneticNFTFactory');
     geneticNFTFactory = await geneticNFTContract.deploy();
    });

    it("Should create two tokens", async function() {
      await geneticNFTFactory.createNFT("https://www.mytokenlocation.com")
      await geneticNFTFactory.createNFT("https://www.mytokenlocation2.com")

    });

    // TODO: add emmission of NFT when created
    
    it("Should return the tokens", async function() {
      const items = await geneticNFTFactory.fetchMyNFTs();
      // TODO: decompose items and check the different variable values
      console.log('items:', items)
    });
  
  })