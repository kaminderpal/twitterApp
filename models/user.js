const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    email : {
        type :  String,
        unique : true,
        lowercase : true
    },
    name : String,
    photo : String,
    tweets : [
        {
            tweet : {
                type : Schema.Types.ObjectId,
                ref : 'Tweet'
            }
        }
    ]
});

module.exports = mongoose.model('User',userSchema);