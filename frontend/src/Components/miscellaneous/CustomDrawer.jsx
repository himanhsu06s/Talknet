import React, { useState } from 'react'
import { Box,
    Drawer, 
    DrawerOverlay,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    Input,
    Button,
    useToast,
    Spinner} from '@chakra-ui/react';
import axios from 'axios';
import ChatLoading from './ChatLoading';
import UserListItem from '../UserAvatar/UserListItem';

const CustomDrawer = ({onClose,isOpen,user,setSelectedChat,chats,setChats}) => {
    const [search,setSearch] = useState();
    const [searchResult,setSearchResult] = useState([]);
    const [loading,setLoading] = useState(false);
    const[loadingChat,setLoadingChat] = useState(false);
    const toast= useToast();
  

    const handleSearch= async () => {
        if(!search){
            toast({
                title: 'Please Enter something in Search',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'top-left',
              });
              return;
        }
        try {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
              }, 3000);
            const config = {
                headers: {
                  Authorization: `Bearer ${user.token}`,
                },
              };
            const {data} = await axios.get(`/talknet/user?search=${search}`,config);
            setLoading(false);
            setSearchResult(data);
        } catch (error) {
            toast({
                title: 'Error Occured',
                description:"Failed to load search Results",
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom-left',
              });
        }
    };

    const accessChat = async (userId)=>{
        try {
            setLoadingChat(true);
            const config = {
                headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
                },
            };

            const {data} = await axios.post("/talknet/chats",{userId},config)
            if(!chats.find((c)=>c._id === data._id)) setChats([data, ...chats])


            setSelectedChat(data);
            setLoadingChat(false);
            onClose();

        } catch (error) {
            toast({
                title: 'Error in loading Chats',
                description: error.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom-left',
              });
        }
    }

  return (
    <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
    <DrawerOverlay/>
    <DrawerContent>
        <DrawerHeader borderBottomWidth="0.1rem">
            Search Users
        </DrawerHeader>
        <DrawerBody>
            <Box display="flex" pb={2}>
                <Input
                placeholder='Search by name or email'
                mr={2}
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                />
                <Button 
                    onClick={handleSearch}
                >
                    Go
                </Button>
            </Box>
            {loading ? (
        <ChatLoading/>
    ):(
        searchResult?.map(user=>(
            <UserListItem
            key={user._id}
            user={user}
            handlefunction={()=>accessChat(user._id)}
            />
        ))
    )}
    {loadingChat && <Spinner ml="auto" display="flex" />}
        </DrawerBody>
    </DrawerContent>
</Drawer>
  )
}

export default CustomDrawer