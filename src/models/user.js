const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function(v) {
                const domainpattern = /^([\w.%+-]+)@(fot\.sjp\.ac\.lk|sjp\.ac\.lk)$/;
                return domainpattern.test(v);
            },
            message: props => '${props.value} is not a valid email address!'
        }
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type: String,
        required: "true",
        enum: ['Lecturer','Dean','Department Head']
        //default: 'Lecturer'
    }

});

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();
    }
    this.password = await bcrypt.hash(this.password,10);
    next();
});

userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
