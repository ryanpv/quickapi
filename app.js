const express = require("express");
const app = express();
let { trainers } = require("./data");

app.use(express.urlencoded({ extended: false}));

app.use(express.json());

app.get('/trainers', (req, res) => {
    res.json({ success: true, data: trainers })
})



app.listen(9696, ()=> {
    console.log("listening on port 9696....");
})
