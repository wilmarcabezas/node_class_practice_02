const mongoose = require('mongoose');
const Scheme = mongoose.Schema;


const modelCity  = new Scheme({
    id: 
    {
        type: Scheme.ObjectId,
    },    
    name: 
    {
        type: String,
        required: [true,'Name is required field'],
        unique: true,
        index: true,
        trim: true,   
        sparse: true,     
    },
    active:
    {
        type: Scheme.Types.Boolean,
        default: true,
    }
});

module.exports = mongoose.model('City',modelCity);

