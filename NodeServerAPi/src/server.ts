import express from 'express';
import dotenv from 'dotenv';
import { JsonWebToken } from './config/appjwt';
import { router as UsersRoute } from './routes/usersRoutes';
import { router as AdminRoute } from './routes/adminRoutes';
dotenv.config();
const app = express();
let _JsonWebToken = new JsonWebToken();
app.use('/users', UsersRoute);
app.use('/admin',_JsonWebToken.verifyToken, AdminRoute);
app.post('/login', (req, res) => {
  _JsonWebToken.jwtSign(res,res)
});
app.post('/posts',_JsonWebToken.verifyToken, (req, res) => {
  res.json({
    message:"Post created"
  })
});
app.get('/', (req, res) => {
  res.json({
    message: 'The sedulous hyena ate the antelope!'
  });
});
let server = app.listen(process.env.PORT || 8080, function () {
  server.setTimeout(300000);
  console.log("App now running on port", server.address())
});