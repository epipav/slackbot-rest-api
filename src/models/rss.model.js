import mongoose from 'mongoose';
var uniqueValidator = require('mongoose-unique-validator');

const rssSchema = new mongoose.Schema({
    link: {
        type: String,
        unique: true,
      },
      type:{
        type:String
      },
      google_alerts_keywords:{
        type:String
      }
 
});

rssSchema.plugin(uniqueValidator);

const Rss = mongoose.model('rss', rssSchema, 'rss');
export default Rss;