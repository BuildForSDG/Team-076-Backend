import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../app/models';
/**
 * Strategy for passport
 */

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

const jwtStrategy = new Strategy(opts, async (jwtPayload, done) => {
  let user;
  try {
    user = await User.findOne({
      where: {
        username: jwtPayload.username
      }
    });
  } catch (error) {
    return done(error, false);
  }

  if (user) {
    return done(null, user);
  }

  return done(null, false);
});

export default jwtStrategy;
