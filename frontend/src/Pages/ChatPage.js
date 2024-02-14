import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ChatPage = () => {

  const [chats,setChats]=useState([]);
  /////chats to display data   setChats to change value of chats variable
  const fetchChats=async ()=>{
    const {data}= await axios.get('/api/chats')
    console.log('data=>',data)
    setChats(data)
  }


  ////useEffect -->hook that runs when component is rendered for first time

  useEffect(()=>{
    fetchChats()
  },[])

  return (
    <div>
      {chats.map(chat=>(
        <ul key={chat._id}>{chat.chatName}</ul>
      ))}
    </div>
  )
}

export default ChatPage
