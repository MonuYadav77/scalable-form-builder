const validateSubmission = (form, answers) =>{
    for(const field of form.fields){
        const value = answers[field.field_id];
        if(field.answers  && (value === undefined || value === null)){
            throw new Error(`Missing answer for required field: ${field.label}`);
        }
        if(value != undefined){
            switch(field.type){
                case 'number': 
                if(typeof value !== 'number'){
                    throw new Error(`Invalid type for field ${field.label}: expected number`);
                }
                break;
                case 'email':
                    if(!/^\S+@\S+\.\S+$/.test(value)){
                        throw new Error(`Invalid email format for field ${field.label}`);
                    }
                break;
                case 'text':
                    if(typeof value !== 'string'){
                        throw new Error(`Invalid type for field ${field.label}: expected string`);
                    }
                    break;
            }
        }
    }

};

module.exports = validateSubmission;