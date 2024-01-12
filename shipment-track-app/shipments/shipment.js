const mongoose = require("mongoose");

mongoose.model("Shipment", {
    shipmentNumber: {
        type: String,
        require: true
    },
    senderName: {
        type: String,
        require: true
    },
    receiverName: {
        type: String,
        require: true
    },   
    status: {
        type: String,
        require: false
    }
})