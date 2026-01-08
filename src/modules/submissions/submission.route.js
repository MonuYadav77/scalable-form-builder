const express = require ('express');
const authenticate = require('../../middleware/auth.middleware');
const {submitForm} = require('./submission.controller');
const {rateLimit} = require('../../middleware/rateLimit.middleware');

const router = express.Router();

router.post(
    '/:formId', authenticate, rateLimit, submitForm
);

module.exports = router;