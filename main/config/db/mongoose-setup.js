const mongoose = require("mongoose");

let url = 'mongodb://127.0.0.1:27017/db-lalit'

mongoose.connect(url, {useNewUrlParser: true}, (err) => {
    if(err) console.log(err.message);
})