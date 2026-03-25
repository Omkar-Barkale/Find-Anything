import {Schema} from 'mongoose';

const bookSchema = new Schema({
    name: String,
    author: String,
    description: String,
    comments: [{user: String, date: Date, body:String}],
    date:{type: Date, default: Date.now},
    meta:{
        votes:Number,
        downloads:Number
    }
});