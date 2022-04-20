const express = require('express');
const app = express();
const mongoose = require('mongoose');
let { trainers } = require('./data');
const mongo = require('mongodb')
// const bodyParser = require('body-parser')
const Post = require('./schema');
require('dotenv/config');


// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false}));
app.use(express.json());


// app.get('/trainers', (req, res) => {
//     const post = Post.find();
//     res.json(post);
// })


// ----------------------
app.get('/trainers', async (req, res) => {
    try { 
        const posts = await Post.find();
        res.json(posts)
        console.log(posts);
    } catch {
        res.json({ message: err });
    }
});
// ----------------------

app.get('/trainers/:trainername', async (req, res) => {
    try {
        const posts = await Post.find()
        const { trainername } = req.params
        const trainerId = await posts.find((singleId) => singleId.trainerName === String(trainername));
    res.status(200).json({ success: true, data: trainerId});
    } catch(err) {
        res.json({ message: err })
    }
  
});


// app.get('/trainers/:id', (req, res) => {
//     const { id } = req.params
//     const trainerId = trainers.find((singleId) => singleId.id === Number(id))
    
//     res.status(200).json({ success: true, data: trainerId })
//     console.log(trainerId);
// });

app.get('/trainers/:id/pokemon', (req, res) => {
    const { id } = req.params
    const trainerId = trainers.find((singleId) => singleId.id === Number(id))
    
    res.status(200).json({ success: true, data: trainerId.pokemon })
});

app.get('/trainers/:id/pokemon/:pokename', (req, res) => {
    const { id, pokename } = req.params
    const trainerId = trainers.find((singleId) => singleId.id === Number(id))
    const pokeList = trainerId.pokemon
    
    const singleMon = pokeList.find((soloMon) => soloMon.pokeName === String(pokename))
    
    res.status(200).json({ success: true, data: singleMon })
    
});
// ---------------------------------------


app.post('/trainers', async (req, res) => {
    // const { id, name, pokemon } = req.body
    const sentPost = new Post({
        id: req.body.id,
        trainerName: req.body.trainerName,
        pokemon: req.body.pokemon
    })
    try {
        const newPost = await sentPost.save();
        res.status(200).json({ success: true, data: newPost })
    } catch(err) {
        res.json({ message: err })
    }
    
});

// what's happening here?????????
// app.delete('trainers/:postId', async (req, res) => {
//     // const { id } = req.params;
//     try { 
//         const post = await Post.find();
//         console.log(post);
//         const trainerId = await post.find((singleId) => singleId.id === Number(postId))
//         console.log(trainerId);
//     const removedPost = await trainerId.deleteOne({ id: req.params.postId })
//     res.json(removedPost);
//     } catch(err) {
//         res.json({ message: "no such post to delete" })
//     }
// })

app.delete('/trainers/:trainername', async (req, res) => {
    try {
        const posts = await Post.find()
        const { trainername } = req.params
        const trainerId = await posts.find((singleId) => singleId.trainerName === String(trainername));
        const removedPost = await trainerId.deleteOne({ trainerName: req.params.trainername })
    res.status(200).json({ success: true, data: removedPost });
    } catch(err) {
        res.json({ message: err })
    }
  
});

mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true }, 
    () => console.log('connected to db')
);


app.listen(9696, ()=> {
    console.log("listening on port 9696....")
})
