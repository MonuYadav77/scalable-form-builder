const mongoose = require('mongoose');
// store form fields as embedded documents to allow dynamic schemas without DB migrations

const fieldSchema = new mongoose.Schema({
    field_id : { type: String, required: true },
    label: { type: String, required: true },
    type: {
        type: String,
        enum: ['text', 'number', 'email', 'select'],
        required: true
    },
    required: { type: Boolean, default: false },
    options: [String], // for select fields
    },
    { _id: false }
);

const formSchema = new mongoose.Schema({
    title: { type: String, required: true},
    description: { type: String },
    fields: [fieldSchema],
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
},
{ timestamps: true }
);

module.exports = mongoose.model('Form', formSchema);        