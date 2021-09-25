import { Router } from 'express';


const router = Router();
const User = require('../controllers/user.controller');

router.post('/', User.login);

export default router;