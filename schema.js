const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    id: Number,
    trainerName: String, 
    pokemon: String
}, {
    versionKey: false
})

module.exports = mongoose.model('Pokemon', postSchema)