const express = require('express')
const router = express.Router();

const User = require('../model/user')
const Post = require('../model/posts')



router.post('/signup', function (req, res) {
    User.find({ email: req.body.email }).exec()
        .then(user => {
            if (user) {
                return res.status(409).json({ message: "email already exists" })
            }
            else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500)
                    }
                    else {
                        //Instance of new user
                        var nUser = new User();
                        nUser.email = req.body.email
                        nUser.username = req.body.username;
                        nUser.password = hash;
                    }
                    // mongoose method to save user
                    nUser.save().then(
                        res.status(200).json({ message: "created", newUser: nUser })
                    )
                        .catch(err => {
                            res.status(500).json({ message: "could not create" })
                        })
                })

            }
        })
});

router.post('/login', (req, res, next) => {
    User.find({ email: req.body.email }).exec()
        .then(user => {
            if (user.length() < 1) {
                res.status(401).json({ message: "Auth failed" })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({ message: "Auth Failed" })
                }
                if (result) {
                    return res.status(200).json({
                        message: "auth successful"

                    });
                }
                return res.status(401).json({
                    message: "auth failed"
                });
            })
        })
        .catch(err => {
            res.status(400).json({ error: err })
        })
})

router.delete('/delete/:username', (req, res) => {
    userId = req.params.username
    User.remove({ username: userId }).exec()
        .then(result => {
            res.status(200).send({ message: "user deleted", user: result })
        })
        .catch()

});



/*--------------GET------------*/

router.get('/all', (req, res) => {
    User.find({}).then(users => {
        res.status(200).send(users)
    })
        .catch(err => {
            res.status(500).send({ error: "Internal server error" })
        })
})

router.get('/:username', (req, res) => {
    var user = req.params.username
    User.findOne({ username: user }).then(user => {
        res.status(200).send(user.username)
    })
        .catch(err => {
            res.status(500).send({ error: "Internal server error" })
        })
})
module.exports = router