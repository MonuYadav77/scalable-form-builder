const express = require ('express');
const authenticate = require('../../middleware/auth.middleware');
const {submitForm,getSubmissions} = require('./submission.controller');
const {rateLimit} = require('../../middleware/rateLimit.middleware');

const router = express.Router();

router.post(
    '/:formId', authenticate, rateLimit, submitForm
);

// read (PAGINATED)
router.get(
  '/:formId/submissions',
  authenticate,
  getSubmissions
);

module.exports = router;