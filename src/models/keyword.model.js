import mongoose from 'mongoose';
var uniqueValidator = require('mongoose-unique-validator');


const  keywordSchema = new mongoose.Schema({
    keyword: {
        type: String,
        unique: true
    },
    context:{
        type:String
    },
    slack_post_channel:{
        type:String
    }
}); 

keywordSchema.plugin(uniqueValidator);

const Keyword = mongoose.model('Keyword', keywordSchema, 'keywords');
export default Keyword;