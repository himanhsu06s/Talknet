import React, { useState } from 'react';
import { ChatState } from '../Context/ChatProvider';
import {Box} from "@chakra-ui/react"
import SideDrawer from '../Components/ChatPageComponent/SideDrawer';
import MyChats from '../Components/ChatPageComponent/MyChats';
import ChatBox from '../Components/ChatPageComponent/ChatBox';

const Chatpage = () => {
  const {user} = ChatState();
  const [fetchAgain,setFetchAgain] = useState(false);
  return (
    <div style={{width: "100%"}}>
      {user && <SideDrawer/>}
      <Box
      display="flex"
      justifyContent="space-between"
      w="100%"
      h = "92dvh"
      p="10px"
      >
        {user && <MyChats fetchAgain={fetchAgain}/>}
        {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
      </Box>
    </div>
  )
}

export default Chatpage