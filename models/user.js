const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const gravatar = require('gravatar')

let userSchema = new mongoose.Schema({
    email : {
        type :  String,
        unique : true,
        lowercase : true
    },
    password : String,
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
            if(err)return next(err);
            bcryptjs.hash(user.password,salt,function(err,hash){
                if(err)return next();
                user.password = hash;
                next(err);
            })
        });
    }
});

userSchema.methods.getPhoto = function(email){
    return gravatar.url(email, {s: '200', r: 'x', d: 'retro'}, true);
}
userSchema.methods.comparePassword = function(password){
    return bcryptjs.compareSync(password,this.password);
}

module.exports = mongoose.model('User',userSchema);