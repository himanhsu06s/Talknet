import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  VStack, FormLabel, Input, FormControl, InputGroup, InputRightElement, Button, Center, useToast,Text
  ,Spinner,
  Box,
} from '@chakra-ui/react';
import { Icon } from 'react-icons-kit';
import { eye } from 'react-icons-kit/feather/eye';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import axios from "axios";
import {useNavigate} from "react-router-dom";
//import {useHistory} from "react-router-dom";
// it is  deprecated in react router v6

//instead we can use useNavigate()


const Signup = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [pic, setPic] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingPic, setLoadingPic] = useState(false)
  const [uploaded,setUploaded] = useState(false);
  const toast = useToast();
  const history = useNavigate();

  const handleClick = () => setShow(!show);
  

  const postDetails = (pics) => {
    setLoadingPic(true);
    setUploaded(false);
    if (pics === undefined) {
      toast({
        title: 'Please Select an Image',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      return;
    }
    if (pics.type === 'image/jpeg' || pics.type === 'image/png' || pics.type === 'image/gif') {
      const data = new FormData();
      data.append('file', pics);
      data.append('upload_preset', 'Talknet');
      data.append('cloud_name', 'scifi');

      fetch('https://api.cloudinary.com/v1_1/scifi/image/upload', {
        method: 'post',
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(pic);
          setUploaded(true)
          setLoadingPic(false);

        })
        .catch((err) => {
          console.log(err);
          setLoadingPic(false);
        });
    } else {
      toast({
        title: 'Please Select an image',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'bottom',
      });
      setLoadingPic(false);
    }
  };

  const submitHandler = async() => {
    console.log(pic);
    setLoading(true);
    if(!name || !email || !password || !confirmpassword){
      
      toast({
      title:"Fill all the feilds",
      status:"Warning",
      duration: 5000,
      isClosable: true,
      position:'bottom',
    });
    setLoading(false);
    return;
    }
    if(password !== confirmpassword){
      
      toast({
      title:"Password does not match",
      status:"Error",
      duration: 5000,
      isClosable: true,
      position:'bottom',
    })
    return}
    try {
      const config ={
        headers:{
          "Content-type" : "application/json",
        },
      };
      const {data} = await axios.post("/talknet/user",
        {
          name,
          email,
          password,
          profileImg: pic
        },
          config
      );
      console.log(data);
      toast({
        title:"Registration Successful",
        status:"success",
        duration: 5000,
        isClosable: true,
        position:'bottom',});
        localStorage.setItem("userInfo", JSON.stringify(data));
        setLoading(false);
        history('/chats',{state:{userInfo: data}});

    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message ||"an error occurred error";
      toast({
        title:"Error Occured!",
        description: errorMessage,
        status:"Error",
        duration: 5000,
        isClosable: true,
        position:'bottom',
      });
      setLoading(false)
    }
  };

  return (
    <Center>
      <VStack spacing='10px' color='black' width='85%'>
        <FormControl id={`name-${uuidv4()}`} isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            placeholder='Enter Your Name'
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl id={`email-${uuidv4()}`} isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder='Enter Email Address'
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id={`password-${uuidv4()}`} isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type='password'
            placeholder='Enter Your Password'
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <FormControl id={`confirm-password-${uuidv4()}`} isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <InputGroup>
            <Input
              type={show ? 'text' : 'password'}
              placeholder='Enter Your Password'
              onChange={(e) => setConfirmpassword(e.target.value)}
            />
            <InputRightElement width='4.5rem'>
              <button onClick={handleClick}>
                <Icon icon={show ? eyeOff : eye} />
              </button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl id="pic">
          <FormLabel>Profile Photo</FormLabel>
          <InputGroup>
          <Input
            type='file'
            p={1.5}
            accept='image/*'
            placeholder='Profile Photo'
            onChange={(e) => postDetails(e.target.files[0])}
          />
          <InputRightElement width="4.5rem" mr="12px">
          <Box
            width={loadingPic ? "40px" : "155px"} 
            display="flex" alignItems="center"
            justifyContent="center"
            bg={loadingPic ? "#BDBDBD" : uploaded ? "#67B96B":"#42A5F5"}
            p={1}
            borderRadius="md">
          { loadingPic ? (
          
            <Spinner size="sm" color="blue.500"/>
            ):
          <Text
          fontSize="sm" 
          opacity={0.7}
          >
            {uploaded ? "uploaded":"upload"}
          </Text>
          }
          </Box>
          </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button
          colorScheme='blue'
          width='100%'
          style={{ marginTop: 15 }}
          onClick={submitHandler}
          isLoading = {loading}
        >
          Sign Up
        </Button>
      </VStack>
    </Center>
  );
};

export default Signup;
