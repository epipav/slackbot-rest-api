/**
 * A simple nodejs REST-like api using express that talks with a mongodb using mongoose.
 * @author Anil Bostanci 
 */


import 'dotenv/config';
import express from 'express';
import models, {connectDb} from './models';
import routes from './routes';


const app = express();
const authenticate = require('./middlewares/authenticate.middleware');

app.use(express.json());


/* application middleware: before requests go to the corresponding routes, we create the req.context with model references
   This gives a convenient way of using the modes in the controllers i.e: req.context.models.Rss.find */ 

app.use((req, res, next) => {
    req.context = {
      models
    };
    next();
});


//login route before authenticate app middleware.
app.use('/login',(req,res,next)=>{
    next();
},routes.login);


//try to authenticate all users from JWT Token.
app.use(authenticate.verify);

/* we are using authorize as application middleware here, it can be router level middleware too */
const authorize = require('./middlewares/authorize.middleware');

/* all authenticated users can access these endpoints*/
app.use('/rss?', routes.rss);
app.use('/poll?', routes.poll);
app.use('/competitors?', [authorize.giveAccess("admin")], routes.competitor)

/* only authenticated and authorized users (admin in this example) can access this endpoint. */
app.use('/users?',[authorize.giveAccess("admin")], routes.user);


connectDb().then(async()=>{
    app.listen(process.env.PORT, () =>
    console.log(`REST api listening on port ${process.env.PORT}!`),
  );
});


