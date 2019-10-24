// Core
import express from 'express';

// Instruments
import { post } from './route';

// Check payload
import { isBase64 } from '../../utils';

export const router = express.Router();

router.post('/', isBase64, post);

export { router as login };
