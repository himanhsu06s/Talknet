import { Box, IconButton, Text } from '@chakra-ui/react'
import { MdKeyboardBackspace } from "react-icons/md";
import React from 'react'
import { getSender, getSenderFull } from '../../config/Chatlogic';
import ProfileModel from "../miscellaneous/ProfileModel"

const SingleChat = ({fetchAgain,setFetchAgain,user,selectedChat,setSelectedChat}) => {
  return (
    <>
        {
            selectedChat ? (
                <>
                <Text
                fontSize={{base: "1.75rem", md: "1.8rem"}}
                pb={3}
                px={2}
                w="100%"
                fontFamily="work sans"
                display="flex"
                justifyContent={{base:"space-between"}}
                alignItems="center"
                >
                    <IconButton
                display={{base:"flex",md:"none"}}
                icon={<MdKeyboardBackspace/>}
                onClick={()=> setSelectedChat("")}
                />
                {!setSelectedChat.isGroupChat ? 
                (
                    <>
                    {getSender(user,selectedChat.user)}
                    <ProfileModel user={getSenderFull(user,selectedChat.users)}/>
                    </>
                ):
                (
                    <>{selectedChat.chatName.toUpperCase()}
                    {/* <UpdateGroupChatModal
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                    /> */}
                    </>
                )
            }
                </Text>
                <Box
                display="flex"
                flexDir="column"
                p={3}
                bg="#E8E8E8"
                w="100%"
                h="100%"
                borderRadius="lg"
                overflowY="hidden"
                >
                    {/* Messages Here */}
                </Box>
                </>
            ):(
                <Box display="flex"
                alignItems="center"
                justifyContent="center"
                h="100%"
                >
                    <Text fontSize="3xl" pb={3} fontFamily="Work sans">
                        Click on a user to start chatting
                    </Text>
                </Box>
            )
        }
    </>
  )
}

export default SingleChat