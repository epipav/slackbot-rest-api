import mongoose from 'mongoose';
var uniqueValidator = require('mongoose-unique-validator');


const competitorSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    website: {
        type: String
    },
    youtube:{
        type:String
    },
    linkedin:{
        type:String
    }
}); 

competitorSchema.plugin(uniqueValidator);

const Competitor = mongoose.model('Competitor', competitorSchema, 'competitors');
export default Competitor;