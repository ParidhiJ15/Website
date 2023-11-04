const mongoose = require('mongoose')
const loginSchema = mongoose.Schema({
    name: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
    },
    phonenumber: {
        type: String,
    },
    email: {
        type: String,
        // required: true,
        // unique: true,
        // validate(value) {
        //     if (!validator.isEmail(value)) {
        //         throw new Error("Please enter correct email");
        //     }
        // }

    }

})

const loginData = new mongoose.model("loginData", loginSchema)

module.exports = loginData