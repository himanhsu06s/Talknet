import React, { useEffect } from 'react'
import {Container,Box,Text,
  Tab,TabList,TabPanel,TabPanels,Tabs
} from "@chakra-ui/react"
import Login from '../Components/Authentication/Login'
import Signup from '../Components/Authentication/Signup'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('userInfo'));

    if(user) navigate('/chats')
  },[navigate])


  return (
    <Container maxW='xl' centerContent>
        <Box
        display='flex'
        justifyContent='center'
        p={2}
        bg={'white'}
        w='100%'
        m= '40px 0px 15px 0px'
        borderRadius='lg'
        borderWidth='1px'
        >
            <Text
            fontSize = '3xl'
            fontFamily='Work sans'
            fontWeight={900}
            color={'black'}
            >TALKNET</Text>
        </Box>
        <Box
        bg ="white"
        w = "100%"
        p={4}
        borderRadius="lg"
        borderWidth="2px"
        color={"black"}
        
        >
              <Tabs variant='soft-rounded' colorScheme='blue'>
              <TabList mb="1em">
                <Tab width="50%">Login</Tab>
                <Tab width="50%">Sign Up</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Login/>
                </TabPanel>
                <TabPanel>
                  <Signup/>
                </TabPanel>
              </TabPanels>
            </Tabs>            
        </Box>
    </Container>
  )
}

export default LoginPage