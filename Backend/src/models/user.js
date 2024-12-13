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
            enum: ['Dean','Department Head','Lecturer','PostalDepartmentMA','FacultyMA','DepartmentMA','WorkAid','Admin','Technical Officer', 'Demonstrator']
            // default: 'Lecturer'
        },
        faculty: {
            type: String,
            enum: ['FOT','FMSC','FOE','FHSS','FAHS','FAS','FMS','FDS','FUAB','FOC','Postal Department','General Administration'],
            required: true
        },
        department: {
            type: String,
            enum: ['ICT', 'BST', 'MMT', 'SFT', 'CET', 'Accounting', 'Business Administration','Business Economics','Commerce','Decision Sciences','Entrepreneurship','Estate Management and Valuation','Finance','Human Resource Management','Information Technology','Marketing Management','Public Administration','Civil Engineering','Computer Engineering','Electrical and Electronic Engineering','Mechanical Engineering','Interdisciplinary Studies','Anthropology','Criminology and Criminal Justice','Economics','English and Linguistics','English Language Teaching','Geography','History and Archaeology','Information & Communication Technology','Languages, Cultural Studies and Performing Arts','Music and Creative Technology','Pali and Buddhist Studies','Philosophy and Psychology','Political Science','Sinhala and Mass Communication','Social Statistics','Sociology','Nursing and Midwifery','Pharmacy and Pharmaceutical Sciences','Medical Laboratory Sciences','Basic Sciences','Optometry','Botany','Computer Science','Food Science and Technology','Physics','Sports Science','Zoology','Chemistry','Forestry and Environmental Sciences','Mathematics','Polymer Science','Statistics','Genetics and Molecular Biology Unit','Anatomy','Biochemistry','Community Medicine','Family Medicine','Forensic Medicine','Immunology & Molecular Medicine','Medical Education','Medicine','Microbiology','Obstetrics & Gynaecology','Paediatrics','Parasitology','Pathology','Pharmacology','Physiology','Psychiatry','Surgery','Basic Sciences','Community Dental Health','Comprehensive & Geriatric Dentistry','Oral Medicine & Periodontology','Oral Pathology','Oral Surgery','Paraclinical Sciences','Prosthodontics','Restorative Dentistry','Urban Bioresources','Aquatic Bioresources','Multidisciplinary Studies','Information Systems Engineering and Informatics','Knowledge Engineering and Communication','Scientific Computing'],
            
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
        return await bcrypt.compare(password, this.password); // Ensure you have bcrypt installed and used here
    };
    
    const User = mongoose.model('User', userSchema);
    module.exports = User;
