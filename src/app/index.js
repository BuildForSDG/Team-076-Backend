// Application code entry point

import express from 'express';
import cors from 'cors';
import passport from 'passport';

import jwtStrategy from '../config/passport';

import loginRouteHandler from './http/login/login.route';
import registerRouteHandler from './http/register/register.route';
import profileRouteHandler from './http/profile/profile.route';

const app = express();

passport.use(jwtStrategy);
// MiddleWares
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use('/api/login', loginRouteHandler);
app.use('/api/register', registerRouteHandler);
app.use('/api/profile', passport.authenticate('jwt', { session: false }), profileRouteHandler);

app.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send('Authorized');
});

export default app;
