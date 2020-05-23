import express from 'express';
import loginController from './login.controller';

const router = express.Router();

router.post('/', loginController.loginUser);

export default router;
