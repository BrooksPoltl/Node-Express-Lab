// import your node modules
const express = require('express');

const db = require('./data/db.js');
const port = 5000;

const server = express();
// add your server code starting here

server.get('/api/posts',(req, res)=>{
    db.find()
    .then(posts =>{
        res.json(posts)
    })
    .catch(err => {
        res.status(500).json({ error: "The posts information could not be retrieved." });
    });
})

server.get('/api/posts/:id',(req,res)=>{
    const id = req.params.id;
    db.findById(id)
    .then(post =>{
        if(post.length !== 0){
            res.status(200).json(post);
        } else {
            res.status(404).json({message: 'The post with the specified ID does not exist.'});
        }
    })
    .catch(err=> res.status(500).json(err));
})

server.listen(port, () => console.log (`server running on port ${port}`));
