import { Router } from 'express';
import { getAllSmartContract, getMarketplace, getERC20, getERC721 } from './read';
import { updateOneSmartContract } from './update';

const router = Router();

router.get('/smart-contracts', getAllSmartContract);
router.get('/smart-contract/marketplace', getMarketplace);
router.get('/smart-contract/erc20', getERC20);
router.get('/smart-contract/erc721', getERC721);
router.post('/smart-contract', updateOneSmartContract);

export default router;
