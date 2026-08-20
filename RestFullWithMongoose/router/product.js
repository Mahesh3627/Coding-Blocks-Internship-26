const express = require("express");
const router = express.Router();
const Products = require("../models/product");

router.get("/products",async (req,res)=>{
    const products = await Products.find({});
    // console.log(products)
    res.render("index",{products})
})

router.get("/product/new",(req,res)=>{
    res.render("new")
})

router.post("/products",async (req,res)=>{
    const {name,image,price,desc} = req.body;
    await Products.create({name,image,price,desc});
    res.redirect("/products")
})

router.get("/products/:id",async(req,res)=>{
    const {id} = req.params;
    // const product =await Products.findOne({_id:id})
    const product =await Products.findById(id);
    res.render("show",{product})
})

router.get("/products/:id/edit",async (req,res)=>{
    const {id} = req.params;
    const product =await Products.findById(id);
    res.render("edit",{product})
})

router.put("/products/:id",async (req,res)=>{
    // const {id} = req.params;
    const id=req.params.id
    const {name,image,price,desc} = req.body;
    // await Products.findByIdAndUpdate(id,{name,image,price,desc});
    await Products.findByIdAndUpdate(id,{name:name,image:image,price:price,desc:desc});
    res.redirect("/products")
})

router.delete("/products/:id",async (req,res)=>{
    const {id} = req.params;
    await Products.findByIdAndDelete(id);
    res.redirect("/products")
})


module.exports = router;