const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Users = require("./models/users");
const bcrypt = require("bcrypt");
const session = require("express-session");


app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie:{
    maxAge: 1*60*1000
  }
}))

mongoose.connect("mongodb://localhost:27017/VGU_AUTH")
    .then(()=>{console.log("DB conected!")})
    .catch(()=>{console.log("DB not conected!")})

app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.render("home")
})

app.get("/signup",(req,res)=>{
    res.render("signup")
})

app.get("/login",(req,res)=>{
    res.render("login");
})

let isAuth = (req,res,next)=>{
    if(req.session.user){
        next()
    }else{
        res.redirect("/login")
    }
}

app.get("/payment",isAuth,(req,res)=>{
    res.render('payment')
})

app.post("/signup",async (req,res)=>{
    const {username,password,email} = req.body;
    let hashPassword = await bcrypt.hash(password,10)
    await Users.create({username,password:hashPassword,email});
    res.redirect("/login");
})

app.post("/login",async(req,res)=>{
    const {username,password} = req.body;
    const user = await Users.findOne({username});

    if(user){
       let result = await bcrypt.compare(password,user.password);
       if(result){
          //valid user;
          // session create
          req.session.user=username;

          res.redirect("/");
       }else{
         // password incoorect
         res.redirect("/login")
       }
    }else{
        //username not exist
        res.redirect("/login");
    }
})

const PORT = 4000;
app.listen(PORT,()=>{
    console.log("Server run at port",PORT)
});