const submissionService = require('./submission.service');

//controller to handle form submission

const submitForm = async (req,res,next) =>{
    try{
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