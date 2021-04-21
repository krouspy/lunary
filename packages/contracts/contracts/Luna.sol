//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./Roles.sol";


contract Luna is Roles, ERC20 {
  constructor(string memory name, string memory symbol) ERC20(name, symbol) { }

  function claimTokens() public {
    _mint(msg.sender, 1000);
  }
}
