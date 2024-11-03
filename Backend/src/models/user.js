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
            enum: ['Lecturer','Dean','Department Head','PostalDepartmentMA','FacultyMA','DepartmentMA','Admin','Technical Officer', 'Demonstrator','Workaid']
            // default: 'Lecturer'
        },
        faculty: {
            type: String,
            enum: ['Faculty of Technology','Faculty of Management and Studies','Faculty of Engineering','FHS','Postal Department'],
            required: true
        },
        // department: {
        //     type: String,
        //     enum: ['Biosystems Technology',
        //            'Information & Communication Technology',
        //            'Civil and Environmental Technology',
        //            'Materials and Mechanical Technology',
        //            'Science for Technology'
        //     ],
        //     required: function(){
        //         return this.faculty === 'Faculty of Technology';
        //     }
        // },
        password: {
            type: String,
            required: true
        },
        registrationNumber: {
            type: String,
            unique: true,
        },
        imageUrl: {
            type: String,
            required: true
        }
        

    });


    //presave hook to generate a unique registration number
    userSchema.pre('save', async function(next) {
        if (this.isNew) {
            const lastUser = await this.constructor.find().sort({$natural: -1}).limit(1);
            let lastRegnum = lastUser && lastUser[0].registrationNumber ? parseInt(lastUser[0].registrationNumber.substring(2,3)) : 0;
            lastRegnum++;
            this.registrationNumber = "E-"+lastRegnum;       
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

    userSchema.methods.comparePassword = async function(password) {
        return await bcrypt.compare(password, this.password); // Ensure you have bcrypt installed and used here
    };
    
    const User = mongoose.model('User', userSchema);
    module.exports = User;
