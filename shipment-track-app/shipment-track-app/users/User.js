const mongoose = require("mongoose")

mongoose.model("User", {
    name: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    address: {
        type: String,
        require: true
    }
})