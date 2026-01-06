const submissionService = require('./submission.service');

//controller to handle form submission

const submitForm = async (req,res,next) =>{
    try{
        await submissionService.submitForm(
            req.params.formId,
            req.user.id,
            req.body.answers
        );
        res.status(202).json({message: 'Form submitted successfully'});
    } catch(err){
        next(err);
    }   
};

module.exports = {submitForm};