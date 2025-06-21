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

// PUT (Edit task)
app.put('/tasks/:index', (req, res) => {
  const index = parseInt(req.params.index);
  const { text } = req.body;
  if (tasks[index]) {
    tasks[index].text = text;
    return res.json(tasks);
  } else {
    return res.status(404).json({ error: 'Task not found' });
  }
});

// DELETE (Remove task)
app.delete('/tasks/:index', (req, res) => {
  const index = parseInt(req.params.index);
  if (tasks[index]) {
    tasks.splice(index, 1);
    return res.json(tasks);
  } else {
    return res.status(404).json({ error: 'Task not found' });
  }
});

app.listen(5500, ()=>{
    console.log("Server Started");
})
