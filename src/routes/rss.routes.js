import { Router } from 'express';

const router = Router();
const Rss = require('../controllers/rss.controller');


router.get('/keywords', Rss.getAllKeywords);

router.get('/keyword/:keywordId', Rss.getKeyword)
router.post('/keyword', Rss.createKeyword)
router.delete('/keyword/:keywordId', Rss.removeKeyword)

router.get('/:rssId', Rss.getRss);
router.get('/', Rss.getAllRss);
router.post('/', Rss.createRss);
router.delete('/:rssId', Rss.removeRss);
router.put('/:rssId', Rss.updateRss);


export default router;