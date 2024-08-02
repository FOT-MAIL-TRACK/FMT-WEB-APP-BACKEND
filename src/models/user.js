const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true,
        trim: true
    },
    username: {
        type:String,
        required: true,
        unique: true,
        match: /^USJP_.+$/,
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
    role:{
        type: String,
        required: "true",
        enum: ['Lecturer','Dean','Department Head','PostalDepartmentMA','FacultyMA','DepartmentMA','Admin','Technical Officer', 'Demonstrator']
        //default: 'Lecturer'
    },
    faculty: {
        type: String,
        enum: ['Faculty of Technology','Faculty of Human Sciences'],
        required: true
    },
    department: {
        type: String,
        enum: ['Biosystems Technology',
               'Information & Communication Technology',
               'Civil and Environmental Technology',
               'Materials and Mechanical Technology',
               'Science for Technology'
        ],
        required: function(){
            return this.faculty === 'Faculty of Technology';
        }
    },
    password: {
        type: String,
        required: true
    },
    registrationNumber: {
        type: String,
        unique: true,
        required: true
    }
    

});


//presave hook to generate a unique registration number
userSchema.pre('save', async function(next) {
    if (this.isNew) {
        const lastUser = await this.constructor.findOne().sort({ createdAt: -1 });
        const lastRegnum = lastUser && lastUser.registrationNumber ? parseInt(lastUser.registrationNumber.split('-')[1], 10) : 0;
        this.registrationNumber = `E-${lastRegnum + 1}`;
    }
    next();
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
