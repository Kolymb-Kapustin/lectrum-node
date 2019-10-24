// Core
import express from 'express';

// Instruments
import { get, post } from './route';
import { isBase64 } from '../../utils';

// Check payload
import { get, post } from './checkBase64';

export const router = express.Router();

router.get('/', get);
router.post('/', [isBase64], post);

export { router as users };
