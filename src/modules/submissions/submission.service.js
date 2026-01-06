const {getFormById} = require('../form/form.service');
const validateSubmission = require('../submissions/validation');
const {sendSubmissionEvent} = require('../submissions/submission.producer');

const submitForm = async (formId, userId, answers)=>{
    const form = await getFormById(formId);

    validateSubmission(form, answers);

    await sendSubmissionEvent({
        formId,
        userId,
        answers,
        createdAt : new Date(),
    });

};

module.exports = {submitForm};