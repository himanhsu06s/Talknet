import React, { useEffect, useState } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import { useToast,Box, Button, Stack,Text } from '@chakra-ui/react';
import { MdOutlinePersonAddAlt } from "react-icons/md";
import ChatLoading from "../miscellaneous/ChatLoading"
import axios from 'axios';
import { getSender } from '../../config/Chatlogic';
import GroupChatModel from '../miscellaneous/GroupChatModel';

const MyChats = ({fetchAgain}) => {
  const {user, selectedChat,setSelectedChat,chats,setChats} = ChatState();
  const toast = useToast();

  const [loggedUser, setLoggedUser] = useState();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization : `Bearer ${user.token}`,
        },
      };

      const {data} = await axios.get("/talknet/chats",config);
      setChats(data);
    } catch (error) {
      toast({
        title: 'Error occured!',
        description: "fail to load chat",
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
      });
    }
  }; 
  useEffect(()=>{
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain])


  return (
    <Box
    display = {{base : selectedChat ? "none":"flex", md: "flex"}}
    flexDir = "column"
    alignItems = "centre"
    p={3}
    w={{base:"100%", md: "31%"}}
    borderRadius = "lg"
    borderWidth = "1px"
    background="white"
    >
      <Box
      pb={3}
      px={3}
      fontSize = {{base:"1.75rem", md: "1.87rem"}}
      fontFamily = "Work sans"
      display = "flex"
      w ="100%"
      justifyContent = "space-between"
      alignItems = "center"
      >
        My Chats
      <GroupChatModel>
        <Button
        display="flex"
        fontSize={{base: "1.02rem", md: "0.8rem", lg: "1.02rem"}}
        rightIcon = {<MdOutlinePersonAddAlt />}
        >
          New Group Chat
        </Button>
        </GroupChatModel>
      </Box>
      <Box
      display="flex"
      flexDir="column"
      p={3}
      w="100%"
      h="100%"
      borderRadius="lg"
      overflowY="hidden"
      >
        {
          chats ? (
            <Stack overflowY="scroll">
              {chats.map((chat)=>(
                <Box
                onClick={()=> setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC":"#E7E5E5"}
                color={selectedChat === chat ? "#FFFFFF" : "black"}
                px={3} py={2}
                borderRadius="lg"
                key = {chat._id}
                >
                  <Text>
                    {!chat.isGroupChat ? getSender(loggedUser,chat.users) : chat.chatName}
                  </Text>
                </Box>
              ))
              }
            </Stack>
          ):(
            <ChatLoading/>
          )
        }
      </Box>
    </Box>
  )
}

export default MyChats