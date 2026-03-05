import "./App.css";

import { BrowserRouter, Route,Routes } from 'react-router-dom'
import ChatPage from './Pages/ChatPage'
import LoginPage from "./Pages/LoginPage";
import ChatProvider from "./Context/ChatProvider";
import { Box } from "@chakra-ui/react";
import Home from "./Pages/Home";



function App(){
  return (
    <>
      <div className='APP'>
        <BrowserRouter>
        <Box>
        </Box>
        <ChatProvider>
        <Routes>
        <Route path="/" element= {<Home/>}/>
        <Route path='/account' element={<LoginPage/>}/>
        <Route path='/chats' element={<ChatPage/>}/>
        </Routes>
        </ChatProvider>
        </BrowserRouter>

        {/*<Route path='/'/>
        <Route path='/'/>*/}

      </div>
    </>
  )
}

export default App
