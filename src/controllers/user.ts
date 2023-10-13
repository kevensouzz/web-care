import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/user';
import dotenv from 'dotenv';
dotenv.config();

const googleClientId = process.env.GOOGLE_ID;
const googleClientSecret = process.env.GOOGLE_SECRET;

if (!googleClientId || !googleClientSecret) {
  throw new Error('Google client ID and/or client secret are not defined in the environment.');
}

passport.use(new GoogleStrategy({
  clientID: googleClientId,
  clientSecret: googleClientSecret,
  callbackURL: "http://localhost:5000/auth/callback",
  scope: ["profile", "email"],
  state: true
}, (accessToken, refreshToken, profile, done) => {

  User.findOne({ googleId: profile.id }).then(existingUser => {
    if (existingUser) {
      done(null, existingUser)
    } else {

      if (!profile.emails) {
        throw new Error("Email is not defined!")
      }

      new User({
        google_id: profile.id,
        email: profile.emails[0].value,
        username: profile.username,
        name: profile.displayName,
        picture: profile._json.picture,
      }).save()
        .then(user => done(null, user))
    }
  })
}));

passport.serializeUser((user, done) => {
  done(null, user);
})

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user))
})