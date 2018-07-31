const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

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

//export for server to pick up
module.exports = router;