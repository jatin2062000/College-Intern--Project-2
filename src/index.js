const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const route = require('./routers/route');
const app = express()

app.use(bodyParser.json())

mongoose.connect("mongodb+srv://jatinkumar0007:E8EbtbEk8o8YEtLZ@cluster0.a0k73vb.mongodb.net/college-imtern",{
        useNewUrlParser: true
    })
    .then(() => console.log('MongoDb is connected'))
    .catch(err => console.log(err))

app.use('/', route);

app.listen(process.env.PORT || 3000, function (req, res) {
    console.log("Express app running on port " + (process.env.PORT || 3000));
});