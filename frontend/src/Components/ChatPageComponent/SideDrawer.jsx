import { Box, 
    Button, Tooltip,
    Text, Menu, 
    MenuButton, Avatar, 
    MenuList, MenuItem, useDisclosure} from '@chakra-ui/react';
import React  from 'react'
import { GoBellFill } from "react-icons/go";
import { MdPersonSearch } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { ChatState } from '../../Context/ChatProvider';
import ProfileModel from '../miscellaneous/ProfileModel';
import { useNavigate } from 'react-router-dom';
import CustomDrawer from '../miscellaneous/CustomDrawer';

const SideDrawer = () => {
    const navigate = useNavigate();

    const {user , setSelectedChat,chats,setChats} = ChatState();
    const { isOpen, onOpen, onClose } = useDisclosure()

    const logOutHandler =()=>{
        localStorage.removeItem("userInfo")
        navigate("/account")
    }

return (
    <>
    <Box
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    bg="white"
    w="100%"
    p="0.32rem 0.62rem 0.32rem 0.62rem"
    borderWidth="0.2rem"
    >
        <Tooltip label="Search Users to chat" hasArrow placement='bottom-end'>
            <Button variant="ghost" onClick={onOpen}>
                <Box display={{base:"none",md:"flex"}}
                alignItems="center"
                >
                    <IoSearch/>
                    <Text px="4">Search User</Text>
                </Box>
                <Box display={{base:"flex",md:"none"}}><MdPersonSearch size="1.8rem"/></Box>
                
            </Button>
        </Tooltip>
        <Text fontSize="2xl"
        fontWeight="semibold"
        fontFamily="Work sans">
            Talk-NET
        </Text>
        <div style={{
            display: 'flex',
            alignItems: 'center',
            marginRight: "1rem",
            gap: "0.5rem"
        }}>
            <Menu>
                <MenuButton p={1} m={1}>
                    <GoBellFill size="1.4rem"/>
                </MenuButton>
            </Menu>
            <Menu>
                <MenuButton>
                    <Avatar size="sm" cursor="pointer" name={user.name}
                    src={user.profileImg}/>
                </MenuButton>
                <MenuList  fontSize="m" fontWeight="bold">
                    <ProfileModel user={user}>
                    <MenuItem>My Profile</MenuItem>
                    </ProfileModel>
                    <MenuItem>New Group</MenuItem>
                    <MenuItem onClick={logOutHandler}>Log Out</MenuItem>
                </MenuList>
            </Menu>
        </div>
    </Box>

    <CustomDrawer onClose={onClose} isOpen={isOpen} 
    user={user}
    setSelectedChat={setSelectedChat}
    chats={chats}
    setChats={setChats}
    />
    </>
)
}

export default SideDrawer