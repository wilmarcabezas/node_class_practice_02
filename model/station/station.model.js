const mongoose = require('mongoose');
const Scheme = mongoose.Schema;


const schemaStation = new Scheme({
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
    position:
    {
        type: mongoose.Schema.Types.Number,
        required: [true,'Position is required'],
    },
    city:  { type: mongoose.Schema.Types.ObjectId, ref: 'City' },
    lat: { type: mongoose.Schema.Types.String, default:'0'},
    lon: { type: mongoose.Schema.Types.String, default:'0'},
});
const Model = mongoose.model('Station',schemaStation);
module.exports = { Model, schemaStation, }

