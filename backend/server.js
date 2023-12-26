const express=require("express");
const {chats}=require("./data/data")

const app=express();

////creating API 
app.get("/",(req,res)=> {        ////2nd paramenter is callback with requestn and respond in the parament of callback functoin
    res.send("API is running");
});

app.get("/api/chats",(req,res)=>{
    res.send(chats)    
})

app.listen(5001,console.log("Server is on PORT 5001"))   ////running npm start will run this