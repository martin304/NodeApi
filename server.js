const express=require("express")
const app=express();

app.get('/',(req,res)=>{
    res.send('hello node api')
})

app.listen(3000,()=>{
    console.log('Nodeapi is running on port 3000');
})