const formService = require('./form.service');

//create form controller
const createForm = async (req, res, next) => {
    try {
        const form = await formService.createForm(req.body, req.user.userId);
        res.status(201).json(form);
    }catch (err) {
        next(err);
    }
};

const getForm = async (req, res, next) => {
    try{
        const form = await formService.getFormById(req.params.formId);
        res.status(200).json(form);

    }
    catch(err){
        next(err);
    }               
};
module.exports = { createForm, getForm };