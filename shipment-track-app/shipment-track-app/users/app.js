const express = require("express")
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

app.use(bodyParser.json());

    mongoose.connect("mongodb+srv://theophiledemaistre:tWhIkZgwT9GaoR2Z@cluster0.nk5snij.mongodb.net/userservice?retryWrites=true&w=majority")
        .then(() => console.log("Database is connected - user service"))
        .catch(err => console.error("Database connection failed", err));

    require("./User")
    const User = mongoose.model("User")

    app.post("/users", (req, res) => {
        var newUser = {
            name: req.body.name,
            age: req.body.age,
            address: req.body.address
        }

        var user = new User(newUser)

        user.save().then(() =>{
            res.send("User created")
        }).catch((err) => {
            if(err){
                throw err;
            }
        })
    })

    app.get("/users", (req, res) => {
        User.find().then((users) => {
            res.json(users)
        }).catch((err) => {
            if(err){
                throw err;
            }
        })
    })

    app.get("/user/:id", (req, res) =>{
        User.findById(req.params.id).then((user) => {
            if(user){
                res.json(user)
            }else{
                res.send("Invalid ID")
            }
        }).catch((err) => {
            if(err){
                throw err;
            }
        })
    })
    
    app.delete("/user/:id", (req, res) => {
        User.findByIdAndDelete(req.params.id).then(() => {
            res.send("User deleted with success")
        }).catch((err) => {
            if(err){
                throw err;
            }
        })
    })

app.listen("47152", () => {
    console.log("Up and running - user service")
})