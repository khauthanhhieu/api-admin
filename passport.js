const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const AdminService = require('./services/admin')

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
}, function (username, password, cb) {
  console.log(username, passport)
  return AdminService.findOne(username, password)
    .then(user => {
      if (!user) {
        return cb(null, false, { isSuccess: false })
      }
      return cb(null, user, { isSuccess: true })
    }).catch(err => cb(err))
}))

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'doctor'
}, function (jwtPayload, cb) {
  return AdminService.findOneById(jwtPayload._id)
    .then(user => cb(null, user))
    .catch(err => cb(err));
}));