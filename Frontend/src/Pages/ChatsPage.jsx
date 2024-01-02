import React, { useEffect, useState } from 'react'

function ChatsPage() {

  const [chats,setChats] = useState([])

   useEffect(() => {

    const fetchChats = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/chat')
        const result = await response.json()
        setChats(result)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchChats()

    
    return () => {
    }
  }, [])

  if(chats.length !== 0){
    console.log(chats)
  }

  return (
    <div>ChatsPage</div>
  )
}

export default ChatsPage