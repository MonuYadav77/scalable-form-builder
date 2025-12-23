const express = require('express'); 
const { createForm, getForm } = require('./form.controller');
const authenticate = require('../../middleware/auth.middleware');
const authorize = require('../../middleware/rbac.middleware');

const router = express.Router();

//admin only /
router.post('/', authenticate,
    authorize('ADMIN'),
    createForm
);
//public catched 
router.get('/:formId', getForm);

module.exports = router;        