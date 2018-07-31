const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

//Load user model
const User =   require('../../models/User');

//Serve JSON
// @route GET api/users/test
// @desc Test post route
// @access Public
router.get('/test', (req, res) => res.json({msg: "Users Works"}));

//Serve JSON
// @route GET api/users/register
// @desc Register User
// @access Public
router.post('/register', (req, res) => {
    //Find if email exists in Mongoose
    User.findOne({ email: req.body.email})
        .then(user => {
            //verifys user exists
            if(user) {
                return res.status(400).json({email:'Email already exists'});
            } else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200', //size
                    r: 'pg', //rating
                    d: 'mm' //default
                });

                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar: avatar,
                    password: req.body.password
                }) ;

                //create SaltHash for password, respond with saved user
                bcrypt.genSalt(10, (err, salt) => {
                    //create hash, pass in plain text password
                    //provides error or has to store in database
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                        //gives user that created
                        //send successful response with that user
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    })
                })
            }
        })
});

// @route GET api/users/login
// @desc Login User / Returning JWT token
// @access Public
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    //Find user by email
    User.findOne({email})
        .then(user => {
            //Check for user
            if(!user) {
                return res.status(404).json({email: 'User not found'});
            }
            //compare password inserted to the database
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch) {
                        //User matched
                        const payload = 
                            //create jwt payload
                            { id: user.id, name: user.name, avatar: user.avatar }

                        //sign token, takes payload, user info, key defined alternate file
                        jwt.sign(
                            payload, 
                            keys.secretOrKey, 
                            { expiresIn: 3600 }, 
                            //will give us error or token
                            //send token as response
                            (err, token) => {
                                res.json({
                                    //send success
                                    success: true,
                                    //format using bearer protocol
                                    token: 'Bearer' + token
                                })
                        });
                    } else {
                        return res.status(400).json({password: 'Password incorrect'});
                    }
                })
        });
});

//export for server to pick up
module.exports = router;