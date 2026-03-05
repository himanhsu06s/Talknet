import { Button,Box, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider';
import axios from 'axios';
import UserListItem from '../UserAvatar/UserListItem';
import UserBadgeItem from '../UserAvatar/UserBadgeItem';

const GroupChatModel = ({children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const[groupChatName,setGroupChatName] = useState();
    const[selectedUser,setSelectedUser] = useState([]);
    const[search,setSearch] = useState("");
    const[searchResult,setSearchResult] = useState([]);
    const[loading,setLoading] = useState(false);

    const toast = useToast()

    const {user,chats,setChats} = ChatState();

    const handleSearch =async(q)=>{
        setSearch(q);
        if(!q){
            return;
        }

        try {
            setLoading(true);
            const config = {
                headers:{
                    Authorization: `Bearer ${user.token}`
                },
            };
            const {data} = await axios.get(`/talknet/user?search=${search}`,config);
            console.log(data);
            setLoading(false)
            setSearchResult(data);
        } catch (error) {
            toast({
                title: 'Error Occurred',
                description:"Failed to Load the Search Results",
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom-left',
              });
        }
    }
    const handleSubmit = async()=>{
      if(!groupChatName || !selectedUser){
        toast({
          title: 'Please fill all the feilds',
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position: 'top',
        });
        return;
      }
      try {
        const config = {
          headers:{
              Authorization: `Bearer ${user.token}`
          },
      };

      const {data} = await axios.post("/talknet/chats/group",{
        name:groupChatName,
        users:JSON.stringify(selectedUser.map((u)=>u._id))
      },config);

      setChats([data,...chats]);
      onclose();
      toast({
        title: 'New Group Chat Created!!',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });

      } catch (error) {
        toast({
          title: 'Failed to Create the Chat!',
          description: error.response.data,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'bottom',
        });
      }
    };

    const handleGroup = (userToAdd)=>{
      if(selectedUser.includes(userToAdd)){
        toast({
          title: 'User already added',
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position: 'top',
        });
        return;
      }

      setSelectedUser([...selectedUser,userToAdd]);
    };

    const handleDelete = (delUser)=>{
      setSelectedUser(selectedUser.filter(sel => sel._id != delUser._id))
    }; 

  return (
    <> 
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
          fontSize="2.1rem"
          fontFamily="work sans"
          display="flex"
          justifyContent="center"
          >
          Create Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
          display="flex"
          flexDir="column"
          alignItems="center"
          >
            <FormControl>
                <Input placeholder="Chat Name" mb={3}
                onChange={(e)=> setGroupChatName(e.target.value)}
                />
            </FormControl>

            <FormControl>
                <Input placeholder="Add User" mb={1}
                onChange={(e)=> handleSearch(e.target.value) }
                />
            </FormControl>
            <Box
            display="flex"
            w = "100%"
            flexWrap = "warp"
            >
            {selectedUser.map((user) =>(
              <UserBadgeItem
              key={user._id} user={user}
              handlefunction ={()=> handleDelete(user)}
              />
            ))}
            </Box>


                {loading ? <Spinner /> :(
                    searchResult?.slice(0,4).map(user => (
                        <UserListItem key={user._id}
                        user ={user}
                        handlefunction={()=> handleGroup(user)}
                        />
                    ))
                )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' onClick={handleSubmit}>
              Create Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default GroupChatModel