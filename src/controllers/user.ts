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

  if (!profile.emails) {
    throw new Error("Email is not defined!")
  }

  User.findOne({ email: profile.emails[0].value }).then(existingUser => {
    if (existingUser) {
      done(null, existingUser)
    } else {

      if (!profile.emails || !profile.photos) {
        throw new Error("Email is not defined!")
      }

      new User({
        google_id: profile.id,
        email: profile.emails[0].value,
        name: profile.displayName,
        picture: profile.photos[0].value,
        locale: profile._json.locale,
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