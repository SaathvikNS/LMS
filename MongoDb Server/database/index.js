const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/leaveapp').then(
    () => {
        console.log("Connection to database successful!!")
    }
).catch(
    (error) => {
        console.log(error);
    }
)