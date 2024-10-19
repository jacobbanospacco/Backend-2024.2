import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { googleClientID, googleClientSecret, githubClientID, githubClientSecret } from '../config/config.js';

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: googleClientID,
  clientSecret: googleClientSecret,
  callbackURL: "/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
  if (profile.emails && profile.emails[0] && profile.emails[0].value.endsWith('@igp.gob.pe')) {
    return done(null, profile);
  } else {
    return done(null, false, { message: 'Dominio no permitido o email no disponible' });
  }
}));

// GitHub OAuth Strategy
passport.use(new GitHubStrategy({
  clientID: githubClientID,
  clientSecret: githubClientSecret,
  callbackURL: "/auth/github/callback"
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));
