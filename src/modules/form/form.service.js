const form = require('./form.model');

const redisClient = require('../../config/redis');
const { json } = require('express');
const catch_ttl = 60 * 10; //10 minutes

//create form service
const createForm =  async(data,userId) =>{
    const form = await FormData.create({...data, createdBy:userId});

    //catched newly created form in redis
    await redisClient.set(`form: ${form._id}`, json.stringify(form), {EX: catch_ttl}
    );

    return form;
};

//get form by id service
const getFormById = async(formId) =>{
    const cachedForm = await redisClient.get(`form: ${formId}`);
    if(cachedForm){
        return JSON.parse(cachedForm);
    }     
    
    const form = await Form.findById(formId);
    if(!form){
        throw new Error('Form not found');
    }

    await redisClient.set(`form: ${formId}`, json.stringify(form), {EX: catch_ttl}
    );
    return form;

};
module.exports = {createForm, getFormById};