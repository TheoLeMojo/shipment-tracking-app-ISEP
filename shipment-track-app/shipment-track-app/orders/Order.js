const mongoose = require("mongoose")

mongoose.model("Order", {
    UserID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    ShipmentID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    initialDate: {
        type: Date,
        required: true
    },
    deliveryDate: {
        type: Date,
        required: true
    }
})