import {
  getAllSmartContractRecords,
  getMarketplaceRecord,
  getERC20Record,
  getERC721Record,
} from '@mongo';

export const getAllSmartContract = async (_, res, next) => {
  try {
    const result = await getAllSmartContractRecords();
    res.status(200).json({ result });
  } catch (e) {
    next(e);
  }
};

export const getMarketplace = async (_, res, next) => {
  try {
    const result = await getMarketplaceRecord();
    res.status(200).json({ result });
  } catch (e) {
    next(e);
  }
};

export const getERC20 = async (_, res, next) => {
  try {
    const result = await getERC20Record();
    res.status(200).json({ result });
  } catch (e) {
    next(e);
  }
};

export const getERC721 = async (_, res, next) => {
  try {
    const result = await getERC721Record();
    res.status(200).json({ result });
  } catch (e) {
    next(e);
  }
};
