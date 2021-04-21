// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import 'dotenv/config';
import '@nomiclabs/hardhat-waffle';
import hre from 'hardhat';
import Luna from '../artifacts/contracts/Luna.sol/Luna.json';
import NFT from '../artifacts/contracts/NFT.sol/NFT.json';
import Lunary from '../artifacts/contracts/Lunary.sol/Lunary.json';
import { Api } from '@project/helpers';

const erc20Name = 'Luna';
const erc20Symbol = 'Luna';
const erc721Name = 'NFT';
const erc721Symbol = 'NFT';

const serverBaseUri = process.env.SERVER_BASE_URI;

const api = new Api(serverBaseUri);

async function main() {
  await hre.run('compile');

  const ERC20 = await hre.ethers.getContractFactory('Luna');
  const ERC721 = await hre.ethers.getContractFactory('NFT');
  const Marketplace = await hre.ethers.getContractFactory('Lunary');
  const erc20 = await ERC20.deploy(erc20Name, erc20Symbol);
  const erc721 = await ERC721.deploy(erc721Name, erc721Symbol);
  const marketplace = await Marketplace.deploy(erc20.address, erc721.address);

  await erc20.deployed();
  await erc721.deployed();
  await marketplace.deployed();

  await erc20.addToWhitelist(marketplace.address);
  await erc721.addToWhitelist(marketplace.address);

  await api.registerOneContract('erc20', erc20Name, erc20.address, Luna.abi);
  await api.registerOneContract('erc721', erc721Name, erc721.address, NFT.abi);
  await api.registerOneContract('marketplace', 'Lunary', marketplace.address, Lunary.abi);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
