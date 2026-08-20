const express = require("express");
const app = express();
const products = require("./data/products");

app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));

const methodOverride = require('method-override')
app.use(methodOverride('_method'))

app.get("/",(req,res)=>{
    res.render("home");
})

app.get("/products",(req,res)=>{
    res.render("product",{products})
})

app.get("/product/new",(req,res)=>{
    res.render("new")
})

app.post("/products",(req,res)=>{
    const {name,image,price,desc} = req.body;
    let id;
    if(products.length>0){
        id=products[products.length-1].id+1
    }else{
        id=1;
    }
    products.push({id,name,image,price,desc});
    res.redirect("/products")
})

app.get("/products/:id",(req,res)=>{
    const {id} = req.params;
    const product = products.find((item)=> item.id==id);

    res.render("show",{product})
})

app.get("/products/:id/edit",(req,res)=>{
    const {id} = req.params;
    const product = products.find((item)=> item.id==id);
    res.render("edit",{product})
})

app.put("/products/:id",(req,res)=>{
    const {id} = req.params;
    const product = products.find((item)=> item.id==id);
    const {name,image,price,desc} = req.body;
    product.name = name;
    product.price = price;
    product.image = image;
    product.desc = desc;
    res.redirect("/products")
})

app.delete("/products/:id",(req,res)=>{
    const {id} = req.params;
    const product = products.find((item)=> item.id==id);
    const ind = products.indexOf(product);

    products.splice(ind,1);

    res.redirect("/products")
})

const PORT = 5000;
app.listen(PORT,()=>{
    console.log("Server run at port",PORT);
})