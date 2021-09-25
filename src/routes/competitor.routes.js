import { Router } from 'express';

const router = Router();
const Competitor = require('../controllers/competitor.controller');

/** middlewares can be included as 2nd function paramter. Last one is the callback. */
router.get('/', Competitor.getAllCompetitors);

router.get('/:competitorId', Competitor.getCompetitor)
router.post('/', Competitor.createCompetitor)
router.delete('/:competitorId', Competitor.removeCompetitor)


export default router;