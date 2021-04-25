//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./Roles.sol";


contract NFT is Roles, ERC721URIStorage {
    event NFTCreated(uint256 indexed tokenId, address indexed owner, bytes32 indexed category, uint256 price, string tokenURI, string description);

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct Item {
        uint256 price;
        bytes32 category;
        string description;
    }

    mapping (uint256 => Item) private _items;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {}

    function getTotalTokens() public view returns (uint256) {
        return _tokenIds.current();
    }

    function getItem(uint256 tokenId) public view returns (Item memory) {
        return _items[tokenId];
    }

    function getItemPrice(uint256 tokenId) public view returns (uint256) {
        return _items[tokenId].price;
    }

    function createItem(address owner, uint256 price, bytes32 category, string memory tokenURI, string memory description) onlyWhitelisted public returns (uint256) {
        uint256 tokenId = _tokenIds.current();

        _safeMint(owner, tokenId);
        _items[tokenId] = Item(price, category, description);
        _setTokenURI(tokenId, tokenURI);
        _tokenIds.increment();

        emit NFTCreated(tokenId, owner, category, price, tokenURI, description);

        return tokenId;
    }
}
