const express = require('express');
const router = express.Router();

// mongodb user model
const User = require('./../models/user')

// password handler
const bcrypt = require('bcrypt');

// sign up
router.post('/signup', (req, res) => {
    let {name, email, password} = req.body;
    name = name.trim();
    email = email.trim();
    password = password.trim();

    if (name === "" || email === "" || password === "" ) {
        return res.json({
            status: "FAILED",
            message: "Empty input fields!"
        });
    } else if (!/^[a-zA-Z]*$/.test(name)) {
        return res.json({
            status: "FAILED",
            message: "Invalid name entered"
        });
    } else if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        return res.json({
            status: "FAILED",
            message: "Invalid email entered"
        });
    } else if (password.length < 8) {
        return res.json({
           status: "FAILED",
           message: "Password is too short"
        });
    } else {
        // check if user alr exists
        User.find({email}).then(result => {
            if(result.length) {
                // user exists
                res.json({
                   status: "FAILED",
                   message: "User with the provided email already exists"
                });
            } else {
                // create new user

                const saltRounds = 10;
                bcrypt.hash(password, saltRounds).then(hashedPassword => {
                    const newUser = new User({
                        name,
                        email,
                        password: hashedPassword,
                    })

                    newUser.save().then(result => {
                        return res.json({
                            status: "SUCCESS",
                            message: "Signup successful",
                            data: result
                        })
                    }).catch(err => {
                        return res.json({
                           status: "FAILED",
                           message: "An error occurred when saving user"
                        });
                    })
                }).catch(err => {
                    return res.json({
                        status: "FAILED",
                        message: "An error occurred while hashing password"
                    });
                })
            }
        }).catch(err => {
            console.log(err);
            res.json({
                status: "FAILED",
                message: "An error occurred while checking for existing user"
            });
        });
    }
});

// log in
router.post('/login', (req, res) => {

})

module.exports = router;