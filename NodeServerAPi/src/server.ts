import { ChatSocket } from './Socket/socket';
import express from 'express';
import dotenv from 'dotenv';
import { JsonWebToken } from './config/appjwt';
import { router as UsersRoute } from './routes/usersRoutes';
import { router as AdminRoute } from './routes/adminRoutes';
const ChatSocketcon = new ChatSocket;
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const app = express();
dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
let _JsonWebToken = new JsonWebToken();
let mongoUrl: string = 'mongodb://localhost/ChatEfficiency';
mongoose.Promise = global.Promise;
mongoose.connect(mongoUrl, { useNewUrlParser: true,useUnifiedTopology:true,useFindAndModify: false },(err=>{
  if(err){
    console.log('Mongo Error=>',err)
  }
  else{
    console.log('Mongo Connected')
  }
}));
app.use('/users', UsersRoute);
app.use('/admin', _JsonWebToken.verifyToken, AdminRoute);
app.get('/', (req, res) => {
  res.json({
    message: 'The sedulous hyena ate the antelope!'
  });
});
let server = app.listen(process.env.PORT || 8080, function () {
  server.setTimeout(300000);
  console.log("App now running on port", server.address())
});
ChatSocketcon.init(server);