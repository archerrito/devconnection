const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const monggose = require('mongoose');
const User = monggose.model('users');
const keys = require('../config/keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
    //pass in options, get back function, gives us payload, done
    //payload includes users stuff from users
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            User.findById(jwt_payload.id)
                .then(user => {
                    if(user) {
                        return done(null, user);
                    }
                    return done(null, false);
                })
                .catch(err => console.log);

        })
    );
};