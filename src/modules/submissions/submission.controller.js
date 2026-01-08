const submissionService = require('./submission.service');
const logger = require('../../utils/logger');

//controller to handle form submission

const submitForm = async (req,res,next) =>{
    try{

        logger.info({
            message: `User ${req.user?.id || 'guest'} is submitting form ${req.params.formId}`,
            formId: req.params.formId,
            userId: req.user?.userId || req.user?.id,
        })
        const answers = req.body && req.body.answers;
        if(!answers || typeof answers !== 'object'){
            return res.status(400).json({ message: 'Invalid request: "answers" object is required in the request body' });
        }

        const userId = req.user && (req.user.userId || req.user.id);
        if(!userId){
            return res.status(401).json({ message: 'Unauthorized: missing user information' });
        }

        await submissionService.submitForm(
            req.params.formId,
            userId,
            answers
        );
        res.status(202).json({message: 'Form submitted successfully'});
    } catch(err){
        next(err);
    }   
};

module.exports = {submitForm};