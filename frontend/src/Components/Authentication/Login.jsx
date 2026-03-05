import React, { useState } from 'react';
import { VStack,FormLabel, 
  Input,InputRightElement,
  FormControl,
  Button,InputGroup,
  useToast , Center} from '@chakra-ui/react';
import { Icon } from 'react-icons-kit';
import {eye} from "react-icons-kit/feather/eye";
import {eyeOff} from "react-icons-kit/feather/eyeOff";
import axios from "axios";
import {useNavigate} from "react-router-dom";


const Login = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [loading,setLoading] = useState(false);
  const [show,setShow] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleClick = () => setShow(!show);
  const submitHandler = async() =>{
    setLoading(true);
    if(!email || !password){
      toast({
        title: 'Please Enter the email and password',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
      return
    }
    try {
        const config ={
          headers:{
            "Content-type" : "application/json",
          },
      };
      
      const {data} = await axios.post("/talknet/user/login",
        {email,password},
        config
      );
      toast({
        title: 'Login Successful',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate('/chats',{state:{userInfo: data}});

    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message ||"an error occurred error";
      toast({
        title: 'Error Occured',
        description: errorMessage,
        status: 'Error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
      
    }
  };

  return (
    <Center>
    <VStack spacing = '10px' width="85%">
      <FormControl id="email" isRequired>
      <FormLabel>Email</FormLabel>
      <Input
      placeholder='Enter Email Address'
      value = {email}
      onChange={(e)=>setEmail(e.target.value)}/>
    </FormControl>

    <FormControl id="password" isRequired>
      <FormLabel>Password</FormLabel>
      <InputGroup>
      <Input
      type={ show ? "text" :"password"}
      placeholder='Enter Your Password'
      value = {password}
      onChange={(e)=>setPassword(e.target.value)}/>
      <InputRightElement width="4.5rem">
      <button onClick={handleClick} variant='link'>
      <Icon  icon={show? eyeOff:eye}/>
      </button>
      </InputRightElement>
      </InputGroup>
    </FormControl>

    <Button
    colorScheme='blue'
    width="100%"
    style={{marginTop : 15}}
    onClick ={submitHandler}
    isLoading ={loading}
    >
      LogIn
    </Button>
    <Button
    variant='solid'
    colorScheme="red"
    width="100%"
    color = "white"
    onClick={()=>{
      setEmail("guest@example.com")
      setPassword("123456")
    }}
    >
      Guest Login
    </Button>
    </VStack>
    </Center>
  )
}

export default Login