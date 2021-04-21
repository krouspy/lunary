import { Router } from 'express';
import smartContracts from './controllers/smart-contracts';

const router = Router();

router.use(smartContracts);

export default router;
