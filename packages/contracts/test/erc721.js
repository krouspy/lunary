const { expect } = require('chai');
const { ethers } = require('hardhat');

const name = 'NFT';
const symbol = 'NFT';
const title = 'title';
const price = 100;
const category = ethers.utils.formatBytes32String('art');
const description = 'description';
const tokenURI = 'tokenURI';

describe('ERC721', async () => {
  let erc721;
  let deployer;
  let addr1;

  beforeEach(async () => {
    [deployer, addr1] = await ethers.getSigners();

    const ERC721 = await ethers.getContractFactory(name);
    erc721 = await ERC721.deploy(name, symbol);
    await erc721.deployed();
  });

  describe('Deployment', () => {
    it('ERC721 owner should be set to deployer', async () => {
      expect(await erc721.owner()).to.equal(deployer.address);
    });

    it('ERC721 deployer should be whitelisted', async () => {
      expect(await erc721.isWhitelisted(deployer.address)).to.equal(true);
    });

    it(`ERC721 name should be set to ${name}`, async () => {
      expect(await erc721.name()).to.equal(name);
    });

    it(`ERC721 symbol should be set to ${symbol}`, async () => {
      expect(await erc721.symbol()).to.equal(symbol);
    });
  });

  describe('Functions', () => {
    it('should create an item', async () => {
      await erc721.addToWhitelist(addr1.address);

      const totalTokensBefore = await erc721.getTotalTokens();

      await expect(
        erc721
          .connect(addr1)
          .createItem(addr1.address, title, price, category, tokenURI, description),
      )
        .to.emit(erc721, 'NFTCreated')
        .withArgs(totalTokensBefore, addr1.address, category, title, price, tokenURI, description);

      const [itemTitle, itemPrice, itemCategory, itemDescription] = await erc721.getItem(
        totalTokensBefore,
      );
      const itemURI = await erc721.tokenURI(totalTokensBefore);
      const totalTokensAfter = await erc721.getTotalTokens();

      expect(itemTitle).to.equal(title, 'item title not set correctly');
      expect(itemPrice).to.equal(price, 'item price not set correctly');
      expect(itemCategory).to.equal(category, 'item category not set correctly');
      expect(itemURI).to.equal(tokenURI, 'item uri not set correctly');
      expect(itemDescription).to.equal(description, 'item description not set correctly');
      expect(totalTokensBefore).to.equal(
        totalTokensAfter - 1,
        'totalTokens not incremented correctly',
      );
    });

    it('should not create item from not whitelisted address', async () => {
      expect(await erc721.isWhitelisted(addr1.address)).to.equal(false);
      await expect(erc721.connect(addr1).createItem(addr1.address, price, category, tokenURI)).to.be
        .reverted;
    });
  });

  describe('Whitelisting', () => {
    it('Owner can add address to whitelist', async () => {
      await expect(erc721.addToWhitelist(addr1.address))
        .to.emit(erc721, 'UpdateWhitelist')
        .withArgs(addr1.address, true);

      expect(await erc721.isWhitelisted(addr1.address)).to.equal(
        true,
        'address did not get added to whitelist',
      );
    });

    it('Owner can remove address from whitelist', async () => {
      await erc721.addToWhitelist(addr1.address);

      await expect(erc721.removeFromWhitelist(addr1.address))
        .to.emit(erc721, 'UpdateWhitelist')
        .withArgs(addr1.address, false);

      expect(await erc721.isWhitelisted(addr1.address)).to.equal(
        false,
        'address did not get removed from whitelist',
      );
    });

    it('Not owner can not add address to whitelist', async () => {
      expect(await erc721.owner()).to.not.equal(addr1.address);
      await expect(erc721.connect(addr1).addToWhitelist(addr1.address)).to.reverted;
    });

    it('Not owner can not remove address from whitelist', async () => {
      expect(await erc721.owner()).to.not.equal(addr1.address);
      await expect(erc721.connect(addr1).removeFromWhitelist(addr1.address)).to.reverted;
    });
  });
});
