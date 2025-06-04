import express from 'express'
import { getEventCount, getEventCountByType } from '../controllers/event.controller.js'

const router = express.Router();

router.get('/event-counts', getEventCount);
router.get('/event-counts-by-type', getEventCountByType);

export default router;