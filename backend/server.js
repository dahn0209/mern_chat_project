const express=require("express");
const dotenv=require("dotenv")
const {chats}=require("./data/data")

const app=express();
dotenv.config()

////creating API 
app.get("/",(req,res)=> {        ////2nd paramenter is callback with requestn and respond in the parament of callback functoin
    res.send("API is running great now");
});

app.get("/api/chats",(req,res)=>{      ///this send  out chat data that's imported in///
    res.send(chats)    
})

app.get("/api/chats/:id",(req,res)=>{      ///this is for single chat
    const singleChat=chats.find(c=>c._id=== req.params.id);
    res.send(singleChat)
})

const PORT=process.env.PORT|| 5000;

app.listen(5001,console.log(`Server starts at ${PORT}`))  ////running npm start will run this//