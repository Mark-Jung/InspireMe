const mongoose = require('mongoose')
const { Schema } = mongoose;

const quoteSchema = new Schema({
    text: String,
    author: String,
    pic: String,
    count: Number,
})

mongoose.model('Quotes', quoteSchema);