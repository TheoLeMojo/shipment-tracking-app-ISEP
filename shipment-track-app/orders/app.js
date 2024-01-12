const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const axios = require("axios")

app.use(bodyParser.json())

    mongoose.connect("mongodb+srv://theophiledemaistre:tWhIkZgwT9GaoR2Z@cluster0.nk5snij.mongodb.net/orderservice?retryWrites=true&w=majority")
        .then(() => console.log("Database is connected - order service"))
        .catch(err => console.error("Database connection failed", err));

    require("./Order")
    const Order = mongoose.model("Order")

    //new order
    app.post("/order", (req, res) =>{
        var newOrder = {
            UserID: req.body.UserID,
            ShipmentID: req.body.ShipmentID,
            initialDate: req.body.initialDate,
            deliveryDate: req.body.deliveryDate
        }

        var order = new Order(newOrder)

        order.save().then(() => {
            console.log("Order created with success !")
        }).catch((err) => {
            if(err){
                throw err;
            }
        })
    })

    app.get("/orders", (req, res) => {
        Order.find().then((shipments) =>{
            res.json(shipments)
        }).catch((err) => {
            if(err){
                throw err;
            }
        })
    })

    app.get("/order/:id", (req, res) => {
        Order.findById(req.params.id).then((order) => {
            if(order){
                axios.get("http://localhost:47152/user/" + order.UserID).then((response) => {
                    var orderObject = {userName: response.data.name, shipmentNumber: ''}
                    axios.get("http://localhost:47151/shipment/" + order.ShipmentID).then((response) => {
                        orderObject.shipmentNumber = response.data.shipmentNumber
                        res.json(orderObject)
                    })
                })
            }else{
                res.send("Invalid Order")
            }
        })
    })

app.listen(47153, () => {
    console.log("Up and running - Orders service")
})