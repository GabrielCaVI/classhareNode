const express = require('express')
const router = require(express.Router())

router.get('/posts', (req, res)=>{
    Post.find({}, function(err, post){
            if(err)
                res.status(500).send({error: "Could not fetch posts"})
            else{
                res.status(200).send(post)
            }
        })
 })  
    
    
    
    router.get('/:subject', (req, res)=>{
        let sub = req.params.subject
        Post.find({subject:sub}, function(err, post){
                if(err)
                    res.status(500).send({error: "Could not fetch posts"})
                else{
                    res.status(200).send(post)
                }
            })
        }) 
    
    
    
    
    router.get('posts/by/:username', (req, res)=>{
        let usr = req.params.username
        Post.find({username:usr}).then(post=>{
            res.status(200).send(post)
        })
        .catch(err=>{
            res.status(500).send({error:err, message:"not found"})
        })
    }); 
    /*--------------POST------------*/
    router.post('/posts/new/:username', (req, res)=>{
        usr = req.params.username
        User.findOne({username:usr})
        .then(result=>{
            entry = new Post()
            entry.username = result.username
            entry.subject = req.body.subject
            entry.title = req.body.title
            entry.text = req.body.text
            entry.useful = 0
            entry.notUseful = 0
            entry.save()  
             .then(result=>{
                res.status(200).send(result)
            })
            .catch(err=>{
                res.status(400).send("could not process request")
            })
        })
        .catch(err=>{
            console.log("could not find user")
        })
       

    });
    /*--------------PUT------------*/
    router.put('/posts/update/:._id',(req, res)=>{
        let postId = req.params._id
        var newData = {
            title: req.body.title,
            text: req.body.text
        }
                
                
        Post.findOneAndUpdate({_id:postId},{newData}, (err, post)=>{
            if(err)
                res.status(404).send({error:"no post fouund"})
            else{
                res.status(201).send(post)
    
            } 
    
        })
    });
    
    
    /*--------------Delete------------*/
    
    
    router.delete('posts//delete/:_id', (req, res)=>{
        let postId = req.params._id
        Post.findOneAndDelete({_id: postId}, function(err, post){
                if(err)
                    res.status(500).send({error: "Could not fetch posts"})
                else{
                    res.status(200).send(post)
                }
            })
        });
module.exports = productsRoute;