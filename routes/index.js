const express = require('express');
const router = express.Router();
const burstController = require('../controllers/burstController');
const { catchErrors } = require('../handlers/errorHandlers');

module.exports = router;

router.get('/', catchErrors(burstController.getBursts));
router.get('/write', burstController.addBurst);

router.get(`/burst/:slug`, catchErrors(burstController.getBurstBySlug));

router.post('/write',
  catchErrors(burstController.createBurst)
);
