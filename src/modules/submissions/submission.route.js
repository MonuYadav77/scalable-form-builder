const express = require ('express');
const authenticate = require('../../middleware/auth.middleware');
const {submitForm} = require('./submission.controller');

const router = express.Router();

router.post(
    '/:formId', authenticate, submitForm
);

module.exports = router;