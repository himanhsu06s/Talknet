import { Box } from '@chakra-ui/react'
import { IoIosClose } from "react-icons/io";
import React from 'react'

const UserBadgeItem = ({user,handlefunction}) => {
  return (
    <Box
    display="flex"
    alignItems="center"
    px={2}
    py={1}
    borderRadius="lg"
    m={1}
    mb={2}
    variant = "solid"
    fontSize="0.8rem"
    backgroundColor = "#76437E"
    color="white"
    cursor="pointer"
    onClick={handlefunction}
    >
        {user.name}
        <IoIosClose 
        size="25px"
        style={{
            paddingLeft:"0.2rem"
        }}
        />
    </Box>
  )
}

export default UserBadgeItem