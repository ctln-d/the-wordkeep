const express = require("express");
const router = express.Router();

// mongodb user model
const User = require("../models/User");

// password handler
const bcrypt = require("bcrypt");

// sign up
router.post("/signup", (req, res) => {
    let {username, email, password} = req.body;
    username = username.trim();
    email = email.trim();
    password = password.trim();

    if (username === "" || email === "" || password === "" ) {
        return res.json({
            status: "FAILED",
            message: "Empty input fields"
        });
    // change to accommodate username
    } else if (!/^[a-zA-Z ]*$/.test(username)) {
        return res.json({
            status: "FAILED",
            message: "Invalid username entered"
        });
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
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
        // check if username is taken
        User.findOne({username}).then(user => {
            if (user) {
                return res.json({
                    status: "FAILED",
                    message: "Username is already taken"
                });
            }
            // check if user alr exists w email
            User.findOne({email}).then(result => {
                if(result) {
                    // user exists
                    return res.json({
                        status: "FAILED",
                        message: "User with the provided email already exists"
                    });
                } else {
                    // create new user

                    const saltRounds = 10;
                    bcrypt.hash(password, saltRounds).then(hashedPassword => {
                        const newUser = new User({
                            username,
                            email,
                            password: hashedPassword,
                        })

                        newUser.save().then(result => {
                            return res.json({
                                status: "SUCCESS",
                                message: "Signup successful",
                                userId: result._id
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
                return res.json({
                    status: "FAILED",
                    message: "An error occurred while checking for existing user"
                });
            });
        });
    }
});

// log in
router.post("/login", (req, res) => {
    let {username, password} = req.body;
    username = username.trim();
    password = password.trim();

    if (username === "" || password === "") {
        return res.json({
            status: "FAILED",
            message: "Empty credentials"
        });
    }

    User.findOne({ username })
        .then(user => {
            if (!user) {
                return res.json({
                    status: "FAILED",
                    message: "User not found"
                });
            }

            console.log("USER FOUND:", user);
            console.log("PASSWORD IN DB:", user.password);
            console.log("PASSWORD FROM USER:", password);

            bcrypt.compare(password, user.password).then(result => {
                if (result) {
                    return res.json({
                        status: "SUCCESS",
                        message: "Login successful",
                        userId: user._id
                    });
                } else {
                    return res.json({
                        status: "FAILED",
                        message: "Invalid password entered"
                    });
                }
            })
                .catch(err => {
                    return res.json({
                        status: "FAILED",
                        message: "An error occurred while comparing passwords"
                    });
                });
        })
        .catch(err => {
            console.log(err);
            return res.json({
                status: "FAILED",
                message: "DB error"
            });
        })
})

module.exports = router;