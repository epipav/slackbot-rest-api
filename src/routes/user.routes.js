import { Router } from 'express';

const router = Router();
const User = require('../controllers/user.controller');

router.get('/:userId', User.get);
router.get('/', User.getAll);

export default router;