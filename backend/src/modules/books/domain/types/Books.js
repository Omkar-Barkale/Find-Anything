import {Schema} from 'mongoose';

const bookSchema = new Schema({
    name: {type:String,required:true},
    author: {type:String, required:true},
    description: {type:String, required:true},
    filepath:{type:String,required:true},
    comments: [{user: String, date: Date, body:String}],
    date:{type: Date, default: Date.now},
    meta:{
        votes:Number,
        downloads:Number
    }
});

export const Book = mongoose.model('Book',bookSchema);