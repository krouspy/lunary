const { expect } = require('chai');
const { ethers } = require('hardhat');

const name = 'Luna';
const symbol = 'Luna';
const amount = 1000;

describe('ERC20', async () => {
  let erc20;
  let deployer;
  let addr1;
  let addr2;

  beforeEach(async () => {
    [deployer, addr1, addr2] = await ethers.getSigners();

    const ERC20 = await ethers.getContractFactory(name);
    erc20 = await ERC20.deploy(name, symbol);
    await erc20.deployed();
  });

  describe('Deployment', () => {
    it('ERC20 owner should be set to deployer', async () => {
      expect(await erc20.owner()).to.equal(deployer.address);
    });

    it('ERC20 deployer should be whitelisted', async () => {
      expect(await erc20.isWhitelisted(deployer.address)).to.equal(true);
    });

    it(`ERC20 name should be set to ${name}`, async () => {
      expect(await erc20.name()).to.equal(name);
    });

    it(`ERC20 symbol should be set to ${symbol}`, async () => {
      expect(await erc20.symbol()).to.equal(symbol);
    });
  });

  describe('Functions', () => {
    it(`claimTokens(): should claim ${amount} tokens`, async () => {
      const balanceBefore = await erc20.balanceOf(addr1.address);
      await erc20.connect(addr1).claimTokens();
      const balanceAfter = await erc20.balanceOf(addr1.address);
      expect(balanceBefore).to.equal(balanceAfter - amount);
    });
  });

  describe('Whitelisting', () => {
    it('Owner can add address to whitelist', async () => {
      await expect(erc20.addToWhitelist(addr1.address))
        .to.emit(erc20, 'UpdateWhitelist')
        .withArgs(addr1.address, true);

      expect(await erc20.isWhitelisted(addr1.address)).to.equal(
        true,
        'address did not get added to whitelist',
      );
    });

    it('Owner can remove address from whitelist', async () => {
      await erc20.addToWhitelist(addr1.address);

      await expect(erc20.removeFromWhitelist(addr1.address))
        .to.emit(erc20, 'UpdateWhitelist')
        .withArgs(addr1.address, false);

      expect(await erc20.isWhitelisted(addr1.address)).to.equal(
        false,
        'address did not get removed from whitelist',
      );
    });

    it('Not owner can not add address to whitelist', async () => {
      expect(await erc20.owner()).to.not.equal(addr1.address);
      await expect(erc20.connect(addr1).addToWhitelist(addr1.address)).to.reverted;
    });

    it('Not owner can not remove address from whitelist', async () => {
      expect(await erc20.owner()).to.not.equal(addr1.address);
      await expect(erc20.connect(addr1).removeFromWhitelist(addr1.address)).to.reverted;
    });
  });
});
