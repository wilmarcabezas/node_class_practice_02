const mongoose = require('mongoose');
const Scheme = mongoose.Schema;


const modelVehicle  = new Scheme({
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
    }
});

module.exports = mongoose.model('Vehicle',modelVehicle);

