//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./Roles.sol";


contract NFT is Roles, ERC721 {
    event NFTCreated(uint256 indexed tokenId, address indexed owner, bytes32 indexed category, uint256 price);

    struct Item {
        uint256 price;
        bytes32 category;
    }

    uint256 private _totalTokens;

    mapping (uint256 => Item) private _items;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {}

    function getTotalTokens() public view returns (uint256) {
        return _totalTokens;
    }

    function getItem(uint256 tokenId) public view returns (Item memory) {
        return _items[tokenId];
    }

    function getItemPrice(uint256 tokenId) public view returns (uint256) {
        return _items[tokenId].price;
    }

    function createItem(address owner, uint256 price, bytes32 category) onlyWhitelisted public returns (bool) {
        _safeMint(owner, _totalTokens);
        _items[_totalTokens] = Item(price, category);
        _totalTokens++;
        emit NFTCreated(_totalTokens - 1, owner, category, price);
        return true;
    }
}
