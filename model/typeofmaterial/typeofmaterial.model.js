const { required } = require('joi');
const mongoose = require('mongoose');
const Scheme = mongoose.Schema;


const modeltypeMaterial  = new Scheme({
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
    price:
    {
        type: Number,
        required: [true,'Price is required field'],
    }
});

module.exports = mongoose.model('TypeMaterial',modeltypeMaterial);

