import React from 'react'
import {
    Modal,
    useDisclosure,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Avatar,
    Text
  } from '@chakra-ui/react'


const ProfileModel = ({user,children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
        <span onClick={onOpen}>{children}</span>
            <Modal size="lg" isCentered
            isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent h="42dvh">
                    <ModalHeader
                    fontSize="2.5rem"
                    fontFamily="Work sans"
                    display="flex"
                    justifyContent="center"
                    >
                        {user.name}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                    display="flex"
                    flexDir="column"
                    alignItems="center"
                    justifyContent="space-between"
                    >
                    <Avatar
                    size="2xl"
                    name={user.name}
                    src={user.profileImg}/>
                    <Text
                    fontSize={{base:"1.7rem", md:"1.8rem"}}
                    fontFamily="Work sans"
                    >
                        Email:{user.email}
                    </Text>
                    <Text mt={1}>Account Setting</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ProfileModel