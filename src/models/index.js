import mongoose from 'mongoose';

import Rss from './rss.model';
import User from './user.model';
import Poll from './poll.model';
import Keyword from './keyword.model';
import Competitor from './competitor.model';




const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL,{user:process.env.DATABASE_USERNAME, 
                                                    pass:process.env.DATABASE_PASSWORD,
                                                    auth:{
                                                      authSource: "admin"
                                                    },
                                                    useNewUrlParser:true, useUnifiedTopology:true});
};

const models = {Rss,User,Poll,Keyword,Competitor};
export { connectDb };
export default models;