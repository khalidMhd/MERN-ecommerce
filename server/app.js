const express = require('express');
const app = express();
const mongoose = require('mongoose')
const db = require('./config/keys')
const PORT =process.env.PORT || 5000

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/profile'))
app.use(require('./routes/product'))
app.use(require('./routes/order'))

app.listen(PORT,()=>{
    console.log('Port is running on PORT: ' , PORT)
})