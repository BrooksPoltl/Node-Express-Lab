// import your node modules
const express = require('express');

const db = require('./data/db.js');
const port = 5000;

const server = express();

server.use(express.json());
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

server.post('/api/posts', (req,res) =>{
    const postInfo = req.body;
    db.insert(postInfo)
    .then(result =>{
        res.status(201).json(result);
    })
    .catch(err => res.status(400).json({errorMessage: "Please provide title and contents for the post."}))
})

server.delete('/api/posts/:id', (req,res)=>{
    const { id } = req.params;
    db.findById(id)
    .then(post=>{
        if(post.length !== 0) {
            db.remove(id).then(count => {
                res.status(201).json(post)
            })
        } else {
        res.status(404).json({ message: "The post with the specified ID does not exist."})
        }
    })
    .catch(err => res.status(500).json({ error: "The post could not be removed"}))
    
})
server.put('/api/posts/:id', (req,res)=>{
    const id = req.params.id;
    const change= req.body;

    db.update(id, change)
    .then(count =>{
        if(count){
            if(change.title && change.contents){
                res.status(200).json(change)
            } 
            else {
                res.status(400).json({errorMessage: ('Please provide title and contents for the post.')})
            }
        } 
        else {
            res.status(404).json({ message: 'The post with the specified ID does not exist.' });
        }})
    .catch(err => {
        res.status(500).json({ error: 'The post information could not be modified.' })
    })
})


server.listen(port, () => console.log (`server running on port ${port}`));
