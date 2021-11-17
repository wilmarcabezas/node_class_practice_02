const mongoose = require('mongoose');
const Joi  = require('joi');
const { boolean } = require('joi');
const Scheme = mongoose.Schema;

const modelElementQty  = new Scheme({
    id: 
    {
        type: Scheme.ObjectId,        
    }, 
    name:
    {
        type: String,
    },
    qty: 
    {
        type: Number,
    }
});

const schemaStationWork = new Scheme({
    id: 
    {
        type: Scheme.ObjectId,
    },    
    name: 
    {
        type: String,       
    },
    position:
    {
        _id: mongoose.Schema.Types.ObjectId,
        type: mongoose.Schema.Types.Number,
    },
    done: { type: Boolean, }
});

const modelWork  = new Scheme({
    id: { type: Scheme.ObjectId, },    

    date_created:  { type: mongoose.Schema.Types.Date, required: true, default: Date.now(),   },
    date_finished: { type: mongoose.Schema.Types.Date, required: false, },

    city: [{ type: mongoose.Schema.Types.ObjectId, ref: 'City' }],
    user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] ,     
    
    comuna: { type: String, required: true, },

    total: { type: Number, default: 0, }, 

    finished: { type: Boolean,  default:false , },

    elements: [ modelElementQty ],
    stations: [ schemaStationWork ],

});


module.exports = mongoose.model('Work',modelWork);