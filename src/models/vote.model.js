import mongoose from 'mongoose';

const voteSchema = new mongoose.Schema({
  user_id: {
    type: String
  },
  user_name: {
    type: String
  },
  team_id: {
    type: String
  },
  voted_answer_id:{
      type:String
  },
  voted_answer:{
    type:String
  }
});


const Vote = mongoose.model('Vote', voteSchema);
export default Vote;