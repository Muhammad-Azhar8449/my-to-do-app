const express = require("express")
const bodyParser = require("body-parser")

var app = express()
app.set("view engine","ejs")
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
var items = []

let example = "Working"
app.get("/",function(req,res){
    res.render("index",{ejes : items})
})

app.post("/",function(req,res){
    var item = req.body.ele1
    items.push(item)
    res.redirect("/")
    
})

app.listen(5500, ()=>{
    console.log("Server Started");
})
