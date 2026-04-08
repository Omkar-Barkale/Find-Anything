import mongoose,{Schema} from 'mongoose';

const bookSchema = new Schema({
    name: {type:String,required:true},
    author: {type:String, required:true},
    description: {type:String, required:true},
    user:{type:String, required:true},
    filepath:{type:String,required:true},
    comments: [{user: String, date: Date, body:String}],
    date:{type: Date, default: Date.now},
    meta:{
        votes:{type:Number, default:0},
        dislikes:{type:Number, default:0},
        downloads:{type:Number, default:0}
    }
});
const Book = mongoose.model('Book',bookSchema);
export default Book;    