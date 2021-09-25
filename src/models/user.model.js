import mongoose from 'mongoose';
var uniqueValidator = require('mongoose-unique-validator');


const usersSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  user_role: {
    type: String
  }
});

usersSchema.plugin(uniqueValidator);

const User = mongoose.model('User', usersSchema, 'users');
export default User;