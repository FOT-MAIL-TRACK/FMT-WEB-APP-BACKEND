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
            enum: ['Dean','Department Head','Lecturer','PostalDepartmentMA','FacultyMA','DepartmentMA','WorkAid','Super Admin','Technical Officer', 'Demonstrator']
            // default: 'Lecturer'
        },
        faculty: {
            type: String,
            enum: [
                'Administration',
                'FOT',
                'FMSC',
                'FMS',
                'FAS',
                'FHSS',
                'FAHS',
                'FGS',
                'FOE',
                'Dental',
                'FUAB',
                'FOC',
                'Postal Department'
            ],
            required: true
        },
        department: {
            type: String,
            enum: [
                // Administration
                'Registrar / VC', 'Academic Establishment', 'Non Academic Establishment', 'Finance',
                'ASAP / Exam', 'General Admin', 'Legal', 'Capital Works', 'EIS', 'Supply & Stores',
                'AHEAD', 'Int. Audit', 'Gvt. Audit', 'Proctors', 'Staff Development',
                'Student Welfare', 'Library', 'LIBD', 'IT Centre', 'Career Guidance',

                // FOT - Technology Faculty
                'Technology Faculty',

                // FMSC
                'Deans Office', 'Accounting', 'Decision Science', 'Finance', 'Commerce',
                'Marketing Management', 'Business Administration', 'Business Economics',
                'Estate Management', 'ITRC / Business Com / Legal Studies', 'Public Administration',
                'HRM', 'Entrepreneurship', 'ICT - MGT', 'Business Linkage', 'MBA / MSC',

                // FMS
                'Deans Office', 'Pharmacology', 'Paediatrics', 'Family Medicine', 'Pathology', 'Micro Biology',
                'Parasitology', 'Medicine', 'Bio Chemistry', 'Community Medicine',
                'OB & GYN', 'Physiology', 'Immunology & Molecular Medicine',
                'Psychology', 'Surgery', 'Medical Education', 'Anatomy',
                'Nursing', 'Forensic Medicine',

                // FAS
                'Deans Office', 'Botany', 'Sports Science', 'Food', 'Statistics / Computer Science', 'Physics',
                'Forestry', 'Mathematics', 'Physical Education', 'Zoology', 'Chemistry',
                'Instrument / Polymer', 'Molecular Biology',

                // FHSS
                'Deans Office', 'Sinhala', 'Geography', 'Social Statistics', 'ICT', 'Pali Buddhist',
                'Languages & Culture', 'Economics', 'Political Science', 'Philosophy / Psychology',
                'History & Archaeology', 'Sociology & Anthropology', 'DELT', 'English',
                'Criminology', 'Music', 'Art IT',

                // FAHS
                'Allied Health Sciences',

                // FGS
                'PhD',

                // FOE
                'Engineering Faculty',

                // Dental
                'Dental Faculty',

                // FUAB
                'Urban & Aquatic Faculty',

                //FOC
                'Computing Faculty',

                //Postal Department
                'Postal Department'
            ]
        },
        password: {
            type: String,
            required: true
        },
        registrationNumber: {
            type: String,
            unique: true,
        },
        // imageUrl: {
        //     type: String,
        //     required: true
        // }
        

    });


    //presave hook to generate a unique registration number
    userSchema.pre('save', async function(next) {
        if (this.isNew) {
            try{
                const lastUser = await this.constructor.find().sort({$natural: -1}).limit(1);
                let lastRegnum = lastUser.length && lastUser[0].registrationNumber ? parseInt(lastUser[0].registrationNumber.substring(2)) : 0;
                lastRegnum++;
                this.registrationNumber = "E-"+lastRegnum; 
            }
            catch (err){
                return next(err);
            }      
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
        return await bcrypt.compare(password, this.password);
    };
    
    const User = mongoose.model('User', userSchema, 'users'); 
    module.exports = User;
