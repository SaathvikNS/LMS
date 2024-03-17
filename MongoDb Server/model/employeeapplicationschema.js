const mongoose = require('mongoose');


const employeeapplicationschema = new mongoose.Schema({
    instname:{
        type: String,
    },
    empid:{
        type: String,
        uniques: true,
    }
})

module.exports = mongoose.model('EmployeeApplications', employeeapplicationschema);