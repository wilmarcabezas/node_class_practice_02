const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')
const Scheme = mongoose.Schema;


const modelUsers  = new Scheme({
    id: 
    {
        type: Scheme.ObjectId,
    },    
    user: 
    {
        type: String,
        required: [true,'Email is required field'],
        unique: true,
        index: true,
        trim: true,   
        sparse: true,     
    },    
    password: 
    {
        type: String,
        required: true,
    },
    role: 
    {
        type: String,
        default:'operator',
        required: true,
    },
    email: 
    {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    city:  { type: mongoose.Schema.Types.ObjectId, ref: 'City' },
    recoverytoken: 
    {
        type: String,
        required: false,
        default:'',
    },
    accesstoken: 
    {
        type: String,
        required: false,
        default:'',
    },
    refreshtoken: 
    {
        type: String,
        required: false,
        default:'',
    },
});

module.exports = mongoose.model('User',modelUsers);

