const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const employeeSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    empid:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    contactnumber:{
        type: String,
        default: "",
    },
    dateofjoin:{
        type: String,
    },
    dob:{
        type: String,
        default: "",
    },
    gender:{
        type: String,
    },
    instname:{
        type: String,
    },
    department:{
        type: String,
    },
    leaves:{
        type: Object,
        default:{},
    },
    verified:{
        type: Boolean,
        default: false,
        mutable: true,
    },
    avatar:{
        type: String,
        default: "",
    },
})

employeeSchema.pre('save', async function(next){
    if(this.isModified("password")){
        const hash = await bcrypt.hash(this.password, 8)
        this.password = hash
    }
    next();
})

employeeSchema.methods.comparePassword = async function(password){
    const result = bcrypt.compareSync(password, this.password);
    return result;
}

module.exports = mongoose.model('Employee', employeeSchema);