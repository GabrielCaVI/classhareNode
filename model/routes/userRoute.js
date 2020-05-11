const express = require('express')
const router  = express.Router();

const User = require('./model/user')
const Post = require('./model/posts')

// SignUp
router.post('/signup', function(req, res) {
    User.find({email: req.body.email}).exec()
    .then(user=>{
        if(user){
            return res.status(409).json({message:"email already exists"})
        }
        else{
            bcrypt.hash(req.body.password, 10, (err, hash)=>{
                if (err){
                    return res.status(500)
                }
                else{
                 var nUser = new User();
                 nUser.email = req.body.email
                 nUser.username = req.body.username;
                 nUser.password = hash;
                }
                nUser.save().then(
                    res.status(200).json({message:"created", newUser: nUser})
                )
                .catch(err=>{
                    res.status(500).json({message:"could not create"})
                })
            })

        }
    })
});




//Delete Usuario
router.delete('/delete/:username',(req, res)=>{
    userId = req.params.username
    User.remove({username: userId}).exec()
    .then( result=>{
        res.status(200).send({message:"user deleted", user:result})
    })
    
});

router.get('/all', (req, res)=>{
    User.findAll({}).then(result=>{
        res.status(200).send(result)
    })
    .catch(err=>{
        res.status(409).send({error:err})
    })
})



router.get('user/:username', (req, res)=>{
    var user = req.params.username
    User.findOne({username: user}).then(user =>{
        res.status(200).send(user.username)
    })
    .catch(err =>{
        res.status(500).send({error:"Internal server error"})
    })
})
module.exports = router