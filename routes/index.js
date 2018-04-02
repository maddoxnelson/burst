const express = require('express');
const router = express.Router();
const burstController = require('../controllers/burstController');
const { catchErrors } = require('../handlers/errorHandlers');

module.exports = router;

router.get('/', burstController.getBursts);
router.get('/write', burstController.addBurst);

router.post('/write',
  catchErrors(burstController.createBurst)
);
