require('dotenv').config()
const mongoose= require('mongoose');
const app = require("./app");

mongoose.set('strictQuery', false)
// connect data base here with mongoose.connect
mongoose.connect('mongodb://127.0.0.1:27017/ecommerce').then(()=> {
    console.log('database connected')
})



app.listen(5000, ()=> {
    console.log('server running')
})