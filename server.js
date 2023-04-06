const express=require("express")
const app=express();
const mongoose=require('mongoose');
const Product=require('./models/productModel');
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.get('/',(req,res)=>{
    res.send('hello node api')
})
app.get('/blog',(req,res)=>{
    res.send('hello blog my name is devtadmin')
});
app.get('/products',async(req,res)=>{
    try {
        const products =await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})
app.get('/products/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        const product =await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})
app.put('/products/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        const product =await Product.findByIdAndUpdate(id,req.body);
        if(!product){
            return res.status(404).json({message:`cannot find any product with that id ${id}` })
        }

        const updatedProduct=await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})
app.delete('/products/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        const product =await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message:`cannot find any product with that id ${id}` })
        }

        
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})
app.post('/products',async(req,res)=>{
    try {
        const product=await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message})
    }
})
mongoose.set('strictQuery',false)
mongoose.connect('mongodb://127.0.0.1:27017/test')
.then(()=>{
    console.log('connected to mongodb');
    app.listen(3000,()=>{
        console.log('Nodeapi is running on port 3000');
    });
}).catch((error)=>{
    console.log(error);
})
