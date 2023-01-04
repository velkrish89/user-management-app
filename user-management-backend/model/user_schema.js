const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    userId: {
        type: String,
        required: [true, "UserId is required!"]
    },

    name: {
        type: String,
        required: [true, "Name is required!"]
    },

    email : {
        type: String,
        required: [true, "Email is required!"]
    },

    phone: {
        type: String,
        required: [true, "Phone is required!"]
    }
})

module.exports = mongoose.model("user", userSchema);