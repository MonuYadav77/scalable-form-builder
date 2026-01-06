const kafka = require('../../config/kafka');

const producer = kafka.producer();

const sendSubmissionEvent = async(data) =>{
    await producer.connect();
    await producer.send({
        topic: 'form-submission',
        messages : [
            {value : JSON.stringify(data)}
        ],
    });
};

module.exports = {sendSubmissionEvent}; 

