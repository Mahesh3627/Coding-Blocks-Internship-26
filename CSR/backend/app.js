const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

const todos = ["Game","Dance","music","cricket"];

app.get("/todos",(req,res)=>{
    res.json({todos});
})

///

const PORT = 3000;
app.listen(PORT,()=>{
    console.log("Server run at port",PORT)
})