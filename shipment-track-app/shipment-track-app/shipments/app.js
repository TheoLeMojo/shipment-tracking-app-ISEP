    const express = require("express");
    const app = express();
    const bodyParser = require("body-parser");
    const swaggerUi = require('swagger-ui-express');
    const YAML = require('yamljs');
    const swaggerDocument = YAML.load('./openapi.yaml');
    const cors = require('cors');


    app.use(bodyParser.json());
    app.use(cors());
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//load mongoose
    const mongoose = require("mongoose")

    require("./shipment")
    const Shipment = mongoose.model("Shipment")

    //Connect    
    mongoose.connect("mongodb+srv://theophiledemaistre:tWhIkZgwT9GaoR2Z@cluster0.nk5snij.mongodb.net/shipmentservice?retryWrites=true&w=majority")
        .then(() => console.log("Database is connected!"))
        .catch(err => console.error("Database connection failed", err));

app.get('/', (req, res) => {
    res.send("This is our shipment service !");
})

//create func
    app.post("/shipment", (req, res) =>{
        var newShipment = {
            shipmentNumber: req.body.shipmentNumber,
            senderName: req.body.senderName,
            receiverName: req.body.receiverName,
            status: req.body.status
        }

        var shipment = new Shipment(newShipment)

        shipment.save().then(() => {
            console.log("New shipment created!")
        }).catch((err) => {
            if(err){
                throw err;
            }
        })
        res.send("A new shipment created with success!")
    })

    //list all the shipments
    app.get("/shipments", (req, res) => {

        Shipment.find().then((shipments) => {
            res.json(shipments)
        }).catch(err => {
            if(err){
                throw err;
            }
        })
    })

    //list one shipment by id
    app.get("/shipment/:id", (req, res) =>{
        Shipment.findById(req.params.id).then((shipment) => {
            if(shipment){
                res.json(shipment)
            }else{
                res.sendStatus(404);
            }
        }).catch(err => {
            if(err){
                throw err;
            }
        })
    })

    app.delete("/shipment/:id", (req, res) => {
        Shipment.findByIdAndDelete(req.params.id).then(() => {
            res.send("Shipment removed with success!")
        }).catch(err => {
            if(err){
                throw err;
            }
        })
    })

app.listen(47151, () => {
    console.log("Up and running! -- This is our Shipment service");
})
