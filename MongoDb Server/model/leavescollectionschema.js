const mongoose = require('mongoose');


const leavesCollectionSchema = new mongoose.Schema({
    instname:{
        type: String,
    },
    empid:{
        type: String,
    },
    leavetype:{
        type: String,
    },
    fromdate:{
        type: String,
    },
    todate:{
        type: String,
    },
    reason:{
        type: String,
    },
    noofdays:{
        type: Number,
    },
    status:{
        type: String,
        default: "pending",
    },
})

module.exports = mongoose.model('LeavesCollection', leavesCollectionSchema);