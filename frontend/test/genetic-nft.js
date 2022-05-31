const { ethers } = require('hardhat');
const { use, expect } = require('chai');
const { solidity, MockProvider } = require('ethereum-waffle');

describe("GeneticNFT", function() {
    let geneticNFTFactory;
    const [alice, bob] = new MockProvider().getWallets();

    it("Should deploy geneticNFTfactory", async function () {
     const geneticNFTContract = await ethers.getContractFactory('GeneticNFTFactory');
     geneticNFTFactory = await geneticNFTContract.deploy();
    //  expect(geneticNFTFactory.address).to.be.properAddress;
     expect(await geneticNFTFactory.symbol()).to.be.equal('MAND')
    });

    it("Should create two tokens", async function() {
      await geneticNFTFactory.createNFT("https://www.mytokenlocation.com", 1050)
      await geneticNFTFactory.createNFT("https://www.mytokenlocation2.com", 1051)
    // TODO: add expectation of emmission of NFT when created
    });

    
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
      // TODO: add expect statement around contents
    });

    it("Should not return any tokens from a different msg.sender", async function() {
      // TODO: complete this test. currently incomplete.

      // const bobNFTFactory = geneticNFTFactory.connect(bob)
      var items = await geneticNFTFactory.fetchMyNFTs();

      // items = await Promise.all(items.map(async i => {
      //   const tokenUri = await geneticNFTFactory.tokenURI(i.tokenId)
      //   let item = {
      //     tokenId: i.tokenId.toString(),
      //     owner: i.owner,
      //     geneticHash: i.geneticHash,
      //     tokenUri
      //   }
      //   return item
      // }))
      
      console.log('items for bob:', items)
    });
  
  })