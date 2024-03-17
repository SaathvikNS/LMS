const express = require('express');
require('./database');
require('dotenv').config();
const router = require('./routes/userRouter');

const app = express();

const PORT = process.env.PORT 

app.use(express.json());
app.use('/api/user', router);

app.use((err, res, req, next) => {
    console.error(err.stack)
    res.status(500).send('Something Broke!');
})

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})