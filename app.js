const express = require("express")
const app = express()
var path = require('path');
const mongoose = require('mongoose')
const routes = require('./src/routes/login')

//db connection
mongoose.connect("mongodb://localhost/databaseWesite")
    .then(() => {
        console.log("database connected")
    })
    .catch(() => {
        console.log("Failed to connect database")
    })





// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/static', express.static('public'))
app.use('', routes)


app.listen(8000, () => {
    console.log("server started")
})