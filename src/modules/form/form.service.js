const Form = require('./form.model');

const redisClient = require('../../config/redis');
const catch_ttl = 60 * 10; //10 minutes

//create form service
const createForm =  async(data,userId) =>{
    const form = await Form.create({...data, createdBy:userId});

    // cache newly created form in redis (non-fatal)
    try {
        await redisClient.set(`form:${form._id}`, JSON.stringify(form), { EX: catch_ttl });
    } catch (err) {
        console.error('Redis set (createForm) error:', err);
    }

    return form;
};

//get form by id service
const getFormById = async(formId) =>{
    try {
        const cachedForm = await redisClient.get(`form:${formId}`);
        if(cachedForm){
            return JSON.parse(cachedForm);
        }
    } catch (err) {
        console.error('Redis get (getFormById) error:', err);
        // fall through to DB lookup
    }

    const form = await Form.findById(formId);
    if(!form){
        throw new Error('Form not found');
    }

    try {
        await redisClient.set(`form:${formId}`, JSON.stringify(form), { EX: catch_ttl });
    } catch (err) {
        console.error('Redis set (getFormById) error:', err);
    }

    return form;

};
module.exports = {createForm, getFormById};