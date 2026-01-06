const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema(
    {
        formId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            index: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            index: true
        },
        answers: {
            type: Object,
            required: true
        },
    },
        {timestamps: true}

);

//compound index for analytics 
submissionSchema.index({formId:1 ,createdAt: -1});

module.exports = mongoose.model('Submission', submissionSchema);       