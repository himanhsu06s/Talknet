import React from 'react'
import {Box} from "@chakra-ui/react"
import {ChatState} from "../../Context/ChatProvider"
import SingleChat from './SingleChat'

const ChatBox = ({fetchAgain,setFetchAgain}) => {
  const {user,setSelectedChat,selectedChat} = ChatState()
  return (
    <Box
    display={{base: selectedChat ? "flex" : "none", md: "flex"}}
    w={{base:"100%",md:"68%"}}
    alignItems="center"
    flexDir='column'
    p={3}
    borderRadius="lg"
    borderWidth="1px"
    background="white"
    >
      <SingleChat 
      fetchAgain={fetchAgain} 
      setFetchAgain={setFetchAgain}
      user={user}
      selectedChat={selectedChat}
      setSelectedChat={setSelectedChat}
      />
    </Box>
  )
}

export default ChatBox