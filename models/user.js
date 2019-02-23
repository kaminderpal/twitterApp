const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const crypto = require('crypto')


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
                type : mongoose.Schema.Types.ObjectId,
                ref : 'Tweet'
            }
        }
    ]
});

userSchema.pre("save",function(next){
    var user = this;
    if(!user.isModified('password')) return next();
    if(user.password){
        bcryptjs.genSalt(10,function(err,salt){
            if(err)return next();
            bcryptjs.hash(user.password,salt,null,function(err,hash){
                if(err)return next();
                user.password = hash;
                next(err);
            })
        });
    }
});

userSchema.methods.gravatar = function(size){
    if(!size) size = 200;
    if(!this.email) return "https://gravatar.com/avatar/?s="+size + "&d=retro";
    var md5 = crypto.createHash("md5").update(this.email).digest("hex");
    return "https://gravatar.com/avatar/" + md5 +  "?s=" +size +  "&d=retro";
}
userSchema.methods.comparePassword = function(password){
    return bcryptjs.comparePassword(password,this.password);
}

module.exports = mongoose.model('User',userSchema);