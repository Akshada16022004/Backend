const express=require('express')
const mongoose=require('mongoose')
require('dotenv').config()
const User=require('./models/User')
const bcrypt=require('bcryptjs')


const app=express()
const PORT=2000
app.use(express.json());

app.use("/recipe",require("./routes/recipe"))

//Registration page api

app.post('/register',async(req, res)=>{
    const {username,email,password}=req.body
    try{
        const hashedPassword= await bcrypt.hash(password,10)
        const user=new User({username,email,password:hashedPassword})
        await user.save()
        res.json({message: "User Registred.."})
        console.log("User Registration completed...")
    }
    catch(err)
    {
        console.log(err)
    }
})

//Login page api

app.post('/login',async(req,res)=>{
    const {email,password}=req.body
    try{
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) 
            {
             return res.status(400).json({ message: "Invalid Credentials" });
            }
          res.json({ message: "Login Successful", username: user.username });
    }
    catch(err)
    {
        console.log(err)
    }
})

mongoose.connect("mongodb+srv://akshadas1602:iYIT5vZWDgPcNTsn@cluster1.drut4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1").then(
    ()=>console.log("DB connected successfully..")
).catch(
    (err)=>console.log(err)
)

app.listen(PORT,(err)=>{
    if(err)
    {
        console.log(err)
    }
    console.log("Server is running on port :"+PORT)
})