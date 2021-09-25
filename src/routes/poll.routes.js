import { Router } from 'express';


const router = Router();
const Poll = require('../controllers/poll.controller');


router.post('/', Poll.create);
router.get('/', Poll.getAll)
router.get('/:pollId', Poll.getById)
router.post('/:pollId/vote', Poll.vote)

export default router;