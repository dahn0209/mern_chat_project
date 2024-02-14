import axios from 'axios'
import React, { useEffect } from 'react'

const ChatPage = () => {

  const fetchChats=async ()=>{
    const {data}= await axios.get('/api/chat')
    console.log('data=>',data)
  }

  ////useEffect -->hook that runs when component is rendered for first time

  useEffect(()=>{
    fetchChats()
  },[])

  return (
    <div>
      Deee homie
    </div>
  )
}

export default ChatPage
