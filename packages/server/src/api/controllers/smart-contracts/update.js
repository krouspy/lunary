import { updateOneSmartContractRecord } from '@mongo';

export const updateOneSmartContract = async (req, res, next) => {
  try {
    const { contractType, name, address, abi } = req.body;
    const result = await updateOneSmartContractRecord(contractType, name, address, abi);
    res.status(200).json({ result });
  } catch (e) {
    next(e);
  }
};
