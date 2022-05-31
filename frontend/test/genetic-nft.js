const { ethers } = require('hardhat');
const { use, expect } = require('chai');
const { solidity, MockProvider } = require('ethereum-waffle');
const { verifyMessage } = require('ethers/lib/utils');

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
    
    it("Should return the tokens after creation", async function() {
      var items = await geneticNFTFactory.fetchMyNFTs();

      items = await Promise.all(items.map(async i => {
        const tokenUri = await geneticNFTFactory.tokenURI(i.tokenId)
        let item = {
          tokenId: i.tokenId.toString(),
          owner: i.owner,
          geneticHash: i.geneticHash,
          tokenUri
        }
        return item
      }))
      
      console.log('items:', items)
    });

    // TODO: add test for when a different address calls fetchMyNFTs
  
  })