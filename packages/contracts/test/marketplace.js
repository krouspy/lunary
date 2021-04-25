const { expect } = require('chai');
const { ethers } = require('hardhat');

const price = 100;
const category = ethers.utils.formatBytes32String('art');
const tokenURI = 'tokenURI';
const description = 'description';

describe('Marketplace', async () => {
  let marketplace;
  let erc20;
  let erc721;
  let deployer;
  let addr1;
  let addr2;

  beforeEach(async () => {
    [deployer, addr1, addr2] = await ethers.getSigners();

    const ERC20 = await ethers.getContractFactory('Luna');
    const ERC721 = await ethers.getContractFactory('NFT');
    const Marketplace = await ethers.getContractFactory('Lunary');

    erc20 = await ERC20.deploy('Luna', 'Luna');
    erc721 = await ERC721.deploy('NFT', 'NFT');
    marketplace = await Marketplace.deploy(erc20.address, erc721.address);

    await erc20.deployed();
    await erc721.deployed();
    await marketplace.deployed();

    await erc721.addToWhitelist(marketplace.address);
  });

  describe('Deployment', () => {
    it('Marketplace owner should be set to deployer', async () => {
      expect(await marketplace.owner()).to.equal(deployer.address);
    });
  });

  it('createNFT(): should create an NFT for caller', async () => {
    const tokenId = await erc721.getTotalTokens();
    await expect(marketplace.connect(addr1).createNFT(price, category, tokenURI, description))
      .to.emit(erc721, 'NFTCreated')
      .withArgs(tokenId, addr1.address, category, price, tokenURI, description);
  });

  it('buyNFT(): caller should buy an NFT', async () => {
    // addr2 buys NFT of addr1
    await erc20.connect(addr2).claimTokens();
    await erc20.connect(addr2).approve(marketplace.address, price);

    const tokenId = await erc721.getTotalTokens();
    await marketplace.connect(addr1).createNFT(price, category, tokenURI, description);
    await erc721.connect(addr1).approve(marketplace.address, tokenId);

    const seller = addr1.address;
    const buyer = addr2.address;

    const sellerBalanceBefore = await erc20.balanceOf(seller);
    const buyerBalanceBefore = await erc20.balanceOf(buyer);

    await expect(marketplace.connect(addr2).buyNFT(tokenId))
      .to.emit(marketplace, 'NFTBought')
      .withArgs(seller, buyer, tokenId);

    const newOwner = await erc721.ownerOf(tokenId);
    expect(newOwner).to.equal(buyer, 'did not transfer NFT to buyer');

    const sellerBalanceAfter = await erc20.balanceOf(seller);
    const buyerBalanceAfter = await erc20.balanceOf(buyer);

    expect(sellerBalanceAfter).to.equal(
      sellerBalanceBefore + price,
      'did not pay right amount from buyer to seller',
    );
    expect(buyerBalanceAfter).to.equal(
      buyerBalanceBefore - price,
      'did not pay right amount from buyer to seller',
    );
  });
});
