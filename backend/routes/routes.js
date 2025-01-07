import express from 'express';
import { getDownloadLinks,getKeys } from '../controllers/fetchController.js';
const router = express.Router();

router.get('/links', getDownloadLinks);
router.get("/keys",getKeys); 


export default router;