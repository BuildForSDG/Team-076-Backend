import express from 'express';

import registerController from './register.controller';
import farmingTypes from '../../constants/farmingTypes';

const router = express.Router();

router.post('/', registerController.registerUser);

router.get('/checkUsername', registerController.checkUsername);

router.get('/farmingTypes', (req, res) => {
  res.json({
    success: true,
    data: {
      farmingTypes: Array.from(farmingTypes)
    }
  });
});

export default router;
