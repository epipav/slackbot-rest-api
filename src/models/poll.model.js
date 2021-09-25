import mongoose from 'mongoose';

const vote = new mongoose.Schema({
    user_id: {
      type: String
    },
    username: {
      type: String
    },
    team_id: {
      type: String
    },
    voted_answer:{
      type:String
    }
  });
  

var answer = new mongoose.Schema({
    description: {
        type:String
    },
    totalVotes:{
        type:Number
    }
});


const pollSchema = new mongoose.Schema({
    slack_message_timestamp: {
        type: String
    },
    question:{
        type: String
    },
    answers:[answer],
    votes:[vote]
}); 


const Poll = mongoose.model('Poll', pollSchema, 'polls');
export default Poll;