//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";


abstract contract Roles is Ownable {
    event UpdateWhitelist(address indexed account, bool indexed isWhitelisted);

    mapping (address => bool) private whitelisted;

    constructor() {
        whitelisted[msg.sender] = true;
    }

    modifier onlyWhitelisted() {
        require(whitelisted[msg.sender], "Roles: Caller must be whitelisted");
        _;
    }

    function isWhitelisted(address account) public view returns (bool) {
        return whitelisted[account];
    }

    function addToWhitelist(address account) onlyOwner public returns (bool) {
        require(!whitelisted[account], "Roles: Account already whitelisted");
        whitelisted[account] = true;
        emit UpdateWhitelist(account, true);
        return true;
    }

    function removeFromWhitelist(address account) onlyOwner public returns (bool) {
        require(whitelisted[account], "Roles: Account is not whitelisted");
        whitelisted[account] = false;
        emit UpdateWhitelist(account, false);
        return true;
    }
}
