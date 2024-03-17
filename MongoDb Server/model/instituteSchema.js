const mongoose = require('mongoose');


const instituteSchema = new mongoose.Schema({
    instname:{
        type: String,
        unique: true,
    },
    area:{
        type: String,
        default: "",
    },
    city:{
        type: String,
        default: "",
    },
    state:{
        type: String,
        default: "",
    },
    country:{
        type: String,
        default: "",
    },
    pincode:{
        type: String,
        default: "",
    },
    yoe:{
        type: String,
        default: "",
    },
    email:{
        type: String,
        default: "",
    },
    number:{
        type: String,
        default: "",
    },
    employeecount:{
        type: Number,
        default: 0,
    },
    leaves:{
        type: Object,
        default: {},
    },
    departments:{
        type: Object,
        default: {},
        mutable: true,
    },
    logo:{
        type: String,
        default: "",
    },
})

module.exports = mongoose.model('Institute', instituteSchema);