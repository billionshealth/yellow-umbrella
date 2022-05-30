// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";

// TODO: simplify this contract further
// TODO: add ability to 'recombine' with others

contract GeneticNIFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    address payable owner;

    mapping(uint256 => GeneticNFT) private idToGeneticNFT;

    struct GeneticNFT {
      uint256 tokenId;
      address payable seller;
      address payable owner;
      uint256 price;
      bool sold;
    }

    event GeneticNFTCreated (
      uint256 indexed tokenId,
      address seller,
      address owner,
      uint256 price,
      bool sold
    );

    constructor() ERC721("Genetic Mandala NFTs", "MAND") {
      owner = payable(msg.sender);
    }

    /* Mints a token and lists it in the marketplace */
    function createToken(string memory tokenURI, uint256 price) public payable returns (uint) {
      _tokenIds.increment();
      uint256 newTokenId = _tokenIds.current();

      _mint(msg.sender, newTokenId);
      _setTokenURI(newTokenId, tokenURI);
      createMarketItem(newTokenId, price);
      return newTokenId;
    }

    function createMarketItem(
      uint256 tokenId,
      uint256 price
    ) private {
      require(price > 0, "Price must be at least 1 wei");
    //   require(msg.value == listingPrice, "Price must be equal to listing price");

      idToGeneticNFT[tokenId] =  GeneticNFT(
        tokenId,
        payable(msg.sender),
        payable(address(this)),
        price,
        false
      );

      _transfer(msg.sender, address(this), tokenId);
      emit GeneticNFTCreated(
        tokenId,
        msg.sender,
        address(this),
        price,
        false
      );
    }

    /* allows someone to resell a token they have purchased */
    function resellToken(uint256 tokenId, uint256 price) public payable {
      require(idToGeneticNFT[tokenId].owner == msg.sender, "Only item owner can perform this operation");
    //   require(msg.value == listingPrice, "Price must be equal to listing price");
      idToGeneticNFT[tokenId].sold = false;
      idToGeneticNFT[tokenId].price = price;
      idToGeneticNFT[tokenId].seller = payable(msg.sender);
      idToGeneticNFT[tokenId].owner = payable(address(this));
    //   _itemsSold.decrement();

      _transfer(msg.sender, address(this), tokenId);
    }

    /* Creates the sale of a marketplace item */
    /* Transfers ownership of the item, as well as funds between parties */
    function createMarketSale(
      uint256 tokenId
      ) public payable {
      uint price = idToGeneticNFT[tokenId].price;
      address seller = idToGeneticNFT[tokenId].seller;
      require(msg.value == price, "Please submit the asking price in order to complete the purchase");
      idToGeneticNFT[tokenId].owner = payable(msg.sender);
      idToGeneticNFT[tokenId].sold = true;
      idToGeneticNFT[tokenId].seller = payable(address(0));
    //   _itemsSold.increment();
      _transfer(address(this), msg.sender, tokenId);
    //   payable(owner).transfer(listingPrice);
      payable(seller).transfer(msg.value);
    }


    /* Returns only items that a user has purchased */
    function fetchMyNFTs() public view returns (GeneticNFT[] memory) {
      uint totalItemCount = _tokenIds.current();
      uint itemCount = 0;
      uint currentIndex = 0;

      for (uint i = 0; i < totalItemCount; i++) {
        if (idToGeneticNFT[i + 1].owner == msg.sender) {
          itemCount += 1;
        }
      }

      GeneticNFT[] memory items = new GeneticNFT[](itemCount);
      for (uint i = 0; i < totalItemCount; i++) {
        if (idToGeneticNFT[i + 1].owner == msg.sender) {
          uint currentId = i + 1;
          GeneticNFT storage currentItem = idToGeneticNFT[currentId];
          items[currentIndex] = currentItem;
          currentIndex += 1;
        }
      }
      return items;
    }

    /* Returns only items a user has listed */
    function fetchItemsListed() public view returns (GeneticNFT[] memory) {
      uint totalItemCount = _tokenIds.current();
      uint itemCount = 0;
      uint currentIndex = 0;

      for (uint i = 0; i < totalItemCount; i++) {
        if (idToGeneticNFT[i + 1].seller == msg.sender) {
          itemCount += 1;
        }
      }

      GeneticNFT[] memory items = new GeneticNFT[](itemCount);
      for (uint i = 0; i < totalItemCount; i++) {
        if (idToGeneticNFT[i + 1].seller == msg.sender) {
          uint currentId = i + 1;
          GeneticNFT storage currentItem = idToGeneticNFT[currentId];
          items[currentIndex] = currentItem;
          currentIndex += 1;
        }
      }
      return items;
    }
}